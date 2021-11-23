
import {API_URL} from "@env"
export const SetHTTP = (urlImage)=>{
    if(urlImage.includes('http')){
        return urlImage
    }else{
        return API_URL+urlImage
    }
}

