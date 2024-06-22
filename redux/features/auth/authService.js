import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const BACKEND_URL = process.env.REACT_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/v1/users/`

const signup = async ({...userData}) => {
   const response = await axios.post(API_URL + 'signup', userData, {
    withCredentials: true
   })
   return response.data
}

// Login User
const login = async ({...userData}) => {
    const response = await axios.post(API_URL + 'login', userData, )
    if(response.status === 'success') {
        const token = response.data.token
        await AsyncStorage.setItem('token', token)
    }
};

const authService = {
    signup,
    login
}

export default authService