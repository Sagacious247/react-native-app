import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    const handleForgotPassword = async() => {
      if(!email) {
        return Alert.alert("Please provide a valid email address")
      }
      try {
        const response = await axios({
          method: 'POST',
          url: 'http://192.168.43.127:3000/api/v1/users/forgotPassword',
          data: {
            email
          }
        })
        if(response.status === 200) {
          navigation.navigate("ResetPassword")
          Alert.alert("Check your email for a reset token.")
          setEmail("")
        }
      } catch (error) {
        Alert.alert("There was an error sending the email, Try again later")
        console.log(error.response.data.message)
      }
    }

    const handleLogin = () => {
      navigation.navigate("Login")
    }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Forgot Password</Text>
    <CustomInput
     placeholder="Enter Email Address"
     value={email}
     setValue={setEmail}
     secureTextEntry={false}
     icon="email"
    />
   
    <CustomButton
    onPress={handleForgotPassword}
     title="Send Email"
     bgColor='#00CED1'
     color='white'
    />
    <CustomButton
      onPress={handleLogin}
      title="Login" 
      bgColor='#84B196'
      color="white"
      />
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
container: {
  alignItems: 'center',
  padding: 10,
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
},
header: {
  color: '#01204E',
  fontWeight: 'bold',
  fontSize: 22,
  marginVertical: 15
},
displayPaasword: {
  position: 'relative',
  width: '100%'
},
icon: {
  position: 'absolute',
  right: 10,
  top: 5
},

})

export default ForgotPasswordScreen