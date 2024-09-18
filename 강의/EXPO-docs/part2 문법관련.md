### 휴대폰 라이브러리에서 이미지와 비디오를 선택하거나 카메라로 사진을 찍기 위해 시스템 UI에 대한 액세스를 제공하는 라이브러리

1. 사용 방법
    ```
    npx expo install expo-image-picker
    ```
    : npx로 라이브러리 설치 세팅

2. 예시 코드
    ```js
    export default function ImagePickerExample() {
        const [image, setImage] = useState(null);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
            setImage(result.assets[0].uri);
            }
        };

        return (
            <View style={styles.container}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        );
    }
    ```

### 안드로이드일때만 다른 스타일을 적용하도록 하고 싶다면 Platform.OS 사용해서 구분하기
```js

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: #fff,
        marginTop: Platform.OS === 'android' ? 30 : 0,
    }
})
```

### 현재 화면의 전체 길이를 구하고 싶다면?? Dimensions.get('screen').width

```js
const screenWidth = Dimensions.get('screen').width;
const ColumnWidth = screenWidth / 3;
```

### RN에서 지원하는 Modal 사용하기
Modal 컴포넌트는 React Native에서 뷰 위에 콘텐츠를 표시하는 기본적인 방법이다. 주요 속성은 다음과 같다:

	•	animated: 더 이상 사용되지 않음. 대신 animationType을 사용.
	•	animationType: 모달의 애니메이션 유형을 지정 (slide, fade, none).
	•	hardwareAccelerated (Android): 하드웨어 가속을 강제할지 여부.
	•	onDismiss (iOS): 모달이 닫힐 때 호출되는 함수.
	•	onOrientationChange (iOS): 모달이 표시되는 동안 방향이 바뀔 때 호출되는 콜백.
	•	onRequestClose: Android 백 버튼 또는 Apple TV 메뉴 버튼을 눌렀을 때 호출되는 콜백.
	•	onShow: 모달이 표시되었을 때 호출되는 함수.
	•	presentationStyle (iOS): 모달의 표시 스타일 (fullScreen, pageSheet, formSheet, overFullScreen).
	•	statusBarTranslucent (Android): 모달이 시스템 상태 표시줄 아래로 갈지 여부.
	•	supportedOrientations (iOS): 지원되는 방향 목록.
	•	transparent: 모달이 전체 뷰를 채울지 여부.
	•	visible: 모달의 가시성을 제어.

- 예시 코드

```js
<Modal 
    animationType="fade"
    transparent={true}
    visible={modalVisible}
>  
    ...
</Modal>
```


### 만약 Pressable이 중첩되어 있을 경우 우선순위는 안쪽의 Pressable이 갖는다.
```js
<View>
    <Pressable        onPress={onPressBackdrop}
    >
        <Pressable>
            ...
        </Pressable>    
    </Pressable>
</View>
```
위  코드와 같은 구조일 경우 안쪽의 Pressable을 눌렀을 경우 onPressBackdrop가 발생하지 않는다 :)


### 광고를 넣고 싶다면 구글 admob? -> expo의 한계점

### 현재 플랫폼 선택할 수 있는 메서드 Platform.select
```js
const UNIT_ID = Platform.select({
    ios: __DEV__ ? "dev_abc" : "abc",
    android: ___DEV__ ? "dev_ccd" : "ccd",
})
```

### 가로길이가 제각각인 화면별 대응
