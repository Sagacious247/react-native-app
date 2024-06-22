import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialIcons} from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../userContext';
import axios from 'axios';

const LocationScreen = () => {
    const [name, setName] = useState("")
    const [street, setStreet] = useState("")
    const [houseNo, setHouseNo] = useState("")
    const [landMark, setLandMark] = useState("")
    const [postalCode, setPostalCode] = useState({})
    const [mobileNo, setMobileNo] = useState("")
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
      const fetchUser = async() => {
        const token = await AsyncStorage.getItem('authToken')
        const decoded = jwtDecode(token)
        const id = decoded.id
        setId(id)
      }
      fetchUser()
    }, [])

      const handleLocation = async () => {
        
        const address = {
          name,
          mobileNo,
          houseNo,
          street,
          landMark,
          postalCode
        }

        axios.post("http://192.168.43.127:3000/api/v1/users/addresses", {id, address})
        .then((Response) => {
          Alert.alert("Success", "Address added successfully!")
          setName("")
          setMobileNo("")
          setHouseNo("")
          setStreet("")
          setLandMark("")
          setPostalCode("")
          
          setTimeout(() => {
            navigation.goBack()
          }, 500)
        }).catch((error) => {
          console.log("error", error.response.data)
          Alert.alert("Error", "Failed to add address")
        })
      }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{padding: 10}}>
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>Add a new Location</Text>

      <CustomInput
      placeholderTextColor={"black"}
      placeholder="Nigeria"
      />

      <View>
       <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>Full name: (First name & last name)</Text>

       <CustomInput
       value={name}
       setValue={setName}
       placeholder={"Enter your name"}
       placeholderTextColor={"black"}
       />
      </View>

      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>Mobile number</Text>
        <CustomInput
        value={mobileNo}
        setValue={setMobileNo}
       placeholder={"Enter Mobile No."}
       placeholderTextColor={"black"}
       />
      </View>

      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>House No, Company</Text>
        <CustomInput
        value={houseNo}
        setValue={setHouseNo}
        placeholder={"Enter House No."}
       placeholderTextColor={"black"}
       />
      </View>

      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>Area & Street</Text>
        <CustomInput
        value={street}
        setValue={setStreet}
         placeholder={"Enter street No."}
         placeholderTextColor={"black"}
        />
      </View>

      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>Landmark</Text>
        <CustomInput
        value={landMark}
        setValue={setLandMark}
        placeholder={"Enter your area"}
        placeholderTextColor={"black"}
        />
      </View>

      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 3}}>Postal Code</Text>
        <CustomInput
        value={postalCode}
        setValue={setPostalCode}
        placeholder={"Enter Postal Code"}
        placeholderTextColor={"black"}
        />
      </View>
      <CustomButton
      onPress={handleLocation}
       title="Add Address"
       bgColor='#F97B22'
       color={"white"}
      />
    </View>
    </ScrollView>
  )
}

export default LocationScreen