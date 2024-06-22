import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'

function OrderScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Main")
    }, 5000)
  })
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../assets/thumbs.json")}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})

export default OrderScreen

