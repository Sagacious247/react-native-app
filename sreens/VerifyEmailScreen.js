import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { QueryClient } from '@tanstack/react-query'

const VerifyEmailScreen = () => {
  const navigation = useNavigation()
  const queryclient = new QueryClient()

  const verifyEmail = async() => {

     try {
      const {data} = await axios.post(`http://192.168.43.127:3000/api/v1/users/verify-email`, {
        verificationToken: queryclient.get('token'),
        email: queryclient.get('email')
      })
     } catch (error) {
        Alert.alert("Registration Error", "Registration failed")
        console.log(error.response.data)
     }
  }

  useEffect(() => {
    verifyEmail()
  }, [])

  const handleLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView style={styles.container}>
      
    <Text style={styles.header}>Verify Email</Text>

    <Text>Account Confirmed</Text>
 
    <CustomButton
    onPress={handleLogin}
     title="Login"
     bgColor='#008DDA'
     color='white'
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

})
export default VerifyEmailScreen