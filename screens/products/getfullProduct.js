import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image} from "react-native";
import { SetHTTP } from "../../util/setHTTP";
import Label, {Orientation} from "react-native-label";
import { FormatNumber } from "../../util/formatNumber";
export default function GetfullProduct(props){

   const datafullproduct=props.DatafullProduct
 

    const renderitem = (item)=>{
        const name = item.name;
        const titleSale = 100-(Math.round((item.promotional*100)/item.price))
        return(
            <TouchableOpacity key={item.id} onPress={()=>{console.log(SetHTTP(item.image))}}>
                {item.promotional > 0 ? 
                <>
                <Label
                        orientation={Orientation.TOP_RIGHT}
                        containerStyle={styles.cart_item}
                        title={`${titleSale}%`}
                        // colors={['green','red','white']}
                        distance={18}
                        extent={0.0}
                        style={{
                                fontSize: 15,
                                color: 'white',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                        }}
                        shadowProps={{ shadowColor: "#C8C8C8",
                                        shadowOffset: { width: 0, height: 12, },  
                                        shadowOpacity: 0.2, shadowRadius: 8, 
                                        elevation: 2 }}>
                        <View >
                            <Image 
                                    source={{ uri:SetHTTP(item.image)}} 
                                    resizeMode='contain'
                                    style={{ width : windowW*0.46,
                                        height : windowH*0.35,
                                        borderRadius:10,
                                    }}
                                />
                        </View >
                            <View style={{ justifyContent: "center",flexDirection:"row" }}>
                                <Text>{name.toLowerCase()}</Text>
                            </View>
                            <View style={{ flex : 1, justifyContent:"space-around", margin : 3 ,flexDirection:"row",}}>
                                    <Text style={{...styles.price ,color : "#777777", textDecorationLine:"line-through", marginRight:5 }}>{FormatNumber(item.price)}đ</Text>
                                    <Text style={{ ...styles.price ,color:"red"}}>{FormatNumber(item.promotional)}đ</Text>
                                
                                {/* <Text style={{ ...styles.price, color:'red' }}>{FormatNumber(item.price)}đ</Text> */}
                            </View>  
                            <Text>DDanhs gia sao</Text>          
                    </Label>
                </>:
                <>
                <View style={{...styles.cart_item, justifyContent: "center",alignContent: "center" }}>
                        <View >
                            <Image 
                                    source={{ uri:SetHTTP(item.image)}} 
                                    resizeMode='contain'
                                    style={{ width : windowW*0.46,
                                        height : windowH*0.35,
                                        borderRadius:10,
                                    }}
                                />
                        </View>
                            <View style={{ justifyContent: "center",flexDirection:"row" }}>
                                <Text>{name.toLowerCase()}</Text>
                            </View>
                            <View style={{ flex : 1, justifyContent:"space-around", margin : 3 ,flexDirection:"row",}}>
                                <Text style={{ ...styles.price, color:'red' }}>{FormatNumber(item.price)}đ</Text>
                            </View>  
                            <Text>DDanhs gia sao</Text>          
                    </View>
                </>}
                
            </TouchableOpacity>
        )
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {datafullproduct!==undefined &&
                datafullproduct.map(e=>{
                    return(
                         renderitem(e)
                    )
                })}
        </ScrollView>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"space-between",
        flexDirection:"row",
        backgroundColor: 'white',
        flexWrap:'wrap',

    },
    cart_item:{
        width: windowW*0.47,
        height: windowH*0.50,
        margin: 5,
        backgroundColor: "#F8F9F9",
        borderRadius: 5,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height: 2,
        },
        shadowOpacity : 0.35,
        shadowRadius: 3.4,
        elevation:5,

    },
    price:{ fontSize :14,
        
    }
})