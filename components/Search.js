import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import React from 'react'
import CustomInput from './CustomInput';

const Search = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.search}>
      <CustomInput
      icon="search"
      placeholder="Search e-Shop items"
      />
      </View>
      <Feather style={{marginLeft: 10}} name="mic" size={22} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
        // backgroundColor: "#00CED1",
        backgroundColor: "#01204E",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
      },
      search: {
        flexDirection: 'row',
        // marginVertical: 10,
        gap: 10,
        alignItems: 'center',
        width: '100%',
        flex: 1
    }
})
export default Search