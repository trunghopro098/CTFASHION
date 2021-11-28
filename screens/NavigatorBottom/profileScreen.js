import React,{useEffect, useState}from "react";
import { View, Text,Button, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity, Alert} from "react-native"; 
import { useDispatch } from "react-redux";
import {updateUser} from '../../redux/reducer/user.reducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import * as GETAPI from '../../util/fetchApi';
import { FormatNumber } from "../../util/formatNumber";
import Login from '../StartScreens/login';

const DisplayBill =(props)=>{
    const Data = props.Data;
    return(
        <View style={{ marginHorizontal: 10,marginTop: 5 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent:'flex-start',
                alignContent: 'center',
                alignItems:'center'                   
             }}>
                <Text style={{ fontWeight:'bold', color: 'black', fontSize: 12, marginRight: 1, borderRightWidth: 0.5,width: windowW*0.15,textAlign:'center',maxWidth: windowW*0.15,borderBottomWidth:0.5, borderBottomColor: 'purple', borderRightColor:'purple' }}>Mã ĐH</Text>
                <Text style={{ fontWeight:'bold', color: 'black', fontSize: 12, marginRight: 1, borderRightWidth: 0.5,width: windowW*0.23,textAlign:'center',maxWidth: windowW*0.23,borderBottomWidth:0.5, borderBottomColor: 'purple', borderRightColor:'purple'  }}>Tổng Tiền</Text>
                <Text style={{ fontWeight:'bold', color: 'black', fontSize: 12, marginRight: 1, borderRightWidth: 0.5,width: windowW*0.23 ,textAlign:'center',maxWidth: windowW*0.23,borderBottomWidth:0.5, borderBottomColor: 'purple', borderRightColor:'purple' }}>Tình Trạng</Text>
                <Text style={{ fontWeight:'bold', color: 'black', fontSize: 12, marginRight: 1, borderRightWidth: 0.5,width: windowW*0.15 ,textAlign:'center',maxWidth: windowW*0.15,borderBottomWidth:0.5, borderBottomColor: 'purple', borderRightColor:'purple' }}>Chi Tiết</Text>
                <Text style={{ fontWeight:'bold', color: 'black', fontSize: 12, marginRight: 1, width: windowW*0.21,textAlign:'center',maxWidth: windowW*0.16,borderBottomWidth:0.5, borderBottomColor: 'purple', borderRightColor:'purple'  }}>Ngày Đăt </Text>
            </View>
                 <ScrollView>

                     {Data.map(Data=>{
                         
                         return(
                             <View key={Data.id} 
                             style={{
                                flexDirection: 'row',
                                justifyContent:'flex-start',
                   
                             }}>
                                <Text style={{...styles.TextBill,width: windowW*0.15,maxWidth: windowW*0.15,}}
                                 >#{Data.id}</Text>
                                <Text style={{ ...styles.TextBill,width: windowW*0.23,maxWidth: windowW*0.23, textAlign:'right',paddingRight:5 }}>{FormatNumber(Data.total_price)} đ</Text>
                                <Text style={{...styles.TextBill, color: (Data.status==0) ? 'blue':(Data.status)==1?'green':(Data.status==2)?'black':'red',
                                                     width: windowW*0.23,maxWidth: windowW*0.23, textAlign:'center'}}>
                                                {(Data.status==0) ? 'Đang xử lý':(Data.status)==1?'Đang Giao Hàng':(Data.status==2)?'Đã Hoàn Thành':'Đã Hủy'}
                                    </Text>
                                    <TouchableOpacity style={{
                                                    color: 'black', 
                                                fontSize: 12,
                                                marginRight: 1,
                                                borderRightWidth: 0.5,
                                                width: windowW*0.15 ,
                                                flexDirection:'row',
                                                alignContent:'center', 
                                                alignItems:'center',
                                                justifyContent:'center',
                                                maxWidth: windowW*0.15,
                                                borderBottomWidth:0.5, 
                                                borderBottomColor: 'purple',
                                                borderRightColor:'purple' }}>
                                                <Image source={require('../../assets/icons/eye100px.png')} resizeMode="cover"
                                                    style={{width: 25, height: 25}}/>
                                    </TouchableOpacity>
                                
                                <Text style={{ 
                                            ...styles.TextBill,
                                            width: windowW*0.15,
                                            maxWidth: windowW*0.15, 
                                            fontSize: 11, width: windowW*0.21,
                                            textAlign:'center',
                                            maxWidth: windowW*0.16 }}>
                                        {Data.create_at.substring(0, 10)} 
                                </Text>
                             </View>
                         )
                     })}
                 </ScrollView>   
        </View>
    )
}
export default function ProfileScreen (props,{navigation}){
    const currentUser = useSelector(state=>state.userReducer.currentUser);
    const dispatch = useDispatch();
    const [Seleted, setSeleted] = useState(false);
    const [dataBill, setdataBill] = useState([]);
    const [DXL, setDXL] = useState([]);
    const [DGH, setDGH] = useState([]);
    const [DTT, setDTT] = useState([]);
    const [DH, setDH] = useState([]);
    const [Datainf, setDatainf] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        if(currentUser !== null){
            getBill()
            getInforUser()
        }

    },[])

    const getBill = async()=>{
        let arrDGH=[];
        let arrDTT=[];
        let arrDXL=[];
        let arrDH=[];
        const res = await GETAPI.postDataAPI('/order/getBillByIdUser',{'idUser': currentUser.id})
        if(res.length > 0){
            setdataBill(res);
            for(let i = 0; i < res.length; i++){
                if(res[i].status==0){
                   arrDXL.push(res[i]);
                } 
                else if (res[i].status==1){
                    arrDGH.push(res[i]);
                }else if (res[i].status==2){
                    arrDTT.push(res[i]);
                }else{
                    arrDH.push(res[i]);
                }
            }
            console.log(arrDXL)
            setDXL(arrDXL);
            setDGH(arrDGH);
            setDTT(arrDTT);
            setDH(arrDH);
        }
        
    }
    const getInforUser =async()=>{
        const res = await GETAPI.postDataAPI('/user/getInforUser',{'idUser': currentUser.id});
        if(res!==null){
            console.log(res)
            setDatainf(res)
            setisLoading(false);  
        }
     
    }


    const handleLogout = ()=>{
        AsyncStorage.removeItem("@token")
        dispatch(updateUser({}))
    }


    return(
        <View style= {styles.container}>
            <View style={styles.header}>
                    <Text style={{ marginLeft: 15, color: 'black', fontWeight: 'bold' }}>Thông tin tài khoản</Text>
            </View>
            <ScrollView>
            {currentUser.id!==undefined?
                    <View>
                        <View style={{
                            flex: 1,
                            padding: 10,
                            flexDirection:'row',
                            justifyContent: 'flex-start',
                            marginTop: 10,
                            borderBottomWidth: 0.5,
                            borderBottomColor: 'purple',
                            marginBottom: 5
                        }}>                     
                            <Image source={require('../../assets/image/profilenet.jpg')} resizeMode="cover"
                                style={{width: 60, height: 60, borderColor: 'red', borderWidth: 0.5, borderRadius: 50}}/>
                                <View style={{             
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                    }}>
                                    
                                        <Text style={{
                                            marginLeft: 15,
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}>{currentUser.name}</Text>
                                        
                                        <View style={{             
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        marginTop: 7,
                                    }}>
                                            <Image source={require('../../assets/icons/edit_user_100px.png')} resizeMode="cover"
                                            style={{width: 16, height: 16, marginLeft :15}}/>
                                            <Text style={{ color:'grey', marginLeft: 10,fontSize: 10 }}>Chỉnh sửa thông tin cá nhân</Text>
                                        </View>
                                </View> 

                        </View>
                        
                            <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Thông Tin Tài Khoản</Text>
                            {isLoading ? null :
                                    <View style={{ 
                                        flexDirection: 'column',
                                        padding: 15
                                    }}>
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                marginBottom: 5
                                            }}>
                                                <Text style={{ fontWeight: 'bold', width: windowW*0.18 }}>Họ Tên : </Text>
                                                 {Datainf[0].name !=null ? <Text>{Datainf[0].name} </Text>: null}
                                            </View>
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                marginBottom: 5
                                            }}>
                                                <Text style={{ fontWeight: 'bold', width: windowW*0.18 }}>Địa chỉ : </Text>
                                                {Datainf[0].address !=null ? <Text style={{ maxWidth: windowW*0.78 }}>{Datainf[0].address}</Text>: null}
                                                
                                            </View>
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                marginBottom: 5
                                            }}>
                                                <Text style={{ fontWeight: 'bold', width: windowW*0.18 }}>SDT : </Text>
                                                {Datainf[0].phone !=null  ? <Text style={{ maxWidth: windowW*0.8 }}>{Datainf[0].phone} </Text>: null}
                                                
                                            </View>
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                marginBottom: 5
                                            }}>
                                                <Text style={{ fontWeight: 'bold' , width: windowW*0.18}}>Email : </Text>
                                                {Datainf[0].email !=null  ? <Text style={{ maxWidth: windowW*0.8 }}>{Datainf[0].email}  </Text>: null}
                                                
                                            </View>
                                    </View>
                                 }
                            <View style={{ flexDirection: 'row',justifyContent: 'space-between', paddingRight: 15, marginBottom: 5}}>
                                <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10, marginBottom: 5 }}>Đơn Hàng Của Tôi</Text>
                                    {Seleted?
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent:'center', alignItems: 'center' }}
                                                      onPress={()=>{setSeleted(false)}}>
                                            <Image source={require('../../assets/icons/check.png')} resizeMode="cover"
                                            style={{width: 16, height: 16, marginLeft :15, marginRight: 10}}/>
                                            <Text>ẩn đơn hàng</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent:'center', alignItems: 'center' }}
                                                      onPress={()=>{setSeleted(true)}}>
                                            <Image source={require('../../assets/icons/uncheck.png')} resizeMode="cover"
                                            style={{width: 16, height: 16, marginLeft :15, marginRight: 10}}/>
                                            <Text>Xem tất cả</Text>
                                    </TouchableOpacity> }
                                 
                            </View>
                            

                            <ScrollView
                             horizontal={true}
                             style={{ paddingBottom: 8 , marginRight: 15}}
                             >
                                <TouchableOpacity onPress={()=>{setSeleted(true)}} style={{...styles.billinfor, marginLeft: 8,backgroundColor: Seleted==true?'pink':null}}>
                                    <Text style={{ color: 'black' }}>Tất cả</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setSeleted(2)}} style={{...styles.billinfor,backgroundColor: Seleted==2?'pink':null }}>
                                    <Text style={{ color: 'black' }}>Đang Xử lý</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setSeleted(3)}} style={{...styles.billinfor,backgroundColor: Seleted==3?'pink':null }}>
                                    <Text style={{ color: 'black' }}>Đang Giao Hàng </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setSeleted(4)}} style={{...styles.billinfor,backgroundColor: Seleted==4?'pink':null }}>
                                    <Text style={{ color: 'black' }}>Đã Thanh Toán</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setSeleted(5)}} style={{...styles.billinfor,backgroundColor: Seleted==5?'pink':null }}>
                                    <Text style={{ color: 'black' }}>Đã Hủy </Text>
                                </TouchableOpacity>
                            </ScrollView>
                                {Seleted == true ? 
                                    <View>
                                        {dataBill.length ==0 ?
                                             <View style={styles.datanull}>
                                                 <Text style={{ alignItems:'center', fontSize: 14 }}>BẠN KHÔNG CÓ ĐƠN HÀNG NÀO</Text>
                                            </View>:
                                            <DisplayBill Data={dataBill}/>}
                                    </View>: null}

                                {Seleted == 2 ?
                                    <View>
                                    {DXL.length ==0 ?
                                        <View style={styles.datanull}>
                                            <Text style={{ alignItems:'center', fontSize: 14 }}>BẠN KHÔNG CÓ ĐƠN HÀNG NÀO</Text>
                                        </View>:
                                        <DisplayBill Data={DXL}/>}
                                    </View>: null}

                                {Seleted == 3 ? 
                                    <View>
                                    {DGH.length ==0 ?
                                        <View style={styles.datanull}>
                                            <Text style={{ alignItems:'center', fontSize: 14 }}>BẠN KHÔNG CÓ ĐƠN HÀNG NÀO</Text>
                                        </View>:
                                        <DisplayBill Data={DGH}/>}
                                    </View>: null}

                                {Seleted == 4 ?
                                    <View>
                                    {DTT.length ==0 ?
                                        <View style={styles.datanull}>
                                            <Text style={{ alignItems:'center', fontSize: 14 }}>BẠN KHÔNG CÓ ĐƠN HÀNG NÀO</Text>
                                        </View>:
                                        <DisplayBill Data={DTT}/>}
                                    </View>: null}
                                {Seleted == 5 ? 
                                    <View>
                                    {DH.length ==0 ?
                                        <View style={styles.datanull}>
                                            <Text style={{ alignItems:'center', fontSize: 14 }}>BẠN KHÔNG CÓ ĐƠN HÀNG NÀO</Text>
                                        </View>:
                                        <DisplayBill Data={DH}/>}
                                    </View>: null}
                            <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Quản Lý Tài Khoản</Text>
                            
                            <View style={{ flexDirection:'column' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image source={require('../../assets/icons/settings_52px.png')} resizeMode="cover"
                                    style={{width: 20, height: 20,marginLeft: 15,marginTop: 5 }}/>
                                    <Text style={{ 
                                            color: 'grey',
                                            marginLeft: 10,
                                            marginTop: 5
                                            }}>
                                                Cập nhật thông tin tài khoản
                                    </Text>
                                </TouchableOpacity>
  
                                <TouchableOpacity 
                                    onPress={()=>{
                                    Alert.alert('CTFASHION','Bạn muốn đăng xuất !!!',[
                                        {
                                            text: 'Cancel',
                                            style:'cancel'
                                        },
                                        {
                                            text: "Ok",
                                            onPress:()=>{handleLogout()
                                                    }
                                            }
                                        ])
                                    }} 
                                    style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                                    >
                                     <Image source={require('../../assets/icons/shutdown_48px.png')} resizeMode="cover"
                                    style={{width: 20, height: 20,marginLeft: 15,marginTop: 5 }}/>
                                    <Text style={{ 
                                        color: 'red',
                                        marginLeft: 10,
                                        marginTop:5
                                        }}>
                                            Đăng Xuất
                                    </Text>
                                </TouchableOpacity>
                            </View>
                     </View>
                    :
                    <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', marginTop: windowH*0.40 }}>
                        <Text style={{ color: 'red', fontWeight:'bold', textAlign:'center'}}>ĐĂNG NHẬP ĐỂ NHẬN ĐƯỢC NHIỀU ƯU ĐÃI TỪ CTFASHION!!</Text>
                        <TouchableOpacity 
                            onPress={()=>props.navigation.navigate("login")}
                            style={{width: 140, height: 40 , backgroundColor:'green',flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}
                        >
                            <Text style={{ color: 'white', fontWeight:'bold', textAlign:'center'}}>ĐĂNG NHẬP NGAY</Text>

                        </TouchableOpacity>
                        
                    </View>
                    }   
            </ScrollView>

        </View>
    )
   
}

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
 const styles = StyleSheet.create({
     container: {
         flex: 1
     },
     header:{
         flexDirection:'row',
         justifyContent: 'flex-start',
         height : 45,
         alignContent: 'center',
         alignItems: 'center',
         backgroundColor: 'white'
     },
     billinfor:{ 
        width:80,
        height: 40,
        borderColor: 'purple',
        borderWidth: 0.5,
        marginLeft: 7,
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        borderRadius: 10,
     },
     TextBill:{ 
         color: 'black',
        fontSize: 12,
        marginRight: 1,
        borderRightWidth:0.5,
        textAlign:'center',
        borderBottomWidth:0.5,
        borderBottomColor: 'purple',
        borderRightColor:'purple'
        },
        datanull:{
            flexDirection:'row',
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
        }

 })