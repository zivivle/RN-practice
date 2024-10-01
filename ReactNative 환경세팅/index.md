## 환경 설정 Docs 한글버전

이 가이드에서는 Android Studio와 Xcode를 사용하여 프로젝트를 실행할 수 있는 개발 환경을 설정하는 방법이다. 이를 통해 Android 에뮬레이터 및 iOS 시뮬레이터에서 앱을 개발하고, 로컬에서 앱을 빌드하는 등의 작업을 수행할 수 있다.

참고: 이 가이드는 Android Studio 또는 Xcode가 필요하다. 만약 이미 이 프로그램들이 설치되어 있다면 몇 분 안에 환경 설정을 완료할 수 있다. 설치되지 않는 경우, 설치 및 구성을 완료하는 데 약 1시간 정도 소요될 수 있다.

## 환경 설정이 필수인가요?

만약 React Native 프레임워크를 사용하고 있다면, Android Studio나 Xcode를 설정하지 않아도 된다. 프레임워크가 네이티브 앱 빌드 작업을 자동으로 처리해 주기 때문이다.
프레임워크 사용에 제약이 있거나 직접 프레임워크를 작성하고자 하는 경우에는 로컬 환경을 설정하는 것이 필수이다. 환경 설정을 마친 후, 프레임워크 없이 시작하는 방법을 확인할 수 있다.

## 개발 OS 및 타켓 OS

### 의존성 설치

Node, Watchman, React Native CLI, JDK, Android Studio가 필요하다.
어떤 에디터든 상관없이 Android Studio는 Android용 React Native 앱 빌드를 위한 필수 툴을 설정하기위해 반드시 설치해야 한다.

### Node & Watchman

Homebrew를 사용하여 Node와 Watchman을 설치하는 것을 권장한다.<br/>
Homebrew 설치 후 터미널에서 다음 명령어를 실행

```
brew install node
brew install watchman
```

### Java Development Kit (JDK)

Homebrew를 사용하여 Azul Zulu라는 OpenJDK 배포판을 설치하는 것을 권장한다.<br/>
터미널에서 다음 명령어를 실행

```
brew install --cask zulu@17
```

설치된 cask 경로를 확인하려면 다음 명령어를 실행하자

```
brew info --cask zulu@17
```

JDK 설치 후, `~/.zshrc` (또는 `~/.bash_profile`) 파일에 `JAVA_HOME` 환경 변수를 추가하거나 업데이트란다.<br/>
위의 방법으로 설치한 경우, JDK는 `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home` 경로에 있을 것이다.<br/>

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

Zulu OpenJDK 배포판은 Intel 및 M1 Mac 모두 지원하므로, M1 Mac에서의 빌드 속도를 Intel 기반 JDK보다 더 빠르게 해준다.<br/>
이미 JDK를 설치했다면, JDK 17을 사용하는 것을 권장한다. 더 높은 버전을 사용할 경우 문제가 발생할 수 있다.

### Android 개발 환경 설정

Android 개발에 익숙하지 않은 경우 환경 설정이 다소 번거로울 수 있다. Android 개발에 익숙하다면 몇 가지 추가 설정만 필요할 것이다. 아래 단계를 차례로 따라 설정하자.

#### 1. Android Studio 설치

Android Studio를 다운로드하고 설치한다. 설치 마법사에서 다음 항목들이 체크되어 있는지 확인하자.

- Android SDK
- Android SDK Platform
- Android Virtual Device

체크 박스가 비활성화되어 있으면 나중에 설치할 기회가 제공된다. <br/>
설치가 완료되고 환영 화면이 표시되면 다음 단계로 진행하자

#### 2. Android SDK 설치

Android Studio는 기본적으로 최신 Android SDK를 설치한다. 하지만 네이티브 코드를 사용하여 React Native 앱을 빌드하려면 Android 14 (UpsideDownCake) SDK가 필요하다. 추가 Android SDK는 Android Studio의 SDK Manager를 통해 설치할 수 있다.

Android Studio를 열고 "More Action" 버튼을 클릭한 후 "SDK Manager"를 선택한다.
SDK Manager는 Android Studio "Settings" 다이얼로그에서 Languages & Frameworks -> Android SDK 경로에서도 찾을 수 있다.

SDK Manager의 "SDK Platforms" 탭을 선택한 후, 오른쪽 하단의 "Show Package Details" 옵션을 체크한다.

Android 14 (UpsideDownCake) 항목을 찾아 확장한 후, 다음 항목들이 체크되어 있는지 확인하자

- Android SDK Platform 34
- Intel x86 Atom_64 System Image 또는 Google APIs Inter x86 Atom System Image 또는 (Apple M1 Silicon의 경우) Google APIs ARM v8a System Image

다음으로, "SDK Tools" 탭을 선택하고, "Show Package Details"를 체크한 후, "Android SDK BuildTools" 항목을 확장하여 34.0.0이 선택되어 있는지 확인하다.

마지막으로 "Apply" 버튼을 클릭하여 Android SDK 및 관련 빌드 도구를 다운로드하고 설치한다.

#### 3. ANDROID_HOME 환경 변수 설정

React Native 도구는 네이티브 코드로 앱을 빌드하기 위해 일부 환경 변수를 설정해야 한다. <br/>
`~/.zprofile` 또는 `~/.zshrc` (bash를 사용하는 경우, `~/.bash_profile` 또는 `~/.bashrc`) 파일에 다음 줄을 추가하자

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

`source ~/.zprofile` (또는 bash의 경우 `source ~/.bash_profile`) 명령어를 실행하여 현재 셸에 설정을 로드한다.
`echo $ANDROID_HOME`을 실행하여 `ANDROID_HOME`이 올바르게 설정되었는지 확인하고, `echo $PATH`를 실행하여 적절한 디렉토리가 경로에 추가되었는지 확인한다.

올바른 Android SDK 경로를 사용하는지 확인하자. Android Studio "Settings" 다이얼로그의 Languages & Frameworks → Android SDK 경로에서 SDK의 실제 위치를 확인할 수 있다.

### Android 디바이스 준비

React Native Android 앱을 실행하려면 Android 디바이스가 필요하다. 이는 실제 Android 디바이스일수도 있고, 일반적으로는 컴퓨터에서 Android 디바이스를 에뮬레이션할 수 있는 Android Virtual Device(AVD)를 사용할 수도 있다.
어느 경우든, Android 앱을 개발할 수 있도록 디바이스를 준비해야 한다.
