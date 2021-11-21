import { get } from "immer/dist/internal";
import React, {useEffect, useState} from "react";
import { View, Text,Image,StyleSheet,FlatList, Dimensions, TouchableOpacity, Alert, StatusBar} from "react-native"; 
import * as GETAPI from '../../util/fetchApi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetHTTP } from "../../util/setHTTP";
import { FormatNumber } from "../../util/formatNumber";
import truncate from "../../util/truncate";
import LoadingCircle from '../StartScreens/loadingCircle'
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";

export default function CartScreen (props, {navigation}){
const [Dataproduct, setDataproduct] = useState([]);
const [DataAnsynStore, setDataAnsynStore] = useState([]);
const [isLoading, setisLoading] = useState(true);
const [countItemcart, setcountItemcart] = useState(0)
const [checkAll, setcheckAll] = useState(true)

    useEffect(() => {
      const set =  props.navigation.addListener('focus',()=>
      {
            setisLoading(true)
            getDataAnsynStore()
        })

        return set;
    }, [])


const getDataAnsynStore = async()=>{
    let arr = [];
    const getData = await AsyncStorage.getItem('CART');
    if(getData !== null){ 
        arr = JSON.parse(getData);
        const countCart = arr.length;
        const data1 = {"data": getData}
        const res = await GETAPI.postDataAPI('/order/getProductByCartApp',data1);
        setcountItemcart(countCart)
        setDataproduct(res);
        setDataAnsynStore(arr);
        setisLoading(false);
    }else{
        setDataproduct([]);
        setcountItemcart(0)
        setisLoading(false);
    }
    
}

const Increase = async(id)=>{
    let dataProduct = Dataproduct;
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
        if(dataAnsynstore[i].id == id){
            if(dataAnsynstore[i].quanity >= 5){
                Alert.alert('CTFASHION','Tối đa 5 sản phẩm !!')
            }else{
                dataAnsynstore[i].quanity +=1;
            }
        }
    }

    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    getDataAnsynStore()
}

const Reduce = async(id)=>{
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
        if(dataAnsynstore[i].id == id){
            if(dataAnsynstore[i].quanity == 1){
                Alert.alert('CTFASHION','Bạn muốn xóa sản phẩm này !!!',[
                    {
                        text: 'Cancel',
                        style:'cancel'
                    },
                    {
                        text: "Ok",
                        onPress:async()=>{
                            for(let j = 0;j<=dataAnsynstore.length-1;j++){ 
                                if(dataAnsynstore[j].id==id){
                                    dataAnsynstore.splice(j,1)
                                    await AsyncStorage.setItem("CART",JSON.stringify(dataAnsynstore))
                                    getDataAnsynStore()
                                    console.log("xoa roi")
                                }
                            }  
                        }  
                    }
                ])
            }else{
                dataAnsynstore[i].quanity -=1;
            }

        }
    }
    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    getDataAnsynStore()
}

const Check = async(id)=>{
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
        if(dataAnsynstore[i].id == id){
            dataAnsynstore[i].status = true;
        }
    }

    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    getDataAnsynStore()
    setcheckAll(true)
}

const UnCheck = async(id)=>{
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
        if(dataAnsynstore[i].id == id){
            dataAnsynstore[i].status = false;
        }
    }

    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    getDataAnsynStore()
    setcheckAll(true)
}

const UnCheckall = async()=>{
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
            dataAnsynstore[i].status = false;       
    }
    await AsyncStorage.removeItem("CART")
    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    console.log(dataAnsynstore)
    getDataAnsynStore()
    setcheckAll(true)
}

const Checkall = async()=>{
    let dataAnsynstore = DataAnsynStore;
    for(let i = 0; i < dataAnsynstore.length ; i++){
            dataAnsynstore[i].status = true;       
    }
    await AsyncStorage.removeItem("CART")
    await AsyncStorage.setItem('CART',JSON.stringify(dataAnsynstore));
    console.log(dataAnsynstore)
    getDataAnsynStore()
    setcheckAll(false)
}

