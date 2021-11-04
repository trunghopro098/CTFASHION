import React, {useEffect} from 'react';
import {Text,View,} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import * as FetchAPI from './util/fetchApi'
import TabNavigation from './screens/NavigatorBottom/tabNavigation';
import HomeScreen from './screens/NavigatorBottom/homeScreen';
import FavoriteScreen from './screens/NavigatorBottom/favoriteScreen';
import CartScreen from './screens/NavigatorBottom/cartScreen';
import GiftScreen from './screens/NavigatorBottom/giftScreen';
import ProfileScreen from './screens/NavigatorBottom/profileScreen';

const Tab = createStackNavigator();

const App = ()=>{
  const quanityCart = useSelector(state=>state.productReducer.quanityCart)
  useEffect(()=>{
    getFullProduct();
  },[])
  const getFullProduct = async()=>{
    const res = await FetchAPI.getAPI("/product/getFullProduct");
    // console.log(res);
  }

  return(
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown:false}}
        >
            <Tab.Screen name="home" component={TabNavigation}/>
            <Tab.Screen name="favorite" component={FavoriteScreen}/>
            <Tab.Screen name="cart" component={CartScreen}/>
            <Tab.Screen name="gift" component={GiftScreen}/>
            <Tab.Screen name="grofile" component={ProfileScreen}/>

        </Tab.Navigator>
         {/* <TabNavigation/> */}
      </NavigationContainer>


  )

}

export default App;
