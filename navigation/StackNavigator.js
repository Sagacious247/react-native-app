import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../sreens/LoginScreen'
import RegisterScreen from '../sreens/RegisterScreen'
import ForgotPasswordScreen from '../sreens/ForgotPasswordScreen'
import ResetPasswordScreen from '../sreens/ResetPasswordScreen'
import BottomTabNavigation from './BottomTabNavigation'
import ProductDetailScreen from '../sreens/ProductDetailScreen'
import ConfirmationScreen from '../sreens/ConfirmationScreen'
import LocationsScreent from '../sreens/LocationsScreent'
import LocationScreen from '../sreens/LocationScreen'
import OrderScreen from '../sreens/OrderScreen'
import VerifyEmailScreen from '../sreens/VerifyEmailScreen'
import CheckoutScreen from '../sreens/CheckoutScreen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
       name='Login'
       component={LoginScreen}
       options={{
          headerShown: false
       }}
      />
      <Stack.Screen
      name='Main'
      component={BottomTabNavigation}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
       name='ResetPassword'
       component={ResetPasswordScreen}
       options={{
        headerShown: false
       }}
      />
        <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen
         name='Register'
         component={RegisterScreen}
         options={{
            headerShown: false
         }}
        />
        <Stack.Screen
        name='Detail'
        component={ProductDetailScreen}
        options={{
          headerShown: true
        }}
        />
        <Stack.Screen
        name='Confirm'
        component={ConfirmationScreen}
        />
        <Stack.Screen
        name='Locations'
        component={LocationsScreent}
        />
        <Stack.Screen
        name='Location'
        component={LocationScreen}
        />
        <Stack.Screen
        name='Order'
        component={OrderScreen}
        />
        <Stack.Screen
        name='Verify'
        component={VerifyEmailScreen}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
        />
    </Stack.Navigator>
  )
}

export default StackNavigator