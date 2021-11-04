import  React, { Component} from 'react';
import {View, Text, Image, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './homeScreen';
import CartScreen from './cartScreen';
import FavoriteScreen from './favoriteScreen';
import GiftScreen from './giftScreen';
import ProfileScreen from './profileScreen';

const Stack = createBottomTabNavigator();
export default class TabNavigation extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{ flex:1 }}>
            <Stack.Navigator
          
            screenOptions={{
                    headerShown:false,
                    style:{
                        position : "absolute",
                        borderTopLeftRadius  :11, 
                        borderTopRightRadius : 11,
                        height : 60,
                        elevation : 0,
                        backgroundColor : '#ffffff',
                        ...styles.shadow,
                    },
                    
                        showLabel : false
                }}
>
        <Stack.Screen name="Home" component={HomeScreen}
                options={{
                tabBarIcon: ({focused})=>(
                    <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                    <Image
                    source={ require('../../assets/icons/home.png')}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height : 25,
                        tintColor : focused ? '#e32f45' : '#748c94'         
                        }}/>
                        <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>HOME</Text>
                    </View>
                )
            }}
        />
        <Stack.Screen name="Favorite" component={FavoriteScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                        <Image
                        source={ require('../../assets/icons/favourite.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height : 25,
                            tintColor : focused ? '#e32f45' : '#748c94'         
                            }}/>
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>FAVORITE</Text>
                        </View>
                    ),
                    tabBarBadge : 3
                }}        
        />
         <Stack.Screen name="Gift" component={GiftScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                        <Image
                        source={ require('../../assets/icons/gift.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height : 25,
                            tintColor : focused ? '#e32f45' : '#748c94'         
                            }}/>
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>GIFT</Text>
                        </View>
                    )
                }}       
        />       
        <Stack.Screen name="Cart" component={CartScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                        <Image
                        source={ require('../../assets/icons/cart.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height : 25,
                            tintColor : focused ? '#e32f45' : '#748c94'         
                            }}/>
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>CART</Text>
                        </View>
                    ),
                    tabBarBadge : 3
                }}    
        />

        <Stack.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                        <Image
                        source={ require('../../assets/icons/profile.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height : 25,
                            tintColor : focused ? '#e32f45' : '#748c94'         
                            }}/>
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>PROFILE</Text>
                        </View>
                    )
                }}     
        />
    </Stack.Navigator>

    </View> 
        )
    }
}

const styles = StyleSheet.create({
    shadow : {
        shadowColor :"#7F5DF0",
        shadowOffset :{
            width : 0,
            height : 10,

        },
        shadowOpacity  :0.25,
        shadowRadius : 3.5,
        elevation : 5
    }
})