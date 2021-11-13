
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet ,Image,Dimensions, ScrollView,TouchableOpacity } from 'react-native';
 import HeaderScreen from '../NavigatorBottom/headerScreen';
 import * as GETAPI from '../../util/fetchApi';
 import {SliderBox} from 'react-native-image-slider-box';
import { SetHTTP } from '../../util/setHTTP';
import LinearGradient from 'react-native-linear-gradient';
import { FormatNumber } from '../../util/formatNumber';
import LoadingCircle from '../StartScreens/loadingCircle';
import Star from 'react-native-star-view';
import LottieView from "lottie-react-native";
import RenderHtml from 'react-native-render-html';

export default function Productdetail(props,{navigation}){
    const [textsearch, settextsearch] = useState('');
    const [colorSearch, setcolorSearch] = useState(null);
    const [bgHeader, setbgHeader] = useState(true);
    const [DataProductDetail, setDataProductDetail] = useState([]);
    const [DataProductType, setDataProductType] = useState([]);
    const [imageslidebox, setimageslidebox] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [star,setstar] = useState(5);
    const [quantityReview, setquantityReview] = useState(0);
    const [description, setdescription] = useState({})
    // const imageslidebox = [];
    const Data = props.route.params;
    const idProduct= {id: Data.idProduct}
    const idProductType= {id: Data.idProductType}

    useEffect(() => {
        getProductDetail();
        getProductType();
       
    }, [])

    const getProductDetail = async()=>{
        const imageslide = [];
        const res = await GETAPI.postDataAPI('/product/getProductDetails',idProduct);
        setDataProductDetail(res);
        imageslide.push(SetHTTP(res[0].image));
        res[0].imageDecription1 != null ? imageslide.push(SetHTTP(res[0].imageDecription1)): null;
        res[0].imageDecription2 != null ? imageslide.push(SetHTTP(res[0].imageDecription2)): null;
        res[0].imageDecription3 != null ? imageslide.push(SetHTTP(res[0].imageDecription3)): null;
        res[0].imageDecription4 != null ? imageslide.push(SetHTTP(res[0].imageDecription4)): null;
        if(res[0].reviewStar!==null){
            setstar(Math.round(res[0].reviewStar*10)/10)
            setquantityReview(res[0].quanityReview)
        }
        if(res[0].description!==null){
            setdescription({html: res[0].description})
        }else{
            setdescription({html:` <h3 style={color:'red'}>SẢN PHẨM KHÔNG CÓ MÔ TẢ</h3> `})
        }
        setimageslidebox(imageslide)
        setisLoading(false);

    }
    const getProductType = async()=>{
        const res = await GETAPI.postDataAPI('/product/getProductByType',idProductType);
        setDataProductType(res);

    }
        return(
            <View style={{ flex: 1 }}>
                <HeaderScreen navigation={navigation} textsearch={textsearch} hideSearch={false} heightHeader={windowH*0.08} colorSearch={colorSearch} bgWhite={bgHeader}/>
                {isLoading == true ? 
                <View style={{ flex:1, justifyContent: 'center', alignContent: 'center' }}>
                <LoadingCircle/>
                </View>:
                <>
                <ScrollView >
                    <View style= {styles.box}>
                        <SliderBox
                                    sliderBoxHeight={windowH*0.5}
                                    parentWidth={windowW*0.9}            
                                    images={imageslidebox}
                                    dotColor="#FFEE58"
                                    inactiveDotColor="#90A4AE"
                                    // paginationBoxVerticalPadding={20}
                                    resizeMode='contain'
                                    circleLoop
                            />
                        </View>
                        <View style={styles.Price}>
                            <View style={{...styles.priceItem}}>
                            {DataProductDetail[0].promotional == null ? 
                            <>
                                <Text style={{ color: 'red', fontSize: 19, marginTop: 5,fontWeight:'bold'}}>{FormatNumber(DataProductDetail[0].price)} đ</Text>
                            </>: 
                            <>
                                <Text style={{ color: 'red', fontSize: 19, marginTop: 5,fontWeight: 'bold'}}>{FormatNumber(DataProductDetail[0].promotional)} đ</Text>
                                <View style = {{ flexDirection: 'row', justifyContent: 'flex-start' }}> 
                                    <Text style={{ color: '#888', fontSize: 16, marginTop: 5, textDecorationLine:'line-through' }}>{FormatNumber(DataProductDetail[0].price)} đ</Text>
                                    <Text style={{ color: 'red', fontSize: 16, marginTop: 5, marginLeft :15, backgroundColor: '#D3D3D3', borderRadius: 20}}>  -{100-(Math.round((DataProductDetail[0].promotional*100)/DataProductDetail[0].price))}%  </Text>
                                </View>
                            </>}   
                            </View>
                                <TouchableOpacity style={{ marginRight: 30, marginTop: 5 }} onPress={()=>{  }}>
                                        {/* <Image source={require("../../assets/icons/likes_add.png")} style={{ width: 28, height : 28, marginLeft : 10, marginRight : 10 }} resizeMode="contain"></Image> */}
                                        <View>
                                        <LottieView  
                                        source={require('../../assets/lottierfiles/ccc.json')}
                                                 style={{ width:50, height:50}}
                                                 autoPlay
                                                 loop
                                                            
                                     />
                                     </View>
                           
                            </TouchableOpacity>
                        </View>
                        <View style = {{ borderBottomWidth: 1, borderColor: "#D3D3D3", }}>
                            <Text style={{ color: 'black', fontSize: 14, marginTop: 5,fontWeight: 'bold', marginLeft: 15}}>{DataProductDetail[0].name} </Text>   
                            <View style ={{ flexDirection: 'row', marginTop : 5, marginLeft: 15 }}>
                                <Text>{star}/5</Text>
                                <Star score={star} style={{width:80,height:15, marginLeft : 5}}/> 
                                <Text style = {{ marginLeft :5 }}>({quantityReview} đánh giá)</Text>
                            </View>
                        </View> 
                        <View style = {{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#D3D3D3'}}>
                                <View style = {{  marginLeft: 15 , flexDirection: 'row', justifyContent: 'space-between'  }}>
                                    <Text style = {{  fontSize : 12, fontWeight: 'bold'}}>HÌNH THỨC GIAO HÀNG</Text>
                                    <View style = {{   flexDirection: 'row', justifyContent: 'space-between'  }} >
                                    {/* <Text style = {{  fontSize : 12, fontWeight: 'bold', marginRight: 5 }}>qq</Text> */}
                                    
                                    <View>
                                        <LottieView  
                                        source={require('../../assets/lottierfiles/location-lottie-animation.json')}
                                                 style={{ width:25, height:20}}
                                                 autoPlay
                                                 loop
                                                            
                                     />
                                     </View>
                                    <Text style = {{  fontSize : 12, fontWeight: 'bold', marginRight: 5 }}>Nông Sơn, Quảng Nam</Text>
                                    </View>
                                </View>
                                <View style = {{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style = {{  fontSize : 11 }}>GH Tiêu chuẩn</Text>
                                    <Text style = {{  fontSize : 12,fontWeight: 'bold', color: 'black', }}>22.000 đ   </Text>
                                </View>
                        </View> 
                        <View style={{ marginTop : 5, marginHorizontal : 15 , borderBottomWidth: 1, borderBottomColor: "#D3D3D3"}}>
                            <Text>CHI TIẾT SẢN PHẨM</Text>
                            <RenderHtml
                            contentWidth={windowW}
                            source={description}
                            />


                        </View>


                    </ScrollView>
                </>}

            </View>

        )
    
}
const windowH = Dimensions.get('window').height;
const windowW = Dimensions.get('window').width;
const styles = StyleSheet.create({
    box:{
        
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3"
    },

    Price:{
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        marginTop: 5,
        
    },
    priceItem:{
        marginHorizontal: 10,

        
    }
})