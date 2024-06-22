import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation()

  // const loginStatus = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("authToken")
  //     if(token) {
  //       navigation.replace("Main")
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.message)
  //   }
  // }

  // useEffect(() => {
  //   loginStatus()
  // }, [])

  const handleLogin = async () => {
    if(!email || !password) {
      return Alert.alert("All fields are required")
    }

    try {
      const response = await axios({
        method: "POST",
        url: 'http://192.168.43.127:3000/api/v1/users/login',
        data: {
          email,
          password
        }
      })
     const token = response.data.token
     AsyncStorage.setItem("authToken", token)
     navigation.replace("Main")
     setEmail("")
     setPassword("")
    } catch (error) {
      Alert.alert("Failed to Login", "Something went wrong")
      console.log(error.response.data.message)
    }
  }

  const handForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  const handlecreate = () => {
   navigation.replace("Register")
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: "https://fiverr-res.cloudinary.com/image/upload/f_png,q_auto,t_makers_project_variation_preview/v1/secured-attachments/makers_project_variation/preview_file/92ee3aa080c1f99ee05898f3fdd3b717-1671211621/5ea2f8159598bb000efd59db.svg?__cld_token__=exp=1716909740~hmac=5fab6bece6a0f12af6110879ae43833e46eefb3482152d745bd0f0816cb466fd"}}/>
       <Text style={{fontStyle: "italic", fontWeight: 'bold', fontSize: 22}}>Dubbeez Ventures</Text>
       <Text style={{fontStyle: "italic", color: '#008DDA', marginBottom: 10}}>Quality never goes out of style.</Text>
      
    <Text style={styles.header}>Login your Account</Text>
    <CustomInput
     placeholder="Enter Email Address"
     value={email}
     setValue={setEmail}
     secureTextEntry={false}
     icon="email"
    />
    <View style={styles.displayPaasword}>
      <CustomInput
      placeholder="Enter Password"
      value={password}
      setValue={setPassword}
      secureTextEntry={showPassword}
      icon='lock-closed-outline'
      />
      <View
      style={styles.icon}
      onPress={handleShowPassword}
      >
        {showPassword ? (
          <Ionicons name="eye-outline" size={22} color="black" />
        ) : (
          <Ionicons name="eye-off-outline" size={22} color="black" />
        )}
      </View>
    </View>
    <CustomButton
    onPress={handleLogin}
     title="Login"
     bgColor='#008DDA'
     color='white'
    />
    <CustomButton 
      onPress={handForgotPassword}
      title="Forgot Password" 
      bgColor='#F97B22'
      // bgColor='#84B196'
      color="white"
      />
      <CustomButton 
      onPress={handlecreate}
      title="Don't have an account? Create one" 
      // bgColor='#E7EAF4'
      bgColor='#84B196'
      color='#FFF'
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
image: {
  height: 120,
  width: '100%',
  resizeMode: 'contain',
  marginTop: 30,
},
header: {
  color: '#01204E',
  fontWeight: 'bold',
  fontSize: 18,
  marginVertical: 15
},
displayPaasword: {
  position: 'relative',
  width: '100%'
},
icon: {
  position: 'absolute',
  right: 10,
  top: 25
},

})
export default LoginScreen