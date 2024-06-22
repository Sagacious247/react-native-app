import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Image,
  Pressable, 
} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Search from '../components/Search'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import ProductItem from './ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { UserType } from '../userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Carousel from '../components/Carousel';
import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];

  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];

  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const [products, setProducts] = useState([])
  const navigation = useNavigation()
  const [open, setOpen] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [category, setCategory] = useState("jewelery")
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ])

  console.log("selectedAddress", selectedAddress)

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: "GET",
        // url: 'http://localhost:3000/api/v1/products',
        url: 'https://fakestoreapi.com/products'
      })
      // const data = response.data;
      setProducts(response.data)
    } catch (error) {
      console.log(error.response.message)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false)
  })
  
  const cart = useSelector((state) => state.cart.cart)
  const {id, setId} = useContext(UserType)

  useEffect(() => {
    if(id) {
      fetchLocation()
    }
  }, [id, modalVisible])

  const fetchLocation = async () => {
    const response = await axios({
      method: 'GET',
      url: `http://192.168.43.127:3000/api/v1/users/addresses/${id}`
    })
    const {addresses} = response.data
    setAddresses(addresses)
}

  useEffect(() => {
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem('authToken')
      const decoded = jwtDecode(token)
      const id = decoded.id
      setId(id)
    }
    fetchUser()
  }, [])

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Search/>

        <Pressable 
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.location}
        >
        <Ionicons name="location-outline" size={24} color="black" />
        <TouchableOpacity>
         {selectedAddress ? (
          <Text>
            Deliver to {selectedAddress?.name} - {selectedAddress?.street}
          </Text>
         ) : (
          <Text style={styles.locationText}>Add a Location</Text>
         )}
        </TouchableOpacity>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>

        <View>
         <FlatList
         horizontal
         showsHorizontalScrollIndicator={false}
          data={list}
          renderItem={({item}) => {
            return (
              <View 
              style={{
                flexDirection: 'column',
                margin: 10, 
                justifyContent: 'center',
                alignItems: 'center'
                }}
                >
              <Image 
              style={styles.imageList} 
                source={{uri: item.image}}/>
                <Text style={styles.imageListText}>{item.name}</Text>
             </View>
            )
          }}
          keyExtractor={item => item.id}
         />
        </View>

        {/* Slider Box */}
        {/* <SliderBox/> */}

        <Text style={styles.dealHeader}>Trending Deals of the week</Text>

        <View>
         <FlatList
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          data={deals}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
               onPress={() => navigation.replace("Detail", {
                id: item.id,
                title: item.title,
                price: item.price,
                carouselImages: item.carouselImages,
                color: item.color,
                size: item.size,
                oldPrice: item.oldPrice,
                item: item
               })}
              >
                <Image 
                style={{
                  height: 200, 
                  width: 200, 
                  resizeMode: 'contain'
                  }} 
                  source={{uri: item?.image}}
                />
              </TouchableOpacity>
            )
          }}
         />
        </View>

        <Text style={{
        height: 1, 
        borderColor: "#D0D0D0", 
        borderWidth: 2,
        marginTop: 15
        }}/>

    <Text style={{padding: 10, fontSize: 18, fontWeight: "bold"}}>Today's Deals</Text>
     <View>
      <FlatList
        horizontal 
        showsHorizontalScrollIndicator={false}
        data={offers}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          flexDirection: 'row'
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            onPress={() => navigation.replace("Detail", {
              id: item.id,
              title: item.title,
              price: item.price,
              carouselImages: item.carouselImages,
              color: item.color,
              size: item.size,
              oldPrice: item.oldPrice,
              item: item
            })}
            style={{
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Image
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain'
              }}
              source={{uri: item.image}}
              />
              <View 
              style={{
                backgroundColor: '#E31E37', 
                paddingVertical: 7, 
                width: 130, 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: 10, 
                borderRadius: 4
              }}
              >
                <Text 
                style={{
                  color: '#FFF', 
                  textAlign: 'center', 
                  fontSize: 13, 
                  fontWeight: 'bold'
                  }}>
                    Upto{item.offer}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
        </View>

     <Text style={{
        height: 1, 
        borderColor: "#D0D0D0", 
        borderWidth: 2,
        marginTop: 15
        }}/>

    <View
     style={{
      position: 'relative',
    }}
     >

       <View 
       style={{
        marginHorizontal: 10,
        width: "45%",
        marginBottom: open ? 50 : 15,
        marginTop: 10,
        position: 'absolute',
        // top: 0
       }}
       >
        <DropDownPicker
         style={{
          backgroundColor: '#B7B7B7',
          height: 30,
          marginBottom: open ? 120 : 15,
        }}
        
        open={open}
        value={category} //genderValue
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        placeholder="choose category"
        placeholderStyle={styles.placeholderStyles}
        onOpen={onGenderOpen}
        // onChangeValue={onChange}
        zIndex={3000}
        zIndexInverse={1000}
        />
       </View>
       <View style={{
        marginHorizontal: 10,
        width: "45%",
        marginBottom: 15,
        marginTop: 10,
        position: 'absolute',
        right: 5
       }}>
       <Search/>
       </View>

      </View>

        <View style={{marginTop: 60}}>
           <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
           }}>
            {products?.filter((item) => item.category === category)
            .map((item, index) => (
              <ProductItem item={item} key={index}/>
            ))}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>

   <BottomModal 
   onBackdropPress={() => setModalVisible(!modalVisible)}
   swipeDirection={["up", "down"]}
   swipeThreshold={200}
   modalAnimation={
    new SlideAnimation({
      slideFrom: "bottom"
    })
   }
   onHardwareBackPress={() => setModalVisible(!modalVisible)}
   visible={modalVisible}
   onTouchOutside={() => setModalVisible(!modalVisible)}
   >
    <ModalContent style={{width: '100', height: 400}}>
      <View style={{marginBottom: 8}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Choose your Location</Text>
        <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>Select a delivery location to see product delivery option</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Aready added location */}
        {addresses.map((item, index) => (
          <Pressable 
          onPress={() => setSelectedAddress(item)}
           style={{
            width: 140,
            height: 140,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
            gap: 3,
            marginTop: 10,
            backgroundColor: selectedAddress === item ? "#F0CC81" : "white"
           }}
          >
             <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            padding: 8
          }}>
            <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: 'bold'}}>{item?.name}</Text>
            <Entypo name="location-pin" size={24} color="red" />
          </View>

          <Text numberOfLines={1} 
          style={{
             width: 130,
             fontSize: 13,
             textAlign: 'center'
          }}>
            {item?.houseNo}, {item?.landMark}
          </Text>

          <Text numberOfLines={1} 
          style={{
             width: 130,
             fontSize: 13,
             textAlign: 'center'
          }}>{item?.street}</Text>

          <Text numberOfLines={1} 
          style={{
             width: 130,
             fontSize: 13,
             textAlign: 'center'
          }}>Abuja, Nigeria</Text>
          </Pressable>
        ) 
        )}

        <Pressable 
        onPress={() => {
          setModalVisible(false)
          navigation.navigate("Locations")
        }}
        style={{
          width: 140, 
          height: 140, 
          borderColor: '#D0D0D0', 
          borderWidth: 1, 
          marginTop: 10, 
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <Text 
          style={{
            textAlign: 'center', 
            color: '#0066B2', 
            fontWeight: '500'
            }}
            >
              Add an Address or pick-up point
          </Text>
        </Pressable>
      </ScrollView>

      <View style={{flexDirection: 'column', gap: 7, marginBottom: 20, marginTop: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Entypo name="location-pin" size={22} color="#0066B2" />
        <Text style={{color: '#0066B2', fontWeight: '400'}}>
          Enter a Nigeria Postal Code
        </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Ionicons name="locate-sharp" size={22} color="#0066B2" />
        <Text style={{color: '#0066B2', fontWeight: '400'}}>
          Use My Current Location
        </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <AntDesign name="earth" size={22} color="#0066B2" />
        <Text style={{color: '#0066B2', fontWeight: '400'}}>
          Deliver Outside Nigeria
        </Text>
        </View>
      </View>
    </ModalContent>
   </BottomModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  location: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 5, 
     padding: 10, 
     backgroundColor: '#AFEEEE'
   },
   locationText: {
      fontWeight: '500',
      fontSize: 12
    },
    imageList: {
      width: 50, 
       height: 50, 
       resizeMode: 'contain'
    },
    imageListText: {
      fontSize: 12, 
      fontWeight: '500', 
      textAlign: 'center', 
      marginTop: 5
    },
    dealHeader: {
      padding: 10, 
      fontSize: 18, 
      fontWeight: "bold"
    }
})

export default HomeScreen