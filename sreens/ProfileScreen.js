import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen() {
  const {id, setId} = useContext(UserType)
  const [user, setUser] = useState()
 const [orders, setOrders] = useState([])
 const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  console.log("user:",id)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  // const fetchProfile = async () => {
  //   try {
  //     const userData = await axios({
  //       method: "GET",
  //       url: `http://192.168.43.127:3000/api/v1/users/profile/${id}`,
  //     })
  //     console.log("userData",userData.data)
  //     let user = userData.data
  //     setUser(user)
  //   } catch (error) {
  //     console.log('error', error.response.data)
  //   }
  // }
  const fetchProfile = async () => {
    try {
     const response = await axios({
       method: "GET",
       url: `http://192.168.43.127:3000/api/v1/users/profile/${id}`,
       headers: {
         "content-type": "application/json"
       }
     })
     const {...user} = response.data
     console.log("userData:",user)
     setUser(user)
    } catch (error) {
      console.log("error", error.response.data)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const signout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel presses")
        },
        {
          text: "Continue", onPress: () => clearAuthToken()
        }
      ]
    )
    
  }

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken')
    navigation.replace('Login')
  }


  useEffect(() => {
    const fetchOders = async () => {
      try {
        setLoading(true)
        const response = await axios({
          method: 'GET',
          url: `http://192.168.43.127:3000/api/v1/orders/${id}`
        })
        const {orders} = response.data
        setOrders(orders)
        setLoading(false)
      } catch (error) {
        console.log('error', error.response.data)
      }
    }
    fetchOders()
  }, [])

  return (
    <ScrollView >
      {/* style={{ padding: 10, flex: 1, backgroundColor: "white" }} */}
      <View>
        <Image
        style={{width: '100%', height: 200}}
        source={{uri: "https://img.freepik.com/free-photo/colorful-wallpaper-background-multicolored-generative-ai_91128-2257.jpg"}}/>
      </View>

      <View 
      style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginVertical: 20,
        marginTop: -50
        
        }}>
        <Image 
        style={{
          width: 70, 
          height: 70, 
          resizeMode: 'contain', 
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#00CED1"
          }} 
          // source={{uri: user?.image}}
          source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRD7Q19DRsBsG9YP8VVeKCwzAUv8VqE_TqdNn9aFAihZyng5IKPPouN463Kt7CW8dnag0&usqp=CAU"}}
          />

          <Pressable>
          <Text style={{textAlign: 'center', color: "green"}}>Sagacious</Text>
          </Pressable>
      </View>

      <View 
      style={{
        paddingHorizontal: 20,
        }}
        >
      <Pressable>
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
          <Fontisto name="email" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Email {user?.email}</Text>
          </View>
      </Pressable>
      </View>

      <View 
      style={{
        paddingHorizontal: 20,
        marginVertical: 20

        }}
        >
      <Pressable>
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
          <Feather name="phone" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Phone {user?.phone}</Text>
          </View>
      </Pressable>
      </View>

      <View 
      style={{
        paddingHorizontal: 20,
        }}
        >
      <Pressable
      onPress={() => navigation.navigate("Favourite")}
      >
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
          <MaterialIcons name="favorite-outline" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Favourite {user?.email}</Text>
          </View>
      </Pressable>
      </View>

      <View 
      style={{
        paddingHorizontal: 20,
        marginVertical: 20

        }}
        >
      <Pressable>
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
         <FontAwesome5 name="shopify" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Order {user?.email}</Text>
          </View>
      </Pressable>
      </View>

      <View 
      style={{
        paddingHorizontal: 20,
        }}
        >
      <Pressable>
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
         <MaterialCommunityIcons name="more" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Buy More {user?.email}</Text>
          </View>
      </Pressable>
      </View>
      
      <View 
      style={{
        paddingHorizontal: 20,
        marginVertical: 20
        }}
        >
      <Pressable
      onPress={signout}
      >
          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 5,
            gap: 30
          }}>
         <FontAwesome name="sign-out" size={20} color="black" />
          <Text numberOfLines={1} style={{textAlign: 'center'}}>Signout {user?.email}</Text>
          </View>
      </Pressable>
      </View>

      


      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      >
        {loading ? (
           <View 
           style={{ 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: 20
            }}>
             <ActivityIndicator 
               size="smaill" 
               color="#00ff00" 
               />
           </View>
        ) : orders.length > 0 ? (
          orders?.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order?.products?.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product?.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  )
}

export default ProfileScreen
