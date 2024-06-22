import { View, Text, Button, Alert, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { UserType } from '../userContext';

const CheckoutScreen = () => {
  const {id, setId} = useContext(UserType)
    const cart = useSelector((state) => state.cart.cart)

    const total = cart?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0)

    // const [email, setEmail] = useState()
    const [cardDetails, setCardDetails] = useState()
    const {confirmPayment, loading} = useConfirmPayment()

    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(
        `http://192.168.43.127:3000/api/v1/payments/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log("data:", response)
        const { clientSecret, error } = await response.json()
        return {clientSecret, error}
    }

    const handlePayPress = async () => {
      if(!cardDetails) {
        return Alert.alert("Please enter complete card details")
      }

      const billingDetails = {
        id: id,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption
      }
       console.log("billing:", billingDetails)
      const response = await axios.post(
        `http://192.168.43.127:3000/api/v1/orders`,
        billingDetails
       )
        if(response.status === 201) {
            navigation.navigate("Order")
            dispatch(CLEAR_CART())
            console.log("order created successfully", response.data);
        }

      try {
        const {clientSecret, error} = await 
        fetchPaymentIntentClientSecret()
        if(error) {
          console.log("Unable to process payment")
        } else {
          const { paymentIntent, error } = await confirmPayment
          (clientSecret, {
            type: "Card",
            billingDetails: billingDetails
          })
          if(error) {
           Alert.alert(`Payment Confirmation Error ${error.message}`)
          } else if (paymentIntent) {
           Alert.alert("Payment Successful")
           console.log("Payment uccessful", paymentIntent)
          }
        }
      } catch (error) {
        console.log(error)
      }
      
    }
  return (
    <View style={{flex: 1, margin: 20}}>
      {/* Card Payment Method */}

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

     
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 20,
          }}
          onCardChange={cardDetails => {
            // setCardDetails(cardDetails)
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
   </View>
  )
}

export default CheckoutScreen