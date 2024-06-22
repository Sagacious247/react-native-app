import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UserType } from '../userContext';
import { CLEAR_CART } from '../redux/features/cart/cartSlice';
import { CardField } from '@stripe/stripe-react-native';

const ConfirmationScreen = () => {
  const steps = [
    {title: "Address", content: "Address Form"},
    {title: "Delivery", content: "Delivery Options"},
    {title: "Payment", content: "Payment Details"},
    {title: "Place Order", content: "Order Summary"}
]
    const [currentStep, setCurrentStep] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState("")
    const [option, setOption] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const cart = useSelector((state) => state.cart.cart)
    const {id, setId} = useContext(UserType)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const total = cart?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0)

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

  useEffect(() => {
    fetchLocation()
 }, [])

 const fetchLocation = async () => {
     const response = await axios({
       method: 'GET',
       url: `http://192.168.43.127:3000/api/v1/users/addresses/${id}`
     })
     const {addresses} = response.data
     setAddresses(addresses)
    }

    const handlePlaceOrder = async () => {
           const orderData = {
               id: id,
               cartItems: cart,
               totalPrice: total,
               shippingAddress: selectedAddress,
               paymentMethod: selectedOption
           }
  
        try {
           const response = await axios.post(
            `http://192.168.43.127:3000/api/v1/orders`,
            orderData
           )
            if(response.status === 201) {
                navigation.navigate("Order")
                dispatch(CLEAR_CART())
                console.log("order created successfully", response.data);
            }
        } catch (error) {
          console.log("errror", error.response.data);
        }
        }

        const Pay = async() => {
            navigation.navigate("Checkout")
        }

  return (
    <ScrollView>
        <View 
        style={{
          flex: 1, 
          paddingHorizontal: 20, 
          paddingTop: 40
        }}>
         <View 
         style={{
            flexDirection: "row", 
            alignItems: "center", 
            marginBottom: 20, 
            justifyContent: "space-between"
            }}>
            {steps?.map((step, index) => (
                <View 
                key={index}
                style={{
                    justifyContent: "center", 
                    alignItems: "center"
                    }}>
                    {index > 0 && (
                        <View 
                        style={[
                            {flex: 1, height: 2, backgroundColor: "green"}, 
                            index <= currentStep && {backgroundColor: "green"}
                        ]}
                        >
                        </View>
                    )}
                    <View 
                    style={[
                        {
                            width: 30, 
                            height: 30, 
                            borderRadius: 15, 
                            backgroundColor: "#CCC",
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        index < currentStep && {backgroundColor: "green"}
                    ]}>
                        {index < currentStep ? (
                          <Text style={{
                            fontSize: 15, fontWeight: "bold", color: "white"
                          }}>
                            &#10003;
                          </Text>
                        ) : (
                          <Text style={{
                            fontSize: 15, fontWeight: "bold", color: "white"
                          }}>{index + 1}</Text>
                        )}
                    </View>
                    <Text style={{textAlign: "center", marginTop: 8}}>{step.title}</Text>
                </View>
            ))}
         </View>
        </View>

        {currentStep === 0 && (
            <View style={{marginHorizontal: 20}}>
               <Text style={{fontSize: 16, fontWeight: "bold"}}>
                Select Delivery Address
               </Text>

        <Pressable>
        {addresses?.map((item, index) => (
            <Pressable key={index} style={{
                borderWidth: 1, 
                borderColor: "#C0C0C0", 
                padding: 10, 
                flexDirection: "row",
                alignItems: "center",
                gap:5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6
                }}>

        {selectedAddress && selectedAddress._id === item?._id ? (
        <FontAwesome5 name="dot-circle" size={20} color="#008397" />
        ) : (

        <Entypo 
        onPress={() => setSelectedAddress(item)} 
        name="circle" 
        size={20} 
        color="gray" 
        />
        )}
                
        <View style={{marginLeft: 6}}>
        <View 
        style={{
            flexDirection: "row", 
            alignItems: "center", 
            gap: 3
            }}
         >
            <Text style={{fontSize: 15, fontWeight: "bold"}}>
                {item?.name}
            </Text>
            <Entypo name="location-pin" size={24} color="red" />
        </View>

        <Text style={{fontSize: 15, color: "#181818"}}>{item?.houseNo}, {item?.landMark}</Text>

        <Text style={{fontSize: 15, color: "#181818"}}>{item?.street}</Text>

        <Text style={{fontSize: 15, color: "#181818"}}>Abuja, Nigeria</Text>

        <Text style={{fontSize: 15, color: "#181818"}}>{item?.mobileNo}</Text>

        <Text style={{fontSize: 15, color: "#181818"}}>{item?.postalCode}</Text>

        <View style={{
                flexDirection:"row", 
                gap: 10,
                alignItems: "center",
                marginTop: 10
                }}
            >
            <Pressable style={{
            backgroundColor: "#F5F5F5", 
            paddingVertical: 10, 
            paddingHorizontal: 6,
            borderRadius: 5,
            borderWidth: 0.9,
            borderColor: "#D0D0D0"
            }}>
                <Text>Edit</Text>
            </Pressable>

            <Pressable style={{
            backgroundColor: "#F5F5F5", 
            paddingVertical: 10, 
            paddingHorizontal: 6,
            borderRadius: 5,
            borderWidth: 0.9,
            borderColor: "#D0D0D0"
            }}>
                <Text>Remove</Text>
            </Pressable>

            <Pressable style={{
            backgroundColor: "#F5F5F5", 
            paddingVertical: 10, 
            paddingHorizontal: 6,
            borderRadius: 5,
            borderWidth: 0.9,
            borderColor: "#D0D0D0"
            }}>
                <Text>Set as Default</Text>
            </Pressable>
        </View>

        <View>
            {selectedAddress && selectedAddress._id === item?._id && (
              <Pressable 
              onPress={() => setCurrentStep(1)}
              style={{
                backgroundColor: "#008397", 
                padding: 10, 
                borderRadius: 20, 
                justifyContent: "center", 
                alignItems: "center",
                marginTop: 10
                }}>
                <Text style={{textAlign: "center", color: "white"}}>
                    Delivered to this Address
                </Text>
              </Pressable>
            )}

        </View>
        </View>
          </Pressable>
                ))}
         </Pressable>
            </View>
        )}

        {currentStep === 1 && (
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Choose your delivery options</Text>

                <View 
                style={{
                    backgroundColor: "white", 
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8,
                    gap: 7,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10
                }}>
                    {option ? (
                         <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                    ) : (
                        <Entypo 
                            onPress={() => setOption(!option)} 
                            name="circle" 
                            size={20} 
                            color="gray" 
                            />
                    )}
                    <Text style={{flex: 1}}>
                      <Text style={{color: "green", fontWeight: "500"}}>
                        Tomorrow by 10pm
                      </Text>
                    - FREE delivery with your Prime membership
                    </Text>
                </View>

                <Pressable 
                onPress={() => setCurrentStep(2)}
                style={{
                    backgroundColor: "#FFC72C", 
                    padding: 10, 
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15
                    }}>
                    <Text>Proceed To Payment</Text>
                </Pressable>
            </View>
        )}

        {currentStep === 2 && (
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Select your payment method</Text>

                <View 
                style={{
                    backgroundColor: "white", 
                    padding: 8, 
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    flexDirection: "row",
                    gap: 7,
                    alignItems: "center",
                    marginTop: 12
                    }}>
                        {selectedOption === "cash" ? (
                            <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                        ) : (
                            <Entypo 
                                onPress={() => setSelectedOption("cash")} 
                                name="circle" 
                                size={20} 
                                color="gray" 
                                />
                        )}

                    <Text>Cash on Delivery</Text>
                </View>

                    {/* Crypto currency payment method */}
                <View 
                style={{
                    backgroundColor: "white", 
                    padding: 8, 
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    flexDirection: "row",
                    gap: 7,
                    alignItems: "center",
                    marginTop: 12
                    }}>
                {selectedOption === "cryptoCurrency" ? (
                            <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                        ) : (
                            <Entypo 
                                onPress={() => setSelectedOption("cryptoCurrency")} 
                                name="circle" 
                                size={20} 
                                color="gray" 
                                />
                        )}

                    <Text>Pay with cryptoCurrency</Text>
                </View>

                {/* Card Payment Method */}
                <View 
                style={{
                    backgroundColor: "white", 
                    padding: 8, 
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    flexDirection: "row",
                    gap: 7,
                    alignItems: "center",
                    marginTop: 12
                    }}>
                 {selectedOption === "card" ? (
                    <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                 ) : (
                     <Entypo 
                         onPress={() =>  {
                            setSelectedOption("card")
                            Alert.alert("Debit card", "Pay Online", [
                               { 
                                text: "Cancel",
                                onPress: () => console.log("Cancel operation")
                              },
                              {
                                text: "Proceed",
                                onPress: () => Pay(),
                                
                              }
                            ])
                         }} 
                         name="circle" 
                         size={20} 
                         color="gray" 
                         />
                 )}       

                    <Text>Credit or Debit Card</Text>
                </View>

                <TouchableOpacity 
                onPress={() => setCurrentStep(3)}
                style={{
                    backgroundColor: "#FFC72C", 
                    padding: 10, 
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15
                    }}>
                    <Text>Place Order</Text>
                </TouchableOpacity>
            </View>
        )}

         {/* Cash Payment Method */} 
        {currentStep === 3 && selectedOption === "cash" &&  (
            <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Now</Text>

            <View 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10
            }}>
            <View>
                <Text style={{fontSize: 17, fontWeight: "bold"}}>
                    Save 5% and Never run out
                </Text>
                < Text style={{color: "gray", fontSize: 15, marginTop: 5}}>
                   Turn on mute deliveries
                </Text>
            </View>

            <MaterialIcons 
            name="keyboard-arrow-right" 
            size={24} 
            color="black" 
            />
            </View>

            <View 
            style={{
                backgroundColor: "white", 
                padding: 8, 
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10
                }}>
                <Text>Shipping to {selectedAddress?.name}</Text>

                <View 
                style={{
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                    }}>
                    <Text style={{fontSize: 16, fontWeight: "500", color: "gray"}}>Items</Text>

                    <Text style={{color: "gray", fontSize: 16}}>{cart.length}</Text>
                </View>

                <View 
                style={{
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                    }}>
                    <Text style={{fontSize: 16, fontWeight: "500", color: "gray"}}>Delivery</Text>

                    <Text style={{color: "gray", fontSize: 16}}>$0</Text>
                </View>

                <View 
                style={{
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                    }}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Total Order</Text>

                    <Text style={{color: "#C60C30", fontSize: 17, fontWeight: "bold"}}>${total}</Text>
                </View>
            </View>

            <View 
            style={{
                backgroundColor: "white", 
                padding: 8, 
                borderColor: "#D0D0D0",
                borderColor: 1,
                marginTop: 10
                }}>
                <Text style={{fontSize: 15, color: "gray"}}>Pay with</Text>

                <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>Pay on delivery (Cash)</Text>
            </View>

            <TouchableOpacity 
            onPress={handlePlaceOrder}
            style={{
                backgroundColor: "#FFC72C", 
                padding: 10, 
                borderRadius: 20, 
                justifyContent: "center", 
                alignItems: "center",
                marginTop: 20
                }}>
                <Text>Place your order</Text>
            </TouchableOpacity>
        </View>
             

        )}

          {/* cryptoCurrency */}
          {currentStep === 3 && selectedOption === "cryptoCurrency" && (
            <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Now</Text>

            <View 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10
            }}>
            <View>
                <Text style={{fontSize: 17, fontWeight: "bold"}}>
                    Save 5% and Never run out
                </Text>
                < Text style={{color: "gray", fontSize: 15, marginTop: 5}}>
                Turn on mute deliveries
                </Text>
            </View>

            <MaterialIcons 
            name="keyboard-arrow-right" 
            size={24} 
            color="black" 
            />
            </View>

            <View 
        style={{
            backgroundColor: "white", 
            padding: 8, 
            borderColor: "#D0D0D0",
            borderColor: 1,
            marginTop: 10
            }}>
            <Text style={{fontSize: 15, color: "gray"}}>Pay with(crypto)</Text>

            <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>Pay with cryptoCurrency</Text>
        </View>

        <View 
        style={{
            backgroundColor: "white", 
            padding: 8, 
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10
            }}>
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center"
                }}>
                <Text style={{fontSize: 16, fontWeight: "500", color: "gray"}}>Items</Text>

                <Text style={{color: "gray", fontSize: 16}}>{cart.length}</Text>
            </View>

            <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center"
                }}>
                <Text style={{fontSize: 16, fontWeight: "500", color: "gray"}}>Delivery</Text>

                <Text style={{color: "gray", fontSize: 16}}>$0</Text>
            </View>

            <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center"
                }}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Total Order</Text>

                <Text style={{color: "#C60C30", fontSize: 17, fontWeight: "bold"}}>${total}</Text>
            </View>
        </View>

        <View 
        style={{
            backgroundColor: "white", 
            padding: 8, 
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10
            }}>
             <View 
            style={{
                flexDirection: "row", 
                }}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Bitcoin:</Text>
            </View>
             <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-around", 
                alignItems: "center"
                }}>
             <Text style={{color: "gray", fontSize: 16}}>0x6A370C2817aD602060D6c76aa58EeBe92FD01120</Text>

            </View>

            <View 
            style={{
                flexDirection: "row", 
                }}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>USDT($):</Text>
            </View>
             <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-around", 
                alignItems: "center"
                }}>
             <Text style={{color: "gray", fontSize: 16}}>0x6A370C2817aD602060D6c76aa58EeBe92FD01120</Text>
            </View>

            <View 
            style={{
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center"
                }}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Phone No.</Text>

                <Text style={{color: "gray", fontSize: 17, fontWeight: "bold"}}>+234-706-700-5759</Text>
            </View>
        </View>

        <Pressable 
        onPress={handlePlaceOrder}
        style={{
            backgroundColor: "#FFC72C", 
            padding: 10, 
            borderRadius: 20, 
            justifyContent: "center", 
            alignItems: "center",
            marginTop: 20
            }}>
            <Text>Place your order</Text>
        </Pressable>
         </View>
        )}

        {/* Card Payment Method
        {currentStep === 3 && selectedOption === "card" && (
            <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Now</Text>

            <View 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10
            }}>
            <View>
                <Text style={{fontSize: 17, fontWeight: "bold"}}>
                    Save 5% and Never run out
                </Text>
                < Text style={{color: "gray", fontSize: 15, marginTop: 5}}>
                Turn on mute deliveries
                </Text>
            </View>

            <MaterialIcons 
            name="keyboard-arrow-right" 
            size={24} 
            color="black" 
            />
            </View>

            <View 
        style={{
            backgroundColor: "white", 
            padding: 8, 
            borderColor: "#D0D0D0",
            borderColor: 1,
            marginTop: 10
            }}>
            <Text style={{fontSize: 15, color: "gray"}}>Pay with(Card)</Text>

            <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>Pay with card</Text>
        </View>


        <View 
        style={{
            backgroundColor: "white", 
            padding: 8, 
            borderColor: "#D0D0D0",
            borderColor: 1,
            marginTop: 10
            }}>
           <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
           <Text style={{fontSize: 15, color: "gray"}}>Subtotal: </Text>

            <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>${total}</Text>
           </View>
           <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
           <Text style={{fontSize: 15, color: "gray"}}>items: </Text>

            <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>${cart.length}</Text>
           </View>
           <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
           <Text style={{fontSize: 15, fontWeight: 'bold'}}>Total: </Text>

            <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>${total}</Text>
           </View>
        </View>
        <Pressable 
        onPress={handlePlaceOrder}
        style={{
            backgroundColor: "#FFC72C", 
            padding: 10, 
            borderRadius: 20, 
            justifyContent: "center", 
            alignItems: "center",
            marginTop: 20
            }}>
            <Text>Place your order</Text>
        </Pressable>
            </View>
        )} */}
       
    </ScrollView>
  )
}

export default ConfirmationScreen