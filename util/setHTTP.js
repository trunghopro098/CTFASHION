
// import {API_URL} from "@env"
API_URL  = 'http://192.168.43.41:5000'
export const SetHTTP = (urlImage)=>{
    if(urlImage.includes('http')){
        return urlImage
    }else{
        return API_URL+urlImage
    }
}

