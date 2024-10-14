## 1. 내용 설명

### 1) `expo-datadog` 및 `@datadog/mobile-react-native` 설치 가이드

### 1-1. 설정

NPM / YARN 으로 설치하려면 다음 명령어를 실행

```markup
npm install expo-datadog @datadog/mobile-react-native

yarn add expo-datadog @datadog/mobile-react-native
```

### 1-2. View Navigation 추적 설정

Datadog에서 RUM 세션을 확인하려면, 뷰 추적을 수동 또는 자동으로 초기화 설정 해줘야합니다.

**[수정 추적 설정]**

: startView() 및 stopView() 메서드를 사용하여 뷰를 수종으로 시작하고 중지할 수 있습니다.

```jsx
import { DdRum } from "expo-datadog";

// 뷰를 고유한 뷰 식별자, 사용자 정의 뷰 이름 및 추가 속성을 첨부한 객체로 시작합니다.
DdRum.startView(
  "<view-key>", // <view-key>는 고유해야 합니다. 예를 들어 ViewName-unique-id 형식으로 설정할 수 있습니다.
  "View Name",
  { "custom.foo": "something" },
  Date.now()
);
// 동일한 고유 뷰 식별자로 이전에 시작된 뷰를 중지합니다.
DdRum.stopView("<view-key>", { "custom.bar": 42 }, Date.now());
```

**[자동 추적 설정]**

: 자동 뷰 추적은 다음 모듈에서 지원합니다.

- React Navigation: `@Datadog/mobile-react-navigation`
- React Native Navigation: `@Datadog/mobile-react-native-navigation`

```jsx
<NavigationContainer
  ref={navigationRef}
  onReady={() => {
    DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
  }}
>
  ...
</NavigationContainer>
```

### 1-3. 사용법

앱 컨텍스트로 라이브러리르 초기화하고 싶다면 다음 코드를 참고하여 초기화 파일을 추가합니다.

```jsx
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from "expo-datadog";

const config = new DdSdkReactNativeConfiguration(
  "<CLIENT_TOKEN>",
  "<ENVIRONMENT_NAME>",
  "<RUM_APPLICATION_ID>",
  true, // 버튼 탭과 같은 사용자 상호작용 추적을 활성화합니다.
  true, // XHR 리소스를 추적합니다.
  true // 오류를 추적합니다.
);
config.site = "US1"; // 선택사항: Datadog 사이트 설정 (US1, US3, US5, EU1, US1_FED)
config.nativeCrashReportEnabled = true; // 네이티브 크래시 리포트 활성화
config.sessionSamplingRate = 80; // RUM 세션 샘플링 비율 설정
config.resourceTracingSamplingRate = 80; // 리소스 추적 샘플링 비율 설정
config.firstPartyHosts = ["example.com"]; // 첫 번째 파티 호스트 지정
config.verbosity = SdkVerbosity.WARN; // SDK 내부 로그 출력 수준 설정

await DdSdkReactNative.initialize(config);
```

: RUM 대시보드에서 데이터를 보려면 SDK를 초기화한 후 뷰를 추적하도록 설명해야 합니다.

### 1-4. RUM 세션 샘플링

RUM Expo SDK를 초기화할 때, config.sessionSamplingRate 매개변수를 사용하여 RUM 세션 샘플링 비율을 설정할 수 있습니다. 값은 0에서 100 사이의 퍼센트로 값을 지정해 줄 수 있습니다.

### 1-5. EAS 빌드에서 소스 맵 업로드

크래시 리포팅을 활성화하지 않은 경우 이 단계를 생략할 수 있습니다.

`app.json` 파일에 `expo-datadog`을 플러그인으로 추가해줍니다.

```jsx
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

: 이 플러그인은 dSYM, 소스 맵 및 Progurad 매핑 파일을 EAS 빌드 시 자동으로 업도르 합니다.

개발 의존성으로 `@datadog/datadog-ci`를 설치해 줍니다.

```markdown
npm install @datadog/datadog-ci --save-dev

yarn add -D @datadog/datadog-ci
```

### Expo Router 화면 추적 (MoimPlus의 경우 해당됨)

: Expo Router를 사용하는 경우, 앱의 \_layout.js 파일에서 화면을 추적하세요.

```jsx
import { useEffect } from "react";
import { usePathname, useSegments, Slot } from "expo-router";

export default function Layout() {
  const pathname = usePathname();
  const segments = useSegments();
  const viewKey = segments.join("/");

  useEffect(() => {
    DdRum.startView(viewKey, pathname);
  }, [viewKey, pathname]);

  return <Slot />;
}
```

### Expo Go

Expo Go를 사용하는 경우 개발 빌드로 전환하는 것이 좋습니다. Datadog를 사용하려면 스탠드얼론 애플리케이션에서 실행하세요.

- expo run:android 또는 expo run:ios를 사용하여 네이티브 코드를 활성화합니다.
- Datadog을 사용하는 동안 Expo Go에서 발생할 수 있는 오류를 해결하려면 mockDatadog.ts 파일을 추가합니다.

```tsx
// mockDatadog.ts

import { DdLogs, DdTrace, DdRum, DdSdkReactNative } from "expo-datadog";

if (__DEV__) {
  const emptyAsyncFunction = () => new Promise<void>((resolve) => resolve());

  DdLogs.debug = emptyAsyncFunction;
  DdLogs.info = emptyAsyncFunction;
  DdLogs.warn = emptyAsyncFunction;
  DdLogs.error = emptyAsyncFunction;

  DdTrace.startSpan = () =>
    new Promise<string>((resolve) => resolve("fakeSpanId"));
  DdTrace.finishSpan = emptyAsyncFunction;
  DdRum.startView = emptyAsyncFunction;
  DdRum.stopView = emptyAsyncFunction;
  DdRum.addError = emptyAsyncFunction;

  DdSdkReactNative.initialize = emptyAsyncFunction;
}
```

### 오프라인 상태에서 데이터 전송

: 사용자가 오프라인 상태일 때도 데이터를 손실하지 않도록 RUM SDK는 이벤트를 로컬에 저장하고 네트워크가 다시 연결되면 전송합니다.

### 너무 많은 로깅으로 인한 문제 상황시

: 앱에서 /logs RUM 리소스가 너무 많이 생성되는 경우, 다음 코드로 해결할 수 있습니다.

```tsx
config.resourceEventMapper = (event) => {
  if (
    event.resourceContext?.responseURL ===
    `http://${Constants.expoConfig.hostUri}/logs`
  ) {
    return null;
  }
  return event;
};
```

## 2. 레퍼런스

[RUM Expo Setup](https://docs.datadoghq.com/ko/real_user_monitoring/mobile_and_tv_monitoring/setup/expo/)
