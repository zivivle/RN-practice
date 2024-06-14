## expo에서 제공하는 파일 다운로드 라이브러리 사용

### 1. Expo FileSystem

[Expo FileSystem 링크 참조](https://docs.expo.dev/versions/latest/sdk/filesystem/)

설치 방법

```
npx expo install expo-file-system
```

다운로드 로직 예시 코드

```js
import * as FileSystem from 'expo-file-system'

...
const route = useRoute();


const onPressDownload = useCallback(async() => {
    const downloadResumable = FileSystem.createDownloadResumable(
        route.params.url,
        `${FileSystem.documentDirectory}${new Date().getMilliseconds().jpg}`
    )

    try {
        const {url} = await downloadResumable.downloadAsync();
    } catch(error) {
        console.log('error', error)
    }
})
```

### 2. Expo MediaLibrary

[Expo MediaLibrary 링크 참조](https://docs.expo.dev/versions/latest/sdk/media-library/)

설치 방법

```
npx expo install expo-media-library
```

### 2-1. Permissions 설정 방법

**MediaLibrary.getPermissionsAsync()** 와 **PermissionResponse** 사용해서 Permissions 설정 받기

- getPermissionsAsync 메서드로 받아오는 PermissionStatus의 값에는 'DENIED', 'GRANTED', 'UNDETERMINED'가 있다
- UNDETERMINED 상태인 경우에는 퍼미션 요청을 하지 않은 상태를 말한다

```js
import * as MediaLibrary from "expo-media-library";

const onPressDownload = useCallback(async () => {
  const downloadResumable = FileSystem.createDownloadResumable(
    route.params.url,
    `${FileSystem.documentDirectory}${new Date().getMilliseconds().jpg}`
  );
  try {
    const { uri } = await downloadResumable.downloadAsync();

    //FileSystem 다운로드 성공시 MediaLibrary 로직 실행되도록
    const permissionResult = await MediaLibrary.getPermissionsAsync(true);

    if (permissionResult.status === "denied") {
      //아예 못쓰는 상태
      return;
    }

    if (permissionResult.status === "undetermined") {
      const requestResult = await MediaLibrary.requestPermissionAsync();
      // 이 안에서도 상태 변경이 일어날 수 있기 때문에 분기처리를 해준다.
      if (requestResult.status === "denied") {
        return;
      }
    }

    // 모든 권한없을 상태를 지나 권항이 있는 경우의 로직을 작성
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = MediaLibrary.createAlbumAsync("TestFolder", asset, false);
  } catch (error) {
    console.log("error", error);
  }
});
```

### 3. 다운로드 중일때 화면 보여주기 Animation 추가해보기

#### 3-1. ActivityIndicator

적용 예시 코드

```js
...
const [downloading, setDownloading] = useState(false)

const onPressDownload = useCallback(async() => {
    setDownloading(true);***

    const downloadResumable = FileSystem.createDownloadResumable(
        route.params.url,
        `${FileSystem.documentDirectory}${new Date().getMilliseconds().jpg}`
    )
    try {
        const {uri} = await downloadResumable.downloadAsync();

        //FileSystem 다운로드 성공시 MediaLibrary 로직 실행되도록
        const permissionResult = await MediaLibrary.getPermissionsAsync(true)

        if(permissionResult.status === 'denied'){
            //아예 못쓰는 상태
            setDownloading(false);***
            return;
        }

        if(permissionResult.status === 'undetermined'){
            const requestResult = await MediaLibrary.requestPermissionAsync();
            // 이 안에서도 상태 변경이 일어날 수 있기 때문에 분기처리를 해준다.
            if(requestResult.status === 'denied'){
                setDownloading(false);***
                return;
            }
        }

        // 모든 권한없을 상태를 지나 권항이 있는 경우의 로직을 작성
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = MediaLibrary.createAlbumAsync('TestFolder', asset, false)

    } catch(error) {
        console.log('error', error)
    }

    setDownloading(false);***

    ...
    return(
        <View>
            ...
            <Button onPress={onPressDownload}>
                <View>
                    { downloading ? (
                        <View>
                            <ActivityIndicator/>
                        </View>
                    ): (
                        <View>
                            <Typography />
                            <Icon />
                        </View>
                    )}
                </View>
            </Button>
        </View>
    )

})

```

- 해당 **ActivityIndicator**를 사용하면 로딩중인 애니메이션을 손쉽게 넣을 수 있다.

### 4. onPress에 대한 애니메이션 처리

: Pressable에서 제공하는 onPressIn, onPressOut을 사용해서 애니메이션을 적용해보자

- **transform**으로 작아지고 커지는 애니메이션 효과를 적용해보자

  예시코드

  ```js
  export const PhotoListItem = () => {
      ...

      const onPressItem = useCallback(() => {
          navigation.navigate('ImageDetail', {url: props.url})
      }, [])

      ...

      const [animationValue] = useState(new Animated.Value(0))

      const onPressIn = useCallback(() => {
          Animated.timing(animationValue, {
              duration: 200,
              toValue: 1
          }).start();
      }, [])

      const onPressOut = useCallback(() => {
          Animated.timing(animationValue, {
              duration: 200,
              toValue: 0
          }).start();
      }, [])

      const scale = animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1.0, 0.95]
      })

      return (
          <Button
              onPress={onPressItem}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Animated.View
                  style={{transform: [{scale: scale}]}}
              >
                  <RemoteImage
                      url={url}
                  />
              </Animated.View>
          </Button>
      )
  }
  ```

- **const [animationValue] = useState(new Animated.Value(0))** 로 초기 animated의 value 값을 생성 + 지정할 수 있다.
- **animationValue.interpolate** 를 통해서 아래와 같이 지정하면 animationValue가 0에서 1로 변경되면 1.0에서 0.95로 변경된다는 뜻

  ```js
  const scale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.95],
  });
  ```

- **Animated.View** 요소로 감싸서 애니메이션을 효과를 줄 영역을 설정할 수 있다.

- **Animated.timing** 요소를 통해서 onPressIn, onPressOut 함수에 animationValue를 변경할 수 있다.

  ```js
  Animated.timing(animationValue, {
    duration: 200,
    toValue: 0,
  }).start();
  ```

  - **.start()** 로 애니메이션효과를 시작할 수 있다.
