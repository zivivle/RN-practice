import { Text, View, StyleSheet } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello World!
      </Text>
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
  }
})