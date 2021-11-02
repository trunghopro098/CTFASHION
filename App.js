import React,{useEffect} from 'react';
import {Text,View,} from 'react-native';
import { useSelector } from 'react-redux';
import * as FetchAPI from './util/fetchApi'

const App = ()=>{
  const quanityCart = useSelector(state=>state.productReducer.quanityCart)
  useEffect(()=>{
    getFullProduct();
  },[])
  const getFullProduct = async()=>{
    const res = await FetchAPI.getAPI("/product/getFullProduct");
    console.log(res);
  }
  return(
    <View>
      <Text>hello world {quanityCart}</Text>
    </View>
  )

}

export default App;
