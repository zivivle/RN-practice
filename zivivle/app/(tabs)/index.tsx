import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceholderImage = require('../../assets/images/favicon.png')

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.imageContainer}>
        <Text style={styles.text}>text</Text>
        <Image source={PlaceholderImage} style={styles.image} />
        <Text style={styles.text}>tes</Text>
      </SafeAreaView>
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
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center'
  }
})