import { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch } from "react-native";


export default function HomeScreen() {
  const [value, setValue] = useState(false);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Button title="Click Me!" onPress={() => {
        console.log("버튼 클릭!");
      }}/>

      <Switch value={value} onValueChange={v => {
        setValue(v)
      }}/>
      <TextInput 
        value={text} 
        onChangeText={v => {
          setText(v)
        }}
        style={{ backgroundColor: "pink", width: "100%" }}
      />
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