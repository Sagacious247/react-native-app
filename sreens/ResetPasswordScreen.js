import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ResetPasswordScreen = () => {
    const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


    const handleResetPassword = async () => {
       try {
        const response = await axios({
          method: "PATCH",
          // url: `http://192.168.43.127:3000/api/v1/users/resetPassword/${}`
        })
       } catch (error) {
        
       }
    }

    const handleShowPassword = () => {}

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Reset Password</Text>
    <View style={styles.displayPaasword}>
        <CustomInput
        placeholder="Enter Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={showPassword}
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
    onPress={handleResetPassword}
     title="Reset Password"
     bgColor='#00CED1'
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
  top: 22
},

})

export default ResetPasswordScreen