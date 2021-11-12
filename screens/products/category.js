import React from 'react';
import { View, Text, StyleSheet ,Image,Dimensions, FlatList,TouchableOpacity } from 'react-native';
import { SetHTTP } from '../../util/setHTTP';
import LinearGradient from 'react-native-linear-gradient';
import { LoadingSkeletonCategory } from '../StartScreens/loadingSkeleton';
export default function CategoryScreen(props){
 const data = props.Data;
 const renderitem = ({item})=>{
        return(
        <View style={styles.item}>
            <TouchableOpacity onPress={()=>{console.log("xin chaof")}}>
            <View style={styles.itemImage}>
                <Image
                    source={{uri :SetHTTP(item.logo) }} 
                    resizeMode='contain'
                    style={{ width : 30, height : 30}}
                />
            </View>
            <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        </View>
        )
    }

    return(
        <View>
            {data.length===0 || data==undefined ? 
            <><LoadingSkeletonCategory/></>:
            <>
            <LinearGradient
                 colors={['#9C30FF',"#C790E5"]}
                style= {styles.container}>
                    {/* <Text style={{color : 'white',fontWeight : 'bold', marginLeft: 10 }}>DANH MỤC SẢN PHẨM</Text> */}
                <FlatList
                    horizontal 
                    data= {data}
                    keyExtractor={item=>item.id}
                    renderItem={renderitem}
                />
        </LinearGradient>
            </>}
        </View>
        

    )
}

const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        backgroundColor : "#764FE2",
        height : windowH*0.15,
        borderWidth: 0
    },
    itemImage:{
        width : 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        margin : 5,
        alignContent : 'center',
        padding:10
    },
    item:{
        alignContent : 'center',
        marginHorizontal : 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems :'center',
        
    },
    text:{
        color : 'white',
        fontWeight : 'bold',
        textAlign: 'center',
        fontSize: 11

    }
})