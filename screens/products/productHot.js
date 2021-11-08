import React, { useEffect, useState} from "react";
import {View, Text, StyleSheet,Dimensions,FlatList, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Label, {Orientation} from "react-native-label";
import * as GETAPI from '../../util/fetchApi'
import { SetHTTP } from "../../util/setHTTP";
import { FormatNumber } from "../../util/formatNumber";

export default function ProductHot(){

    const [Data, setData] = useState([])
    const [text,Settext]  = useState(true)

    useEffect(() => {
        getProductSale();
        // const interval = setInterval(() => {
        //     Settext(()=>{
        //         return Settext(!text)
        //     })
            

        //     // console.log("abcder")
        //       }, 1000);
        // return () => {
        //     clearInterval(interval)
        // }
        console.log("có chạy lại k")
    }, [])

const getProductSale= async()=>{
    const res = await GETAPI.getAPI('/product/getTopProductSale');
    setData(res);
}

const renderitem = ({item,index})=>{
    const titleSale = 100-(Math.round((item.promotional*100)/item.price))
    return(
        <View style={{ marginHorizontal: 6 }}>
            <Label
                orientation={Orientation.TOP_RIGHT}
                containerStyle={styles.productsaleLable}
                title={`${titleSale}%`}
                color="red"
                distance={15}
                extent={0.0}
                style={{fontSize: 10,
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
                    style={{ width : windowW*0.27, height : windowH*0.17}}/>
                    <View style={{ flex : 1, justifyContent:"space-around", margin : 3 ,flexDirection:"row",}}>
                        <Text style={{fontSize : 10,color : "#777777", textDecorationLine:"line-through", marginRight:5 }}>{FormatNumber(item.price)}đ</Text>
                        <Text style={{ fontSize :10,color : "red"}}>{FormatNumber(item.promotional)}đ</Text>
                    </View>
                </View>
            </Label>
        </View>
    )
    }
    return(

        <LinearGradient  colors= {["#C790E5","#EDDAF5"]} style={styles.container}>
                <LinearGradient  colors= {["#6C2DC6","#9C30FF","#C482F7","#B7A4F7"]} style={styles.Sale}>
                <View style={styles.LogoSale}>
                    <LinearGradient colors= {["#9C30FF","#C482F7","#B7A4F7","#FEFFFF"]} style={styles.deal}>
                        <Text style={{...styles.text,color : '#E0FF4E'}}>SIÊU SALE</Text>  
                    </LinearGradient>
                </View>
                <View style={styles.productsale}>
                
                <FlatList
                    horizontal
                    data={Data}
                    keyExtractor={item=>item.id}
                    renderItem={renderitem}
                />
                </View>
            </LinearGradient>
        </LinearGradient>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        height: windowH*0.31,
    },
    Sale:{
        marginHorizontal: 6,
        marginTop: 10,
        height:windowH*0.29,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,


    },
    LogoSale:{

        justifyContent: "center",
        alignContent : "center",
        alignItems:"center"
    },
    deal:{ 
        backgroundColor: "white" , 
        width: 120,
        height: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius:30,
        borderWidth: 2,
        borderColor:"#51FEC7",
        justifyContent: "center",
        alignContent:"center",
        alignItems:"center", 
        padding:10
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
        marginTop: 10,
        marginLeft:5
    },
    productsaleLable:{
        width: windowW*0.28,
        backgroundColor: "white",
        height : windowH*0.206,
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