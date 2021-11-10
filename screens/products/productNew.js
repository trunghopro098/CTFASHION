import React from "react";
import {View, Text, StyleSheet,Dimensions, Image,TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from "react-native-linear-gradient";
import Label, {Orientation} from "react-native-label";
import { SetHTTP } from "../../util/setHTTP";
export default function ProductNew(props,{navigation}){
    const dataImage = props.Data
    const dataNewProduct = props.DataNewproduct


    const renderitem = (item)=>{
        return(
            <TouchableOpacity key={item.id} style={styles.wrapperitemProductNew}>
                <View  >
                    <Image 
                        source={{ uri:SetHTTP(item.image)}} 
                        resizeMode='contain'
                        style={{ width : windowW*0.2, height : windowH*0.1 ,borderRadius:20}}
                    />
                </View>
                <View style={{ flex:1 }} >
                    <Text style={{ fontSize:12 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    } 

    return(

        <View style={styles.container}>
            <View style = {{ ...styles.box,backgroundColor:'#E7E9EB'}}> 
            <SliderBox
                sliderBoxHeight={windowH*0.4}
                parentWidth={windowW*0.475}            
                images={props.images}
                onCurrentImagePressed={index => {
                    props.navigation.navigate('productDetail',{
                        data : dataImage[index]
                    });
                   console.log(dataImage[index])
                    console.log(dataImage[index].id)
                }}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                // paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
        />
            </View>
                <View style =  {{ ...styles.box,backgroundColor:'#E7E9EB' }}> 
                 
                    {/* <FlatList
                        data={dataNewProduct}
                        keyExtractor= {item=>item.id}
                        renderItem={renderitem}
                    /> */}
                    {dataNewProduct!==undefined &&
                        dataNewProduct.map(e=>{
                            return(
                                renderitem(e)
                            )
                        })
                    }
                </View>
        
        </View>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        height: windowH*0.43,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-around",

    },
    box:{
        width: windowW*0.475,
        height: windowH*0.4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4,
        elevation: 4,
        borderRadius: 5,
        justifyContent: "center",
        alignContent:"center",
        alignItems:"center",
        padding:5
    },
    wrapperitemProductNew:{
        flex:1,
        width: windowW*0.44,
        flexDirection: "row",
        backgroundColor:"white",
        margin:5,
        padding:5,
        borderRadius:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    }
})