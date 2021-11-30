// import {API_URL} from "@env"
API_URL  = 'http://192.168.43.41:5000'
export const getAPI = async(url)=>{
    // console.log(API_URL)
    const res = await fetch(API_URL+url)
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    })
    .catch((err)=>{
        console.log(err)
    })
    return res;
}
export const postDataAPI = async(url,data)=>{
    const res = await fetch(API_URL+url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    }
    )
    .catch((err)=>{
      console.log(err)
    })
    return res;
}