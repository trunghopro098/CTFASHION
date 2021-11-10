
// import {API_URL} from "@env"
export const SetHTTP = (urlImage)=>{
    if(urlImage.includes('http')){
        return urlImage
    }else{
        return "http://192.168.43.41:5000"+urlImage
    }
}