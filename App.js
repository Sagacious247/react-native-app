import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import axios from 'axios';
import { ModalPortal } from 'react-native-modals';
import { UserContext, UserType } from './userContext';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  axios.defaults.withCredentials = true
  

  return (
    <Provider store={store}>
    <UserContext>
      <StripeProvider 
      publishableKey='pk_test_51P8ucvLsivWI13jqhFD76W7MDi7mjIjt0BOjpUMaLroE6siHrTuBaFwL21Hd1BeeiGCP6kxtomsRKf8KKj4ikTCz00C99FFvR1'
      >
    <NavigationContainer>
      <StackNavigator/>
      <ModalPortal/>
    </NavigationContainer>
      </StripeProvider>
    </UserContext>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
