import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../sreens/HomeScreen'
import { Ionicons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import ProfileScreen from '../sreens/ProfileScreen';
import CartScreen from '../sreens/CartScreen';
import { useSelector } from 'react-redux';

const BottomTabNavigation = () => {
    const Tab = createBottomTabNavigator()
    const cart = useSelector((state) => state.cart.cart)


  return (
    <Tab.Navigator>
      <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarLabelStyle: {color: "#000E97"},
          headerShown: false,
          tabBarIcon:({ focused}) => 
            focused ? (
              <Entypo name="home" size={24} color="#000E97" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            )
      }}
      />

      <Tab.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarLabelStyle: {color: "#000E97"},
        headerShown: false,
        tabBarIcon: ({focused}) => 
            focused ? (
                <Ionicons name="person" size={24} color="#000E97" />
            ) : (
                <Ionicons name="person-outline" size={24} color="black" />
            )
      }}
      />

{/* <Tab.Screen 
    name='Drawer'
    component={AdminScreen}
    options={{
        tabBarLabel: "Admin",
        tabBarLabelStyle: {color: "#000E97"},
        headerShown: false,
        tabBarIcon: ({focused}) => 
            focused ? (
                <MaterialIcons name="admin-panel-settings" size={24} color="#000E97" />
              ) : (
                <MaterialIcons name="admin-panel-settings" size={24} color="black" />
              )
    }}
    /> */}

    <Tab.Screen
    name='Cart'
    component={CartScreen}
    options={{
      tabBarLabel: 'Cart',
      tabBarLabelStyle: {color: "#000E97"},
      tabBarIcon: ({focused}) => 
        focused ? (
          <AntDesign name="shoppingcart" size={24} color="#000E97" />
        ) : (
          <>
          <AntDesign name="shoppingcart" size={24} color="black" />
          <View style={styles.icon}>
          <Text style={{color: 'gray'}}>{cart?.length}</Text>
          </View>
          </>
        )
    }}
    style={{position: "relative"}}
    />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'gold',
    width: 20,
    height:20,
    position: 'absolute',
    top: 1,
    right: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})

export default BottomTabNavigation