const CartTotal = (data)=>{
    var tong=0;
    for( let item = 0;item<=data.length-1;item++){
        if (data[item].status==true){
            if(data[item][0].promotional > 0){
                tong +=(data[item][0].promotional*data[item].quanity);
            }else{
                tong +=(data[item][0].price*data[item].quanity);
            }
        }
    }
    // this.setState({total : tong})
    return tong;
}


const removeAllCart = async()=>{
    try {
    await AsyncStorage.removeItem("CART")
        setDataAnsynStore([])//render lai
        getDataAnsynStore()// kg chiu render lai
    } catch (error) {
        console.log(error)
        
    }
}
const DeleteAll =()=>{
    if(DataAnsynStore.length == 0){
        alert('CTFASHION','Giỏ hàng của bạn đang trống !!')

    }else{
        Alert.alert('CTFASHION','Bạn muốn xóa giỏ hàng !!!',[
            {
                text: 'Cancel',
                style:'cancel'
            },
            {
                text: "Ok",
                onPress:()=>{removeAllCart()
                        }
                    }
                ])
    }

   
}

const renderItem = ({item})=>{
    // console.log('2343')
    return(
        <View style={{ marginBottom:  3}}>
            <View style={styles.wrapItem}>
                {item.status == false ? 
                <>
                <TouchableOpacity onPress={()=>{Check(item[0].id)}}>
                    <View style= {{ marginLeft: 10 }}>
                        <Image source={ require('../../assets/icons/uncheck.png')}
                        resizeMode="contain" style={{ width: windowW*0.055, height: windowH*0.055 }} /> 
                    </View>
                </TouchableOpacity>
                </>:
                <>
                <TouchableOpacity onPress={()=>{UnCheck(item[0].id)}}>
                    <View style= {{ marginLeft: 10 }}>
                        <Image source={ require('../../assets/icons/check.png')}
                        resizeMode="contain" style={{ width: windowW*0.055, height: windowH*0.055 }} /> 
                    </View>
                </TouchableOpacity>
                </>}
                <Image source={{uri:SetHTTP(item[0].image)}} resizeMode='contain'
                    style={{ width: windowW*0.25, height: windowH*0.11 }}/>  
                <View style={{ flexDirection: "column",flex:1}}>
                    <Text style={{ color: 'black', fontSize: 13, fontWeight: "bold" }}>{truncate(item[0].name)}</Text>
                    <View style={{ flexDirection: 'row',justifyContent: 'flex-start', marginTop : 10  }}>
                        <Text style={{ color: 'grey', fontSize: 13,  }}>Size/màu sắc : </Text>
                        <Text style={{ color: 'grey', fontSize: 13, marginLeft: 10  }}>{item.option}</Text>
                    </View>
                    <View style= {{ flexDirection: 'row',justifyContent: 'space-between',width:'100%', marginTop: 10 }}>
                        <View style= {{ flexDirection: 'row'}}>
                            {item[0].promotional > 0 ? 
                            <>
                            <Text style={{ color: 'grey', fontSize: 13, textDecorationLine: "line-through"  }}>{FormatNumber(item[0].price)} đ</Text>
                            <Text style={{ color: 'red', fontSize: 13, marginLeft: 10  }}>{FormatNumber(item[0].promotional)} đ</Text>
                            </>:
                            <Text style={{ color: 'red', fontSize: 15,  }}>{FormatNumber(item[0].price)} đ</Text>
                            }
                        </View>
                        <View style= {{ flexDirection: 'row', marginRight: 5}}>
                                <TouchableOpacity onPress={()=>{Reduce(item[0].id)}}>
                                        <Text style={{ width: windowW*0.06 , textAlign: "center", borderWidth: 1, borderColor: 'red',fontWeight: 'bold', borderRadius: 40, color:'red', backgroundColor:"#D3D3D3"}}> - </Text> 
                                </TouchableOpacity>
                                        <Text style={{ width: windowW*0.08 , textAlign: "center",fontWeight: 'bold'}}>{item.quanity}</Text>
                                    <TouchableOpacity onPress={()=>{Increase(item[0].id)}}>
                                        <Text style={{ width: windowW*0.06 , textAlign: "center", borderWidth: 1, borderColor: 'red',fontWeight: 'bold', borderRadius: 40, color:'red', backgroundColor:"#D3D3D3"}}> + </Text>
                                    </TouchableOpacity>
                        </View>
                    </View>   
                </View>
            </View>
        </View>
    )
}


    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <View style={styles.header}>
            <Text style={{ color: 'red', fontWeight: "bold", fontSize:18, marginLeft: 15, marginTop:5}}>Giỏ hàng của tôi({countItemcart})</Text>
            <TouchableOpacity onPress={()=>{DeleteAll()}}>
                <Image source={ require('../../assets/icons/delete_26px.png')}
                  resizeMode="contain" style={{ width: windowW*0.055, height: windowH*0.055,marginRight: 15}} /> 

            </TouchableOpacity>
        </View>
        {isLoading === true ? 
        <View style={{ flex:1, justifyContent:'center', alignContent:'center' }}>
            <LoadingCircle/>
        </View>:
        <> 
            {Dataproduct.length == 0 ?  
            <View style={{  flex:1,
                            flexDirection: 'column',
                            justifyContent:"center", 
                            alignContent: 'center', 
                            alignItems:'center',
                             }}>
                <LottieView  
                    source={require('../../assets/lottierfiles/empty-cart.json')}
                    style={{ width:windowW*0.5, height:windowH*0.5}}
                    autoPlay
                    loop                   
                />
            </View>:
            <View style={{  flex: 1 }}>
               <FlatList
                data = {Dataproduct}
                keyExtractor= {item=>item[0].id}
                renderItem={renderItem}
            />
            </View>}
        </>}

                <View style={styles.BottompaymentItem}>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems:'center',paddingVertical: 10, paddingLeft: 15 }}>
                        {checkAll ? 
                        <>
                        <TouchableOpacity onPress={()=>{Checkall()}}>
                            <Image source={ require('../../assets/icons/uncheck.png')}
                            resizeMode="contain" style={{ width: windowW*0.055, height: windowH*0.055 }} /> 
                        </TouchableOpacity>
                        </>:
                        <>
                        <TouchableOpacity onPress={()=>{UnCheckall()}}>
                           <Image source={ require('../../assets/icons/check.png')}
                            resizeMode="contain" style={{ width: windowW*0.055, height: windowH*0.055 }} /> 
                         </TouchableOpacity>
                        </>}
                        <Text style={{ marginLeft : 10 , fontSize: 13}}>Tất cả</Text>
                    </View>
                    <View style={{ flexDirection: 'column',flex:1 , paddingVertical: 5}}>
                        <View style={{ flexDirection: 'row',justifyContent: 'flex-end' }}>
                            <Text style={{color: 'green', fontSize : 12}}>Tổng cộng : </Text>
                            <Text style={{color: 'red'}}> {FormatNumber(CartTotal(Dataproduct))} đ </Text>
                        </View>
                        <View style={{ flexDirection: 'row',justifyContent: 'flex-end' }}>
                            <Text style={{ marginLeft : 10 , fontSize: 10}}>Phí vận chuyển : </Text>
                            {CartTotal(Dataproduct) > 0 ? <Text style={{color: 'red'}}> {FormatNumber(30000)} đ </Text> : 
                            <Text style={{color: 'red'}}> 0 đ </Text> }
                            
                            
                        </View>
                        
                    </View>

                    <LinearGradient
                    colors={['#7C007C','#B16FD8','#CB9ADC' ]}
                    style={{ width: windowW*0.35, 
                                    backgroundColor: 'pink'
                                    ,height: 38, marginTop: 6, 
                                    marginRight: 5, 
                                    flexDirection:'row', 
                                    justifyContent:"center",
                                    alignItems:"center",
                                    alignContent:'center',
                                    borderRadius: 40}}>
                        <Text style={{ fontWeight:'bold', color:'white' }}>Thanh toán</Text>
                    </LinearGradient>
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

    BottompaymentItem:{
        flexDirection: "row",
        justifyContent: "flex-start",
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'green',
        width: windowW,
        height: 50,
        borderTopWidth: 1,
        borderTopColor:'#D3D3D3',
        backgroundColor: 'white'
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
    },
    wrapItem: {
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent:"flex-start",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        paddingBottom: 8,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height:2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
        paddingTop: 10,
        borderRadius: 5,
        backgroundColor:'#FDE0C7',
        
    }
})