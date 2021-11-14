import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet ,Image,Dimensions, ScrollView,TouchableOpacity,StatusBar } from 'react-native';
import HeaderScreen from '../NavigatorBottom/headerScreen';
import * as GETAPI from '../../util/fetchApi';
import {SliderBox} from 'react-native-image-slider-box';
import { SetHTTP } from '../../util/setHTTP';
import { FormatNumber } from '../../util/formatNumber';
import LoadingCircle from '../StartScreens/loadingCircle';
import Star from 'react-native-star-view';
import LottieView from "lottie-react-native";
import RenderHtml from 'react-native-render-html';
import Carousel from 'react-native-snap-carousel';
import truncate from '../../util/truncate';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Productdetail(props,{navigation}){
    const [textsearch, settextsearch] = useState('');
    const [colorSearch, setcolorSearch] = useState(null);
    const [bgHeader, setbgHeader] = useState(true);
    const [DataProductDetail, setDataProductDetail] = useState([]);
    const [DataProductType, setDataProductType] = useState([]);
    const [imageslidebox, setimageslidebox] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isLoading1, setisLoading1] = useState(true);
    const [star,setstar] = useState(5);
    const [quantityReview, setquantityReview] = useState(0);
    const [description, setdescription] = useState({})
    const [checkPromotional, setcheckPromotional] = useState(null);
    const [isFavourite, setisFavourite] = useState(false);
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
        if(res[0].promotional !==null){
            setcheckPromotional(res[0].promotional)
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
        setisLoading1(false)

    }

    const ViewOrder = ()=>(
        <View style={styles.wrapperBottom}>
            <TouchableOpacity style={{ flexDirection:'column',alignItems:'center',flex:0.25 }}>
                <Entypo name="shop" color="red" size={20}/>
                <Text>Giỏ hàng</Text>
            </TouchableOpacity>
            <View style={styles.verticleLine}></View>
            <TouchableOpacity style={{flexDirection:'column',alignItems:'center',flex:0.25 }} >
                <MaterialCommunityIcons name="message-processing-outline" size={20}  color="gray"/>
                <Text>Nhắn tin</Text>
            </TouchableOpacity>
            <View style={{ flex:0.5,flexDirection:"row",justifyContent:'flex-end' }}>
                <TouchableOpacity style={{ backgroundColor:'red',borderRadius:15,padding:10,alignItems:'center',marginRight:10,flex:1 }}>
                    <Text style={{ color:'white',fontWeight:'bold' }}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderItemproductype = ({item, index})=>{
            let star1 = 0;
            let quantytiReview1 = 0;
            if(item.reviewStar == null){
                star1 = 5;
            }else{
                quantytiReview1 = item.quanityReview;
                star1= item.reviewStar;
            }
            // console.log(star1)
        return(
            <View style={styles.itemCart}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <TouchableOpacity 
                    onPress={()=>
                        {
                            props.navigation.replace('productDetail',{
                            idProduct : item.id,
                            idProductType : item.idProductType
                                
                        });
                    }}
                >
                <View style={styles.viewItem}>
                    <Image source={{ uri: SetHTTP(item.image) }}
                        resizeMode='cover' 
                        style={{ width: windowW*0.55, height: windowH*0.45,}} />
                </View>
                </TouchableOpacity>
                <View style={styles.viewItem}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{truncate(item.name)}</Text>
                </View>
                {item.promotional > 0 ? 
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 30,marginTop: 7 }}>
                <Text style={{ color: 'red',fontSize: 13, fontWeight:'bold' }}>{FormatNumber(item.promotional)} đ</Text>
                <Text style={{color: 'grey', textDecorationLine: 'line-through', marginLeft: 15  }}>{FormatNumber(item.price)} đ</Text>
                <Text style={{ color: 'red', fontSize: 16, marginLeft :15, backgroundColor: '#D3D3D3', borderRadius: 20}}>  -{100-(Math.round((item.promotional*100)/item.price))}%  </Text>
                </View>:
                <>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 30,marginTop: 7 }}>
                <Text style={{ color: 'red',fontSize: 13, fontWeight:'bold' }}>{FormatNumber(item.price)} đ</Text>
                </View>
                </>}
                <View style={styles.viewItemStar}>
                <Star score={star1} style={{width:80,height:15, marginLeft : 5}}/> 
                 <Text style = {{ marginLeft :5 }}>({quantytiReview1} đánh giá)</Text>
                </View>
                
            </View>
        )

    }
    return(
            <View style={{ flex: 1 }}>
                <HeaderScreen navigation={navigation} textsearch={textsearch} hideSearch={false} heightHeader={windowH*0.07} colorSearch={colorSearch} bgWhite={bgHeader}/>
                {!isLoading && !isLoading1? 
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
                            {checkPromotional == null ? 
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
                            {isFavourite ?
                                <TouchableOpacity style={{ paddingRight:10 }} onPress={()=>{ setisFavourite(!isFavourite) }}>
                                  
                                    <View>
                                        <LottieView  
                                            source={require('../../assets/lottierfiles/ccc.json')}
                                            style={{ width:40, height:40}}
                                            autoPlay
                                            loop                   
                                        />
                                    </View>
                                    
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ paddingRight:10 }} onPress={()=>{ setisFavourite(!isFavourite) }}>
                                    <View>
                                        <LottieView  
                                            source={require('../../assets/lottierfiles/hearts-loading.json')}
                                            style={{ width:40, height:40,marginRight:5}}
                                            autoPlay
                                            loop                   
                                        />
                                    </View>
                                </TouchableOpacity>
                                }
                                    
                           
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
                        <View style={{ marginTop : 5, borderBottomWidth: 1, borderBottomColor: "#D3D3D3"}}>
                            <View style={{ marginTop : 5, marginHorizontal : 15 }}>
                                <Text>CHI TIẾT SẢN PHẨM</Text>
                                <RenderHtml
                                    contentWidth={windowW}
                                    source={description}
                                />
                            </View>
                        </View>
                            <Text style={{ marginTop: 10 , marginLeft: 15, color: 'red'}}>SẢN PHẨM ĐỀ XUẤT </Text>
                                <View style={styles.CarouselCart}>

                                    <Carousel                  
                                        layout={"stack"}
                                        activeSlideOffset={5}
                                        data={DataProductType}
                                        sliderWidth={windowW*0.9}
                                        itemWidth={windowW*0.9}
                                        callbackOffsetMargin={20}
                                        layoutCardOffset={24}
                                        renderItem={renderItemproductype}
                                        loop={true}
                                    />
                                
                                </View>
                    </ScrollView>
                    <ViewOrder />
                </>:
                <View style={{ flex:1, justifyContent: 'center', alignContent: 'center' }}>
                <LoadingCircle/>
                </View>
                }
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
        borderBottomWidth: 0,
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
    },
    itemCart:{
        backgroundColor:'white',
        borderRadius: 5,
        height: windowH*0.6,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
        borderWidth: 0.4,
        borderColor: 'red'
    },
    CarouselCart:{flex:1,
                    marginTop : 10, 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems:'center',
                    alignContent:'center',  
                    height: windowH*0.7
    },
    viewItem:{
            flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    viewItemStar:{
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 15
    },
    wrapperBottom:{
        borderTopColor:'gray',
        borderTopWidth:0.2,
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        position:'absolute',
        width:'100%',
        alignItems:'center',
        bottom:0,
        height:50,
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
    },
    verticleLine: {
        height: '80%',
        width: 1,
        backgroundColor: '#808080',
    }

})