import React,{useState} from "react";
import { View,Text,StyleSheet, Dimensions,TouchableOpacity,TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check } from "../../util/checkProduct";
export default function SearchScreen({ navigation }){

const [searhHistory, setsearhHistory] = useState('');


    const addhistory = async()=>{
        let arrHistorySearch = [];
        const getArrAsync = await AsyncStorage.getItem('SEARCHHISTORY');
        console.log("asd")
        if(getArrAsync == null){
            arrHistorySearch = [{name: searhHistory}]
            console.log("ddeens dday roi")
        }else{
            console.log("den eles")
            const add = [{name: searhHistory}]
            arrHistorySearch= add.concat(arrHistorySearch)
        }
        await AsyncStorage.setItem('SEARCHHISTORY',JSON.stringify(arrHistorySearch))
        console.log("xong rồi")
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
            <Text style={{ marginTop: 6, marginLeft : 15 }}>Search</Text>
            </View>
        <View style={{...style.search1}}>
        <View style={style.input} >
            <TouchableOpacity>
            {/* Nhấn vào input  hoặc button cho nhảy sang trang search */}
                <TextInput  
                    style={{ ...style.textinput}} 
                    
                    placeholder={'Search'}
                    value = {searhHistory}
                    onChangeText={(value)=>setsearhHistory(value)} 
                />
                </TouchableOpacity>
                <LinearGradient 
                    colors={["#C790E5",'#9C30FF','#BEE6F0']}
                    style={style.search}
                >
                    <TouchableOpacity onPress={()=>{addhistory()}}>
                    <Text style= {{ color: 'white', fontSize: 12 }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
        </View>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

const style = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    input:{
        justifyContent: "space-between",
        flexDirection:"row",
        height : windowH*0.059,
        width : windowW*0.9,
        borderWidth : 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius : 50,
        marginTop : 10,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,
        },
    textinput:{
        flex:1,
        paddingLeft: 15,
        textAlign:"left",
        marginLeft: 8,
        backgroundColor : 'white',
        height : windowH*0.05,
        width : windowW*0.60,
        borderTopLeftRadius : 50,
        borderBottomLeftRadius:50,
        fontSize: 12,
       
    },
    search:{
        marginRight:3,
        marginBottom:1,
        backgroundColor : "red",
        height : windowH*0.05,
        width : windowW*0.25,
        borderRadius :50,
        marginTop : 2,
        textAlign: "center",
        justifyContent : "center",
        alignContent : "center",
        alignItems:"center"
    },
    header:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingRight : 15,
        paddingTop:10,
        paddingBottom:10
    },
    search1:{
        justifyContent : "center",
        alignContent : "center",
        alignItems:"center",
        paddingBottom:10,
        // borderBottomWidth: 1,
        // borderColor: "#9999"
    },
    label:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        marginLeft:10,
        marginTop:5 
    },
    header:{
        height: 32,
        backgroundColor: 'white',
        margin: 1,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity:0.5,
        elevation:1
        

    }
})