import React from "react";
import {View, Text, TextInput, StyleSheet, Dimensions,Image, Button,TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default function HeaderScreen({navigation}){
    return(
        <LinearGradient
        colors={["#764FE2",'#9C30FF']}
         style= {style.container}>
            <View style= {style.header}>
                <Image source={require('../../assets/icons/cartwhite.png')} resizeMode="contain"
                style={{ width : 30, height: 30, marginRight :12 }}></Image>

                <Image source={require('../../assets/icons/wallet.png')} resizeMode="contain"
                style={{ width : 30, height: 30 }}></Image>
            </View>
            <View style={style.search1}>
                <View style={style.input}>
                    {/* Nhấn vào input  hoặc button cho nhảy sang trang search */}
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('search')
                    }}>
                        <TextInput style={style.textinput}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
                                <LinearGradient
                                     colors={["#C790E5",'#9C30FF','#BEE6F0']}style={style.search}>
                                    <Text style= {{ color: 'white' }}>Tìm kiếm</Text>
                                </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            

        </LinearGradient>
    )
}

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

const style = StyleSheet.create({
    container:{
        
        height : windowH*0.121,
        backgroundColor : "#764FE2",

    },
    input:{
        flexDirection:"row",
        height : windowH*0.055,
        width : windowW*0.8,
        borderWidth : 1,
        borderColor: 'red',
        backgroundColor: 'white',
        borderRadius : 50,
        marginTop : 10,
        
    },
    textinput:{

        backgroundColor : 'white',
        height : windowH*0.05,
        width : windowW*0.556,
        borderWidth : 0,
        borderTopLeftRadius : 50,
        borderBottomLeftRadius:50
    },
    search:{
        backgroundColor : "red",
        height : windowH*0.045,
        width : windowW*0.23,
        borderRadius :50,
        marginTop : 2,
        textAlign: "center",
        justifyContent : "center",
        alignContent : "center",
        alignItems:"center"
    },
    header:{
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginRight : 15
        
    },
    search1:{
        justifyContent : "center",
        alignContent : "center",
        alignItems:"center"
    }
})
