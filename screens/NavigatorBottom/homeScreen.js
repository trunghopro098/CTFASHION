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

export default function HomeScreen({navigation}){
    const [bgcolorStatusBar, setbgcolorStatusBar] = useState("#764FE2");
    const [colorSearch, setcolorSearch] = useState(null);
    const [DataProducthot, setDataproducthost] = useState([]);
    const [DataProductFlashsale, setDataProductFlashsale] = useState([]);
    const [Datacategory, setDatacategory] = useState([]);
    const [bgHeader, setbgHeader] = useState(false);
    const [textsearch, settextsearch] = useState('');
    const [DataProductNew, setDataProductNew] = useState([]);//data hiển thị sản phẩm mới nhất trong box
    const [DataProductNewImageSlideBox, setDataProductNewImageSlideBox] = useState([]);//hình ảnh hiển thị lên slide
    const [DataProductNewSlideBox, setDataProductNewSlideBox] = useState([]);//data khi click vào slider
    const [Datafullproduct, setDatafullproduct] = useState([])


    const arr = [
        {
        name: "áo cà xa "
       },
       {
        name: "Quần sa tăng "
       },
       {
        name: "mủ ngộ không "
       },
       {
        name: "Bụng trư bát giới "
       },
]
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
        // handleProduct();
        getDataBox();
        getDatafullProduct();
        const interval = setInterval(()=>{
            // console.log(arr.length);
            const random = Math.floor((Math.random()*arr.length));
            settextsearch(arr[random].name)
        },6000);


        return () => {cleanup(interval)}

        
    }, [])

const handleProduct = async()=>{
    try {
     // get 3 san phaam khuyen mai mhieuf nhaats
    const getProductSale = await GETAPI.getAPI('/product/getTopProductSale');
    setDataproducthost(getProductSale);
    // get san pham khuyn mai
    const getdatasale = await GETAPI.getAPI('/product/getproductSale');
    setDataProductFlashsale(getdatasale) 
    // get category
    const getCategory = await GETAPI.getAPI('/product/getCategory');
    setDatacategory(getCategory)

        
    } catch (error) {
        console.log(error)
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
                {/* <SkeletonContent 
                animationDirection={"horizontalRight"}
                    isLoading={true}

                 > */}
                    <Animated.View style={{
                                    transform:[{translateY:translateY}], 
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    right:0,
                                    zIndex:1
                                    }} >
                    
                        <HeaderScreen navigation={navigation} textsearch={textsearch} colorSearch={colorSearch} bgWhite={bgHeader}/>
                    </Animated.View>
                
                    <VirtualizedView setValue={handleSetValueScrollY}>      
                        <CategoryScreen Data={Datacategory} />
                        <ProductHot Data={DataProducthot}/>
                        <Flashsales Data={DataProductFlashsale}/>
                        <ProductNew images ={DataProductNewImageSlideBox} Data = {DataProductNewSlideBox} navigation={navigation} DataNewproduct= {DataProductNew}/>
                        <GetfullProduct DatafullProduct={Datafullproduct}/>
                        <Test2/>
                        <Test2/>
                        <Test2/>
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

