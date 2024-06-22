import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART } from '../redux/features/cart/cartSlice'
import { useNavigation } from '@react-navigation/native'

const ProductItem = ({item}) => {
  const [addedToCart, setAddedToCart] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()

 const addItemToCart = (item) => {
  setAddedToCart(true)
  dispatch(ADD_TO_CART(item))
  setTimeout(() => {
    setAddedToCart(false)
  }, 2000)
 }

 const cart = useSelector((state) => state.cart.cart)
  console.log('cart:', cart)

  return (
      <Pressable style={styles.container}
      
      >
      <Image 
      style={{
        width: 150, 
        height: 150,
        resizeMode: 'contain'
        }} 
        source={{uri: item?.image}}
        />
        <Text numberOfLines={1} style={styles.text}>{item?.title}</Text>

        <View 
        style={{
          marginTop: 5, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between'
          }}
        >
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item?.price}</Text>
          <Text style={{color: '#F97B22', fontWeight: 'bold'}}>{item?.rating?.rate} ratings</Text>
        </View>

        <Pressable >
       {addedToCart ? (
        <CustomButton
        title="Added to Cart"
        bgColor='#00CED1'
        color='#FFF'
        padding={8}
        onPress={() => addItemToCart(item)}
       />
       ) : (
         <CustomButton
          title="Add to Cart"
          bgColor='#F97B22'
          color='#FFF'
          padding={8}
          onPress={() => addItemToCart(item)}
         />
       )}
        </Pressable>
        </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  text: {
    width: 150, 
    marginTop: 10
  }
})

export default ProductItem