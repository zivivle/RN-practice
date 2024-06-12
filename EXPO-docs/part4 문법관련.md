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
import * as MediaLibrary from 'expo-media-library'

const onPressDownload = useCallback(async() => {
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
            return;
        }

        if(permissionResult.status === 'undetermined'){
            const requestResult = await MediaLibrary.requestPermissionAsync();
            // 이 안에서도 상태 변경이 일어날 수 있기 때문에 분기처리를 해준다.
            if(requestResult.status === 'denied'){
                return;
            }
        }

        // 모든 권한없을 상태를 지나 권항이 있는 경우의 로직을 작성
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = MediaLibrary.createAlbumAsync('TestFolder', asset, false)

    } catch(error) {
        console.log('error', error)
    }
})

```
