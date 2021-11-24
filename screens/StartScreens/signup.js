import React from "react";
import {View, Text,StatusBar} from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import * as GETAPI from '../../util/fetchApi';

export default function SignUp (){
    return(
        <View>
            <StatusBar 
                backgroundColor="white"
                barStyle="dark-content"
                translucent={false}
            />
            <Text>Đây là đăng ký</Text>
        </View>
    )
}