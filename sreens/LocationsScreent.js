import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable, YellowBox } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { UserType } from '../userContext';
import CustomButton from '../components/CustomButton';

const LocationsScreent = () => {
  const [addresses, setAddresses] = useState([])
    const navigation = useNavigation()
    const {id, setId} = useContext(UserType)
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#01204E",
        },
          headerLeft: () => (
            <MaterialIcons
            onPress={() => navigation.goBack('Main')}
            name="keyboard-double-arrow-left" 
            size={24} 
            color="white" 
            />
          )
        });
      }, []);

      useEffect(() => {
         fetchLocation()
      }, [])
  
      const fetchLocation = async () => {
          const response = await axios({
            method: 'GET',
            url: `http://192.168.43.127:3000/api/v1/users/addresses/${id}`
          })
          const {addresses} = response.data
          setAddresses(addresses)
      }

      useFocusEffect(
        useCallback(() => {
          fetchLocation()
        }, [])
      )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: 10}}>
       <Text style={styles.locationText}>Your Locations</Text>

       <TouchableOpacity 
       onPress={() => navigation.navigate("Location")}
       style={styles.addContainer}>
        <Text>Add a new Location</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
       </TouchableOpacity>

       <Pressable>
        {addresses.map((item, index) => 
        <Pressable 
         style={{
          borderWidth: 1,
          borderColor: "#D0D0D0",
          flexDirection: 'column',
          padding: 10,
          gap: 5,
          marginVertical: 10
         }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3
          }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item?.name}</Text>
            <Entypo name="location-pin" size={24} color="red" />
          </View>

          <Text style={{fontSize: 15, color: '#181818'}}>{item?.houseNo}, {item?.landMark}</Text>

          <Text style={{fontSize: 15, color: '#181818'}}>{item?.street}</Text>

          <Text style={{fontSize: 15, color: '#181818'}}>Abuja, Nigeria</Text>

          <Text style={{fontSize: 15, color: '#181818'}}>Phone No. {item?.mobileNo}</Text>

          <Text style={{fontSize: 15, color: '#181818'}}>Postal Code {item?.postalCode}</Text>

          <View 
           style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 10
           }}
          >
            <TouchableOpacity
             style={{
              backgroundColor: "blue",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#D0D0D0"
             }}
            >
              <Text style={{color: 'white'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={{
              backgroundColor: "red",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#D0D0D0"
             }}
            >
              <Text style={{color: 'white'}}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={{
              backgroundColor: "green",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              borderWidth: 0.9,
              borderColor: "#D0D0D0"
             }}
            >
              <Text style={{color: 'white'}}>Default Setting</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
        )}
       </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    locationText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 7,
        paddingHorizontal: 5
    }
})

export default LocationsScreent