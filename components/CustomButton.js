import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../config/colors'

const CustomButton = ({
  title, 
  bgColor = "primary", 
  color, 
  borderRadius= 5, 
  onPress, 
  padding = 14,
}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[styles.button, {backgroundColor: bgColor, padding: padding, borderRadius: borderRadius}]}>
      <Text style={[styles.text, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 5,
        width: '100%',
        padding: 14,
    alignItems: 'center',
    marginVertical: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  secondary: {
    color: colors.black
  }
})

export default CustomButton