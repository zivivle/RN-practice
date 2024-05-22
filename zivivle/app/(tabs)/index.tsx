import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello World!
      </Text>
      {/* local에서 이미지를 가져오는 방법 */}
      <Image 
        source={require('../../assets/images/favicon.png')}
        style={styles.icon_image}
      />
      {/* 외부 경로 이미지를 가져오는 방법 */}
      <Image 
        source={{uri: "https://reactnative.dev/docs/assets/p_cat2.png"}}
        style={styles.icon_image}
      />

      <TextInput placeholder="이름을 입력해주세요." />

      {/* <ScrollView>
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon_image}
        />
        
      </ScrollView> */}
      <Button title="Click Me!" onPress={() => {
        console.log("버튼 클릭!");
      }}/>

      <Switch value={true} />
      <Switch value={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon_image: {
    width: 50,
    height: 50,
  }
})