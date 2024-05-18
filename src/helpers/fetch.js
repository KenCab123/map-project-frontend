const API = 'https://data.cityofnewyork.us/resource/5ucz-vwe8.json'


export function getShootings(borough){
    if(borough){
        return fetch(`${API}?boro=${borough.toUpperCase()}`)
        .then((res)=> res.json())
    }else{
       return fetch(`${API}`)
        .then((res)=> res.json())
    }
}