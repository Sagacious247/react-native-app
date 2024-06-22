import { View, Text, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART } from '../redux/features/cart/cartSlice';

const CartScreen = () => {
  const navigation = useNavigation()
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()

  const total = cart.map((item) => item.price * item.quantity)
  .reduce((curr, prev) => curr + prev, 0)
  console.log("total", total)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#01204E",
      },
      headerLeft: () => (
        <MaterialIcons
         onPress={() => navigation.replace('Main')}
         name="keyboard-double-arrow-left" 
         size={24} 
         color="white" 
         />
      )
    });
  }, []);

  const increaseQuantity = (item) => {
    dispatch(INCREASE_QUANTITY(item))
  }

  const decreaseQuantity = (item) => {
    dispatch(DECREASE_QUANTITY(item))
  }

  const deleteItem = (item) => {
    dispatch(REMOVE_FROM_CART(item))
  }
  return (
    <ScrollView>
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '400'}}>Subtotal : </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>${total}</Text>
      </View>

      <Text style={{marginHorizontal: 10}}>EMI details Available</Text>

      {cart.length === 0 ? (
        <Pressable 
        disabled={true}
         style={{
          backgroundColor: "#D0D0D0", 
         padding: 10, 
         borderRadius: 5, 
         alignItems: "center", 
         justifyContent: "center",
         marginHorizontal: 10,
         marginTop: 10
         }}>
        <Text>No item in your Cart</Text>
      </Pressable>
      ) : (
      <TouchableOpacity 
        onPress={() => navigation.navigate("Confirm")}
         style={{
          backgroundColor: "#F97B22", 
         padding: 10, 
         borderRadius: 5, 
         alignItems: "center", 
         justifyContent: "center",
         marginHorizontal: 10,
         marginTop: 10
         }}>
        <Text style={{color: "white"}}>Proceed to Buy {cart.length} items</Text>
      </TouchableOpacity>
      )}

      

<Text style={{height: 1, borderWidth: 1, borderColor: "#D0D0D0", marginTop: 15}}/>

<View style={{marginHorizontal: 10}}>
  {cart?.map((item, index) => (
    <View key={index}
     style={{
      marginVertical: 10, 
      borderBottomColor: "#F0F0F0", 
      backgroundColor: "white",
      borderWidth: 2,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0
    }}
    >
    <Pressable
     style={{
      marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between"
     }}
    >
      <View>
        <Image style={{width: 140, height: 140, resizeMode: "contain"}} source={{uri: item?.image}}/>
      </View>

      <View>
        <Text numberOfLines={3} style={{width: 150, marginTop: 10}}>{item?.title}</Text>
        <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 6}}>{item?.price}</Text>
        <Image
         style={{width: 30, height: 30, resizeMode: "contain"}}
         source={{
          uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png"
         }}
        />
        <Text style={{color: "green"}}>In Stock</Text>
        <Text style={{fontWeight: "500", marginTop: 6}}>{item?.rating?.rate}</Text>
      </View>
    </Pressable>

    <Pressable 
    style={{
      marginTop: 15, 
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 10
      }}>
      <View 
      style={{
        flexDirection: "row", 
        alignItems: "center", 
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 7
        }}>
          {item?.quantity > 1 ? (
            <Pressable
            onPress={() => decreaseQuantity(item)}
            style={{
              backgroundColor: "#DADADA", 
              padding: 7, 
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6
          }}
            >
              <Entypo name="minus" size={24} color="red" />
            </Pressable>
          ) : (
        <Pressable 
        onPress={() => deleteItem(item)}
        style={{
          backgroundColor: "#DADADA", 
          padding: 7, 
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6
      }}>
        <AntDesign name="delete" size={24} color="red" />
        </Pressable>
          )}

        <Pressable style={{
          backgroundColor: "white", 
          paddingHorizontal: 18, 
          paddingVertical: 6
          }}>
          <Text>{item?.quantity}</Text>
        </Pressable>

        <Pressable 
        onPress={() => increaseQuantity(item)}
        style={{
          backgroundColor: "#DADADA", 
          padding: 7, 
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6
      }}>
          <Entypo name="plus" size={24} color="green" />
        </Pressable>
      </View>

      <Pressable 
      onPress={() => deleteItem(item)}
      style={{
         backgroundColor: "red",
         paddingHorizontal: 8,
         paddingVertical: 10,
         borderRadius: 5,
         borderColor: "#C0C0C0",
         borderWidth: 0.6
      }}>
        <Text style={{color: "white"}}>Delete</Text>
      </Pressable>
    </Pressable>

    <Pressable 
      style={{
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10,
        marginBottom: 15
      }}
        >
      <Pressable 
      style={{
        backgroundColor: "white",
         paddingHorizontal: 8,
         paddingVertical: 10,
         borderRadius: 5,
         borderColor: "#C0C0C0",
         borderWidth: 0.6
      }}>
        <Text>Save for Later</Text>
      </Pressable>
      <Pressable
      style={{
        backgroundColor: "white",
         paddingHorizontal: 8,
         paddingVertical: 10,
         borderRadius: 5,
         borderColor: "#C0C0C0",
         borderWidth: 0.6
      }}
      >
        <Text>More Items</Text>
      </Pressable>
    </Pressable>
    </View>
  ))}
</View>
    </ScrollView>
  )
}

export default CartScreen