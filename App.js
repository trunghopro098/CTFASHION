import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import { useSelector } from 'react-redux';
import * as FetchAPI from './util/fetchApi'
import TabNavigation from './screens/NavigatorBottom/tabNavigation';

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
        initialRouteName="home"
        screenOptions={{ headerShown:false}}
        >
          <Tab.Screen name="home" component={TabNavigation}/>
    
        </Tab.Navigator>
         {/* <TabNavigation/> */}
      </NavigationContainer>


  )

}

export default App;
