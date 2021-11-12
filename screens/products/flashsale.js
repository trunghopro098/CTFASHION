import React, { useEffect, useState} from "react";
import {View, Text, StyleSheet,Dimensions,FlatList, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Label, {Orientation} from "react-native-label";
import * as GETAPI from '../../util/fetchApi'
import { SetHTTP } from "../../util/setHTTP";
import { FormatNumber } from "../../util/formatNumber";
import { LoadingSkeletonflashsale } from "../StartScreens/loadingSkeleton";

export default function Flashsales(props){
const data = props.Data

const renderitem= ({item,index})=>{
    const titleSale = 100-(Math.round((item.promotional*100)/item.price))
    return(

        <View style={{ marginHorizontal: 3 , marginTop: 4}}>
        <Label
            orientation={Orientation.TOP_RIGHT}
            containerStyle={styles.productsaleLable}
            title={`${titleSale}%`}
            // colors={['green','red','white']}
            distance={15}
            extent={0.0}
            style={{
                    fontSize: 12,
                    color: 'white',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
            }}
            shadowProps={{ shadowColor: "#C8C8C8",
                            shadowOffset: { width: 0, height: 12, },  
                            shadowOpacity: 0.2, shadowRadius: 8, 
                            elevation: 2 }}
        >
            <View style={{...styles.itemdetail, backgroundColor: "#FDE0C7"}}>
            <Image source={{uri :SetHTTP(item.image) }} 
                resizeMode='contain'
                style={{ width : windowW*0.3, height : windowH*0.19, marginTop: 5, borderRadius: 10}}/>
                <Text style={{ fontSize :10,color : "grey", marginTop: 4, marginHorizontal: 6}}>{item.name}</Text>
                <View style={{ flex : 1, justifyContent:"space-around", margin : 3 ,flexDirection:"row",}}>
                    <Text style={{fontSize : 10,color : "#777777", textDecorationLine:"line-through", marginRight:5 }}>{FormatNumber(item.price)}đ</Text>
                    <Text style={{ fontSize :10,color : "red"}}>{FormatNumber(item.promotional)}đ</Text>
                </View>
                
            </View>
        </Label>
    </View>
    )}

    return(

        <View>
            {data.length===0 || data==undefined  ? 
            <><LoadingSkeletonflashsale/></>:
            <>
            <LinearGradient  colors= {["#EDDAF5","white"]} style={styles.container}>
                <LinearGradient  colors= {['#F767C3', '#8fcbbc','white']} style={styles.Sale}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight:'bold', marginLeft: 15 }}>FLASHSALE</Text>
                    <Text style={{ color: '#149FF9', fontSize: 15 , marginRight:10 }}>{`Xem thêm >>`}</Text> 
                    </View>
                    <View style={styles.productsale}>
                        <FlatList
                        horizontal
                        data={data}
                        keyExtractor= {item=>item.id}
                        renderItem={renderitem}
                        />
                    </View>
                </LinearGradient>
            </LinearGradient>
            </>}
        </View>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        height: windowH*0.39,
    },
    Sale:{
        
        marginTop: 10,
        height:windowH*0.35,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15


    },
    LogoSale:{

        justifyContent: "center",
        alignContent : "center",
        alignItems:"center"
    },

    text:{
        
        fontWeight : 'bold',
        textAlign: 'center'
    },
    productsale:{
        flexDirection: "row",
        justifyContent: 'space-around',
        alignContent: "space-around",
        alignItems: "center",
        marginTop: 2,
        marginHorizontal: 6

    },
    productsaleLable:{
        width: windowW*0.35,
        backgroundColor: "white",
        height : windowH*0.31,
        borderRadius : 10,
    },
    productitemsale:{
         shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    itemdetail:{ 
        flex:1,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})