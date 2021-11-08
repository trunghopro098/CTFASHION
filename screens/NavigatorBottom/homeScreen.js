import React,{useState} from "react";
import { SafeAreaView,StyleSheet,StatusBar,Animated,Dimensions} from "react-native"; 
import HeaderScreen from "./headerScreen";
import CategoryScreen from "../products/category";
import VirtualizedView from "../../util/VirtualizedView";
import ProductHot from "../products/productHot";
import Test2 from "../products/test2";
import Flashsales from "../products/flashsale";

export default function HomeScreen({navigation}){
    const [bgcolorStatusBar, setbgcolorStatusBar] = useState("#764FE2");
    const [colorSearch, setcolorSearch] = useState(null);
    
    //Animation header
    const scrollY = new Animated.Value(0);
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
        }else{
            setbgcolorStatusBar("#764FE2")
            setcolorSearch(null)
        }
        if(value<0){
          scrollY.setValue(0)
        }else{
          scrollY.setValue(value)
        } 
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
                    <HeaderScreen navigation={navigation} colorSearch={colorSearch}/>
                </Animated.View>
                <VirtualizedView setValue={handleSetValueScrollY}>           
                    <CategoryScreen/>
                    <ProductHot/>
                    <Flashsales/>
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

