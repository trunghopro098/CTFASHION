import React from "react";
import { View, Text, SafeAreaView,StyleSheet, Dimensions,Image, ScrollView} from "react-native"; 
import CollapsingHeader from "../products/test";
import HeaderScreen from "./headerScreen";
import CategoryScreen from "../products/category";
import VirtualizedView from "../../util/VirtualizedView";
import ProductHot from "../products/productHot";
import Test2 from "../products/test2";
import Flashsales from "../products/flashsale";

export default function HomeScreen({navigation}){


    return(

            <SafeAreaView style= {{ flex: 1 }}>
                <HeaderScreen navigation={navigation}/>
                <VirtualizedView>           
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

