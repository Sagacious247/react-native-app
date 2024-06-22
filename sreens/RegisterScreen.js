import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, signup } from '../redux/features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  // const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleRegister = async()=> {
     if(!email || !password) {
      return Alert.alert("All fields are required")
     }

     try {
      const response = await axios({
        method: "POST",
        url: 'http://192.168.43.127:3000/api/v1/users/signup',
        data: {
          name,
          email,
          password
        }
      })
      if(response.status === 201) {
        navigation.navigate("Verify")
        Alert.alert("Registered Successfully", "Please check your email to verify account")
        setName("")
        setEmail("")
        setPassword("")
      }
     } catch (error) {
        Alert.alert("Registration Error", "Registration failed")
        console.log(error.response.data)
     }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handlLogin = () => {
    navigation.replace("Login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{uri: "https://fiverr-res.cloudinary.com/image/upload/f_png,q_auto,t_makers_project_variation_preview/v1/secured-attachments/makers_project_variation/preview_file/92ee3aa080c1f99ee05898f3fdd3b717-1671211621/5ea2f8159598bb000efd59db.svg?__cld_token__=exp=1716909740~hmac=5fab6bece6a0f12af6110879ae43833e46eefb3482152d745bd0f0816cb466fd"}}/>
       <Text style={{fontStyle: "italic", fontWeight: 'bold', fontSize: 22}}>Dubbeez Ventures</Text>
       <Text style={{fontStyle: "italic", color: '#008DDA', marginBottom: 10}}>Quality never goes out of style.</Text>
      
      <Text style={styles.header}>Create an Account</Text>
      <CustomInput
       placeholder="Enter Username"
       value={name}
       setValue={setName}
       secureTextEntry={false}
       icon="person-outline"
      />
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
        secureTextEntry={true}
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
       title="Register"
       bgColor='#008DDA'
       color='white'
       onPress={handleRegister}
      />

<CustomButton 
      onPress={handlLogin}
      title="Have an account? Login" 
      // bgColor='#E7EAF4'
      bgColor='#84B196'
      color='#FFF'
      />
      <Text style={styles.text}>By registering, you have agreed to 
        <Text style={{color: '#FDB075'}}>our Terms</Text> and <Text style={{color: '#FDB075'}}>Privacy Policy</Text>
      </Text>
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
    top: 25
  },
  text: {
    color: "gray",
    marginVertical: 10
  }
})

export default RegisterScreen