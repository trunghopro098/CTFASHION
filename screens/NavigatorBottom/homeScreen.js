import React,{useState,useEffect,} from "react";
import { SafeAreaView,StyleSheet,StatusBar,Animated,Dimensions,View} from "react-native"; 
// import SkeletonContent from "react-native-skeleton-content";
import HeaderScreen from "./headerScreen";
import CategoryScreen from "../products/category";
import VirtualizedView from "../../util/VirtualizedView";
import ProductHot from "../products/productHot";
import ProductNew from "../products/productNew";
import GetfullProduct from "../products/getfullProduct";
import Test2 from "../products/test2";
import Flashsales from "../products/flashsale";
import * as GETAPI from '../../util/fetchApi';
import { SetHTTP } from "../../util/setHTTP";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({navigation}){
    const [bgcolorStatusBar, setbgcolorStatusBar] = useState("#764FE2");
    const [colorSearch, setcolorSearch] = useState(null);
    const [DataProducthot, setDataproducthost] = useState([]);
    const [DataProductFlashsale, setDataProductFlashsale] = useState([]);
    const [Datacategory, setDatacategory] = useState([]);
    const [bgHeader, setbgHeader] = useState(false);
    const [textsearch, settextsearch] = useState('CTFASHION WELCOME !!!');
    const [DataProductNew, setDataProductNew] = useState([]);//data hiển thị sản phẩm mới nhất trong box
    const [DataProductNewImageSlideBox, setDataProductNewImageSlideBox] = useState([]);//hình ảnh hiển thị lên slide
    const [DataProductNewSlideBox, setDataProductNewSlideBox] = useState([]);//data khi click vào slider
    const [Datafullproduct, setDatafullproduct] = useState([])
    //Animation header
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY,0,50);
    const translateY = diffClamp.interpolate({
        inputRange:[0,50],
        outputRange:[0,-50]
    })

    useEffect(() => {
        getCategory();
        getProductSale();
        getdatasale();
        getDataBox();
        getDatafullProduct();
        getHistory();      
    }, [])

        const getHistory = async()=>{
            const history = await AsyncStorage.getItem('SEARCHHISTORY');
            console.log(typeof(history))
            if(history!==null){
                const arrH = JSON.parse(history)
                if(arrH.length !== 0){
                    console.log('aaaa')
                    const interval = setInterval(()=>{
                        const random = Math.floor((Math.random()*arrH.length));
                        settextsearch(arrH[random].name)
                        // console.log(arrH[random].name)
                    },5000);
                    return () => {cleanup(interval)}                   
                }
                
            }
        }

    const getProductSale= async()=>{    
        const res = await GETAPI.getAPI('/product/getTopProductSale');
        setDataproducthost(res);

    }
    const getdatasale= async()=>{
        const res = await GETAPI.getAPI('/product/getproductSale')
        setDataProductFlashsale(res) 
    }
    const getCategory = async()=>{
        const res = await GETAPI.getAPI('/product/getCategory');
        setDatacategory(res)
    }
    const getDataBox = async()=>{
        const ArrDtaImage = [];
        const ArrDtaProductImage = [];
        const ArrProductNew = [];
        const res = await GETAPI.getAPI('/product/getProductNew/1');
        console.log("duc rooif")

        // lấy 4 sản phẩm đầu tiên
        for(let i = 0; i <= 4; i++){
            ArrDtaProductImage.push(res.item[i])
            ArrDtaImage.push(SetHTTP(res.item[i].image))
        }
        // lấy 3 sản phẩm sau cùng
        for(let j = 5; j <= res.item.length-1; j++){
            ArrProductNew.push(res.item[j])
        }
        // console.log(ArrProductNew)
        setDataProductNewImageSlideBox(ArrDtaImage)
        setDataProductNew(ArrProductNew)
        setDataProductNewSlideBox(ArrDtaProductImage)
        
    }

    const getDatafullProduct = async()=>{
        const res = await GETAPI.getAPI('/product/getFullProduct');
        // console.log(res)
        setDatafullproduct(res)
    }



    //Animation header
    const handleSetValueScrollY = (e)=>{
        const value = e.nativeEvent.contentOffset.y;
        if(value<0){
          scrollY.setValue(0)
        }else{
            if(value>windowH*0.9){
                setbgcolorStatusBar("white")
                setcolorSearch("white")
                setbgHeader(true)
            }else{
                setbgcolorStatusBar("#764FE2")
                setcolorSearch(null)
                setbgHeader(false) 
            }
            scrollY.setValue(value)
        } 
    }
  
    return(
            <SafeAreaView style= {{ flex: 1 }}>
               
                 {/* barStyle="dark-content" */}
                <StatusBar  backgroundColor={bgcolorStatusBar} 
                            animated 
                            barStyle={bgcolorStatusBar=="white"?"dark-content":null}/>
                    <Animated.View style={{
                                    transform:[{translateY:translateY}], 
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    right:0,
                                    zIndex:1
                                    }} >
                    
                        <HeaderScreen navigation={navigation} textsearch={textsearch} hideSearch={true} heightHeader={windowH*0.145} colorSearch={colorSearch} bgWhite={bgHeader}/>
                    </Animated.View>
                
                    <VirtualizedView setValue={handleSetValueScrollY}>      
                        <CategoryScreen Data={Datacategory} />
                        <ProductHot Data={DataProducthot} navigation={navigation}/>
                        <Flashsales Data={DataProductFlashsale} navigation={navigation}/>
                        <ProductNew images ={DataProductNewImageSlideBox} Data = {DataProductNewSlideBox} navigation={navigation} DataNewproduct= {DataProductNew}/>
                        <GetfullProduct DatafullProduct={Datafullproduct} navigation={navigation}/>

                    </VirtualizedView>
                {/* </SkeletonContent> */}
            </SafeAreaView>

    )
    
}
const windowH = Dimensions.get('window').height;

const styles = StyleSheet.create({
    fakebox:{
        height : 250,
        margin : 16,
        borderRadius:18
    },
    scroll_view:{
        flex:1
    },
    
})

