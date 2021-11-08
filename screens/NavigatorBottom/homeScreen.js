import React,{useState,useEffect} from "react";
import { SafeAreaView,StyleSheet,StatusBar,Animated,Dimensions} from "react-native"; 
import HeaderScreen from "./headerScreen";
import CategoryScreen from "../products/category";
import VirtualizedView from "../../util/VirtualizedView";
import ProductHot from "../products/productHot";
import Test2 from "../products/test2";
import Flashsales from "../products/flashsale";
import GetfullProduct from "../products/getfullProduct";
import * as GETAPI from '../../util/fetchApi';
export default function HomeScreen(props){

    const [bgcolorStatusBar, setbgcolorStatusBar] = useState("#764FE2");
    const [colorSearch, setcolorSearch] = useState(null);

    const [DataProducthot, setDataproducthost] = useState([]);
    const [DataProductFlashsale, setDataProductFlashsale] = useState([]);
    const [Datacategory, setDatacategory] = useState([]);


    useEffect(() => {
        getCategory();
        getProductSale();
        getdatasale();
        console.log("ddang chay laij")
    }, [])

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
    const [bgHeader, setbgHeader] = useState(false);
    //Animation header
    const scrollY = new Animated.Value(0);
    // diffClamp nhanaj thay ddooir
    const diffClamp = Animated.diffClamp(scrollY,0,50);
    const translateY = diffClamp.interpolate({
        inputRange:[0,50],
        outputRange:[0,-50]
    })
    //Animation header
    const handleSetValueScrollY = (e)=>{
        const value = e.nativeEvent.contentOffset.y;
        if(value>80){
            setbgcolorStatusBar("white")
            setcolorSearch("white")
            setbgHeader(true)
            scrollY.setValue(value)
        }else{
            setbgcolorStatusBar("#764FE2")
            setcolorSearch(null)
            setbgHeader(false)
            scrollY.setValue(0)
        }
        // if(value<0){
        //   scrollY.setValue(0)
        // }else{
        //   scrollY.setValue(value)
        // } 
    }
  
    return(
            <SafeAreaView style= {{ flex: 1 }}>
                 {/* barStyle="dark-content" */}
                <StatusBar 
                    backgroundColor={bgcolorStatusBar} 
                    animated 
                    barStyle={bgcolorStatusBar=="white"?"dark-content":null}/>
                <Animated.View  
                    style={{
                        transform:[{translateY:translateY}], 
                        position:'absolute',
                        top:0,
                        left:0,
                        right:0,
                        zIndex:1
                    }} 
                >
                    <HeaderScreen navigation={props.navigation} colorSearch={colorSearch} bgWhite={bgHeader}/>
                </Animated.View>
                <VirtualizedView setValue={handleSetValueScrollY}>           
                    <CategoryScreen Data={Datacategory}/>
                    <ProductHot Data={DataProducthot}/>
                    <Flashsales Data={DataProductFlashsale}/>
                    {/* <GetfullProduct/> */}
                    <Test2/>
                    <Test2/>
                    <Test2/>
                </VirtualizedView>
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

