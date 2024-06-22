import { View, Text, StyleSheet, Platform, StatusBar, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CustomInput = ({ 
    icon, 
    placeholder, 
    value, 
    setValue, 
    secureTextEntry, 
    placeholderTextColor,

  }) => {
  return (
    <View style={styles.cotainer}>
       {icon === 'email' ? (
        <Fontisto name={icon} size={20} color="black" />
      ) : (
        <Ionicons name={icon} size={20} color="black" />
      )}
      <TextInput
       value={value}
       onChangeText={setValue}
       placeholder={placeholder}
       secureTextEntry={secureTextEntry}
       icon={icon}
       style={styles.input}
       placeholderTextColor={placeholderTextColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    cotainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      width: '100%',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    input: {
        padding: 10
    }
})

export default CustomInput