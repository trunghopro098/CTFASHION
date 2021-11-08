import React from "react";
import {View, Text, TextInput, StyleSheet, Dimensions,Image,TouchableOpacity,Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function HeaderScreen(props,{navigation}){
    const {bgWhite} = props;
    return(
        <Animated.View>
        <LinearGradient
            colors={["#764FE2",'#9C30FF']}
            style= {style.container}
        >
            <View style= {bgWhite?{...style.header,backgroundColor:'white'}:{...style.header}}>
                <Text style={bgWhite?{...style.label,color:'tomato'}:{...style.label}}>CT FASHION</Text>
                <View style={{ flexDirection:'row' }}>
                    <AntDesign name="shoppingcart" color={bgWhite?"black":"white"} size={24} style={{marginRight:10}}/>

                    <Feather name="user" color={bgWhite?"black":"white"} size={24}/>
                </View>
            </View>
            <View style={{...style.search1,backgroundColor:props.colorSearch}}>
                <View style={style.input}>
                    {/* Nhấn vào input  hoặc button cho nhảy sang trang search */}
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('search')
                    }}>
                        <TextInput style={style.textinput}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
                        <LinearGradient 
                            colors={["#C790E5",'#9C30FF','#BEE6F0']}
                            style={style.search}
                        >
                            <Text style= {{ color: 'white' }}>Tìm kiếm</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
        </Animated.View>
    )
}

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

const style = StyleSheet.create({
    container:{
        
        height : windowH*0.145,
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
        justifyContent: 'space-between',
        paddingRight : 15,
        paddingTop:10,
        paddingBottom:10
    },
    search1:{
        justifyContent : "center",
        alignContent : "center",
        alignItems:"center",
        paddingBottom:10
    },
    label:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        marginLeft:10,
        marginTop:5 
    }
})
