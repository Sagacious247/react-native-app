import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';
import { Alert } from 'react-native';

const initialState = {
   isLoggedIn: false,
   user: null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ""
}

// Register User
export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, thunkAPI) => {
        try {
            return authService.signup(userData)
        } catch (error) {
            const message =
            (error.message &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login User
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return authService.login(userData)
        } catch (error) {
            const message =
            (error.message &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET_AUTH(state) {
        state.isError  = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = ""
    }
  },
  extraReducers: (builder) => {
     builder
       // Register User
       .addCase(signup.pending, (state) => {
        state.isLoading = true
       })
       .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload
        Alert.alert("Registration successful")
       })
       .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null
        Alert.alert(action.payload)
       })
       // Login User
       .addCase(login.pending, (state) => {
        state.isLoading = true
       })
       .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload
        Alert.alert("Login successful")
       })
       .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null
        Alert.alert(action.payload)
       })
  }
});

export const {RESET_AUTH} = authSlice.actions

export default authSlice.reducer