import  React  from 'react';
import {View, Text, Image, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './homeScreen';
import CartScreen from './cartScreen';
import FavoriteScreen from './favoriteScreen';
import GiftScreen from './giftScreen';
import ProfileScreen from './profileScreen';
import { useSelector } from 'react-redux';
const Stack = createBottomTabNavigator();
export default function TabNavigation(){
    const quanityCart = useSelector(state=>state.productReducer.quanityCart);
    const quantityFavorite = useSelector(state=>state.productReducer.quantityFavorite);
        return(
            <View style={{ flex:1 }}>
            <Stack.Navigator
          
            screenOptions={{
                    headerShown:false,
                    tabBarStyle:[{  
                        style:{
                            position : "absolute",
                            borderTopLeftRadius  :11, 
                            borderTopRightRadius : 11,
                            height : 60,
                            elevation : 0,
                            backgroundColor : '#ffffff',
                            ...styles.shadow,
                      }
                    }
                    ],
                    tabBarShowLabel: false
                }}>

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
                        <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Trang chủ</Text>
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
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Yêu thích</Text>
                        </View>
                    ),
                    tabBarBadge : quantityFavorite > 0 ? quantityFavorite :null
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
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Khuyến mãi</Text>
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
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Giỏ hàng</Text>
                        </View>
                    ),
                    tabBarBadge : quanityCart > 0 ? quanityCart :null
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
                            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Tài khoản</Text>
                        </View>
                    )
                }}     
        />
    </Stack.Navigator>

    </View> 
    )
    
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