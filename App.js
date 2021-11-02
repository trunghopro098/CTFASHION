import React from 'react';
import {Text,View,} from 'react-native';
import { useSelector } from 'react-redux';
const App = ()=>{
  const quanityCart = useSelector(state=>state.productReducer.quanityCart)

  return(
    <View>
      <Text>hello world {quanityCart}</Text>
    </View>
  )

}

export default App;
