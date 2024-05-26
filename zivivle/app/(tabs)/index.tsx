import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Image, Text } from "react-native";

const PlaceholderImage = require('../../assets/images/favicon.png')

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text>text</Text>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})