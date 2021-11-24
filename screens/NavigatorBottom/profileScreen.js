import React,{useEffect}from "react";
import { View, Text,Button} from "react-native"; 
import { useDispatch } from "react-redux";
import {updateUser} from '../../redux/reducer/user.reducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
export default function ProfileScreen ({navigation}){
    const currentUser = useSelector(state=>state.userReducer.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(currentUser)
    },[])
    const handleLogout = ()=>{
        AsyncStorage.removeItem("@token")
        dispatch(updateUser({}))
    }
    return(
        <View>
            {currentUser.id!==undefined?
            <View>
                <Text style={{ marginBottom:20 }}>
                    {currentUser.name}
                </Text>
                <Button 
                    onPress={handleLogout}
                    title="Đăng xuất"
                />
            </View>
            :
            <View>
                <Button 
                    title="Đăng nhập"
                    onPress={()=>navigation.navigate("login")}
                />
            </View>
            }   
        </View>
    )
   
}

