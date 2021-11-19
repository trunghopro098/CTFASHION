import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import * as FetchAPI from './util/fetchApi'
import TabNavigation from './screens/NavigatorBottom/tabNavigation';
import SplashScreen from './screens/StartScreens/splash';
import CollapsibleHeader1 from './screens/products/test';
import SearchScreen from './screens/StartScreens/search';
import ProductDetail from './screens/products/productDetail';
import CartScreen from './screens/NavigatorBottom/cartScreen';
import Test2 from './screens/products/test2';
import ResultSearch from './screens/StartScreens/resultSearch';
const Tab = createStackNavigator();

const App = ()=>{

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
        initialRouteName="splash"
        screenOptions={{ headerShown:false}}
        >
          <Tab.Screen name="aa" component={Test2}/>
          <Tab.Screen name="cart" component={CartScreen}/>
          <Tab.Screen name="home" component={TabNavigation}/>
          <Tab.Screen name='splash' component={SplashScreen}/>
          <Tab.Screen name="test" component ={CollapsibleHeader1}/>
          <Tab.Screen name="search" component ={SearchScreen}/>
          <Tab.Screen name="productDetail" component ={ProductDetail}/>
          <Tab.Screen name="resultSearch" component ={ResultSearch}/>
        </Tab.Navigator>
      </NavigationContainer>

    
  )

}

export default App;
