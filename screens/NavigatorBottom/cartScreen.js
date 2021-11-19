import { get } from "immer/dist/internal";
import React, {useEffect, useState} from "react";
import { View, Text ,StyleSheet,FlatList, Dimensions} from "react-native"; 
import * as GETAPI from '../../util/fetchApi';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CartScreen (props, {navigation}){
const [Dataproduct, setDataproduct] = useState([]);


    useEffect(() => {
      const set =  props.navigation.addListener('focus',()=>{
        getDataAnsynStore()
            
        })

        return set;
    }, [])


const getDataAnsynStore = async()=>{
    let data = [];
    const getData = await AsyncStorage.getItem('CART');
    if(getData !== null){  
       const data1 = {"data": getData}
        console.log(data1)
        const res = await GETAPI.postDataAPI('/order/getProductByCart',data1)
        console.log(res)
    }
    
}   
const GetDataProductbyCart = async()=>{
    const res = await GETAPI.getAPI('/order/getFullProduct')
    // console.log(res)
    setDataproductSever(res)
}



    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={{ color: 'red', fontWeight: "bold", fontSize:18, marginLeft: 15, marginTop:5}}>Giỏ hàng của tôi(12)</Text>
            <Text style={{ color: 'red', fontWeight: "bold", fontSize:12, marginLeft: 15, marginRight: 10, marginTop:8}}>icoNDELETE</Text>
            </View>
            <View style={styles.flaslist}>
               {/* {DataproductAsyncStore.length==0 ? <Text>rgrf</Text> :  <Text>{DataproductAsyncStore[0].id}</Text> } */}
            </View>
                <View style={styles.BottompaymentItem}>
                    <Text>Thanh toan</Text>
                    <Text>xin chao</Text>
                </View>
           
        </View>
    )

}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flaslist:{
        marginTop: 5,
        

    },
    BottompaymentItem:{
        flexDirection: "row",
        justifyContent: "flex-start",
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'green',
        width: windowW,
        height: 50
    },
    header:{
        borderBottomWidth: 0.5,
        borderBottomColor: "#D3D3D3",
        height: 35,
        flexDirection: "row",
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 2

     
    }
})