import { View, Text, ImageBackground, SafeAreaView, StyleSheet, Platform, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, MaterialIcons, Ionicons,} from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useLayoutEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../redux/features/cart/cartSlice';

const ProductDetailScreen = () => {
    const route = useRoute()
    const [addedToCart, setAddedToCart] = useState(false)
    const {width} = Dimensions.get("window")
    const height = (width * 100) / 100
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const addItemToCart = (item) => {
      setAddedToCart(true)
      dispatch(ADD_TO_CART(item))
      setTimeout(() => {
         setAddedToCart(false)
      }, 2000)
    }
  
    const cart = useSelector((state) => state.cart.cart)

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
              <Ionicons name="notifications-outline" size={24} color="white" />
    
              <AntDesign name="search1" size={24} color="white" />
            </View>
          ),
        });
      }, []);

  return (
    <SafeAreaView style={styles.conatiner}>
     <ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         {route.params.carouselImages.map((item, index) => (
            <ImageBackground
            style={{height, width, marginTop: 25, resizeMode: 'contain'}}
            source={{uri:item}} key={index}>
                <View style={{
                padding: 20, 
              flexDirection: "row", 
              alignItems: "center", 
              justifyContent: "space-between"
              }}>
                  <View 
                  style={{
                    width: 40, 
                    height: 40,
                    justifyContent: "center", 
                    alignItems: "center",
                     backgroundColor: "#C60C30",
                     borderRadius: 20,
                     flexDirection: "row"
                     }}>
                    <Text style={{color: "white", textAlign: "center", fontWeight: "600"}}>20% off</Text>
                  </View>

                <View
                 style={{
                  width: 40, 
                    height: 40,
                    justifyContent: "center", 
                    alignItems: "center",
                     backgroundColor: "#E0E0E0",
                     borderRadius: 20,
                     flexDirection: "row"
                 }}
                >
                <MaterialCommunityIcons 
                name="share-variant" 
                size={24} 
                color="black" 
                />
                </View>
                </View>

                <View
                 style={{
                  width: 40, 
                    height: 40,
                    justifyContent: "center", 
                    alignItems: "center",
                     backgroundColor: "#E0E0E0",
                     borderRadius: 20,
                     flexDirection: "row",
                     marginTop: "auto",
                     marginLeft: 20,
                     marginBottom: 20
                 }}
                >
                <AntDesign name="hearto" size={24} color="black" />
                </View>
            </ImageBackground>
         ))}
        </ScrollView>

        <View style={{padding: 10}}>
          <Text style={{fontSize: 15, fontWeight: "500"}}>{route?.params?.title}</Text>
          <Text style={{
            backgroundColor: "#00CED1", 
            width: 50, 
            borderRadius: 5, 
            padding: 2,
            fontSize: 12,
            fontWeight: "600",
            marginTop: 6
          }}>
              {`$${route?.params?.price}`}
              </Text>

        </View>
               <Text style={{height: 1, borderWidth: 1, borderColor: "#D0D0D0"}}/>

               <View 
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10
              }}>
                <Text>Color: </Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>{route?.params?.color}</Text>
              </View>

              <View 
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10
              }}>
                <Text>Size: </Text>
                <Text 
                style={{
                  fontSize: 15, 
                  fontWeight: "bold"
                  }}>{route?.params?.size}</Text>
              </View>

              <Text style={{height: 1, borderWidth: 1, borderColor: "#D0D0D0"}}/>
            
              <View style={{padding: 10}}>
               <Text style={{fontSize: 15, fontWeight: "bold", marginVertical: 5}}>{`Total: $${route?.params?.price}`}</Text>
               <Text style={{color: "#00CED1"}}>FREE Delivery Tomorrow By 3:PM. Order within 10hrs 30 mins.</Text>

              <View style={{
                flexDirection: "row", 
                marginVertical: 5,
                alignItems: "center",
                gap: 5}}>
              <FontAwesome6 name="location-dot" size={24} color="black" />

              <Text style={{fontSize: 15, fontWeight: "500"}}>Deliver To Sagacious Abuja Nigeria</Text>
              </View>
              </View>

              <Text style={{marginHorizontal: 10, color: "green", fontWeight: "500"}}>In Stock</Text>

              <View style={{marginHorizontal: 10, }}>
              {addedToCart ? (
                  <CustomButton
                  title="Added to Cart"
                  bgColor='#00CED1'
                  color="white"
                  padding={8}
                  borderRadius={20}
                  onPress={() => addItemToCart(route?.params?.item)}
                  />
                  
                ) : (
                 <CustomButton
                 title="Add to Cart"
                 bgColor='#FFBF78'
                 color="white"
                 padding={8}
                 borderRadius={20}
                 onPress={() => addItemToCart(route?.params?.item)}
                 />
                )}

                <CustomButton
                title="Buy Now"
                bgColor='#F97B22'
                color="white"
                padding={8}
                borderRadius={20}
                />
              </View>
         </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#FFF',
        flex: 1
    }
})
export default ProductDetailScreen