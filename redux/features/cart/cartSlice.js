import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState : {
        cart: []
    },
    reducers: {
    ADD_TO_CART:(state, action) => {
        const existingItem = state.cart.find((item) => item.id === action.payload.id)
        if(existingItem) {
          existingItem.quantity++
        } else {
          state.cart.push({...action.payload, quantity: 1})
        }
      },
      REMOVE_FROM_CART:(state, action) => {
          const removeItem = state.cart.filter((item) => item.id !== action.payload.id)
          state.cart = removeItem
      },
      INCREASE_QUANTITY:(state, action) => {
          const existingItem = state.cart.find((item) => item.id === action.payload.id)
          existingItem.quantity++
      },
      DECREASE_QUANTITY: (state, action) => {
          const existingItem = state.cart.find((item) => item.id === action.payload.id)
          if(existingItem.quantity === 1) {
              existingItem.quantity = 0

              const removeItem = state.cart.filter((item) => item.id !== action.payload.id)
              state.cart = removeItem
          } else {
              existingItem.quantity--
          }
      },
      CLEAR_CART: (state) => {
          state.cart = []
      }
    }
})

export const {
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    CLEAR_CART
} = cartSlice.actions

export default cartSlice.reducer

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   cart: []
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     ADD_TO_CART: (state, action) => {
//         const itemPresent = state.cart.find(
//             (item) => item.id === action.payload.id )
//         if(itemPresent) {
//             itemPresent.quantity++
//         } else {
//             state.cart.push({...action.payload, quantity: 1})
//         }
//     },
//     REMOVE_FROM_CART: (state, action) => {
//         const removeItem = state.cart.filter(
//             (item) => item.id !== action.payload.id
//         )
//         state.cart = removeItem
//     },
//     INCREMENT_AUANTITY: (state, action) => {
//         const itemPresent = state.cart.find(
//             (item) => item.id === action.payload.id
//         )
//         itemPresent.quantity++
//     },
//     DECREMENT_QUANTITY: (state, action) => {
//         const itemPresent = state.cart.find(
//             (item) => item.id === action.payload.id
//         )
//         if(itemPresent.quantity === 1) {
//             itemPresent.quantity = 0;
//             const removeItem = state.cart.filter(
//                 (item) => item.id !== action.payload.id
//             )
//             state.cart = removeItem
//         } else {
//             itemPresent.quantity--
//         }
//     },
//     CLEAR_CART: (state, action) => {
//         state.cart = []
//     }
//   }
// });

// export const {
//     ADD_TO_CART, 
//     REMOVE_FROM_CART, 
//     DECREMENT_QUANTITY, 
//     CLEAR_CART
// } = cartSlice.actions

// export default cartSlice.reducer