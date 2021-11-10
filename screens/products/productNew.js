import React, { useEffect, useState} from "react";
import {View, Text, StyleSheet,Dimensions,FlatList, Image} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from "react-native-linear-gradient";
import Label, {Orientation} from "react-native-label";


export default function ProductNew(props,{navigation}){
   const dataImage = props.Data
   const dataNewProduct = props.DataNewproduct


    const renderitem = ({item})=>{
        return(
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    } 

    return(

        <View style={styles.container}>
            <View style = {{ ...styles.box,backgroundColor:'#FFC0C7'}}> 
            <SliderBox
                sliderBoxHeight={windowH*0.4}
                parentWidth={windowW*0.475}            
                images={props.images}
                onCurrentImagePressed={index => {
                    props.navigation.navigate('productDetail',{
                        data : dataImage[index]
                    });
                   console.log(dataImage[index])
                    console.log(dataImage[index].id)
                }}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
        />
            </View>
            <View style =  {{ ...styles.box,backgroundColor:'#E7E9EB' }}> 
                 <Text>fvfdkj</Text>     
                 <FlatList
                    horizontal
                    data={dataNewProduct}
                    keyExtractor= {item=>item.id}
                    renderItem={renderitem}
                    />
            </View>
        </View>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        height: windowH*0.43,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-around",

    },
    box:{
        // backgroundColor: "white",
        width: windowW*0.475,
        height: windowH*0.4,
         shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4,
        elevation: 4,
        borderRadius: 5,
        justifyContent: "center",
        alignContent:"center",
        alignItems:"center"
    },

})