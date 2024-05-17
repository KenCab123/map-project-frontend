export function changeColor(percentage){
    // Takes in a percentage intege
    if(percentage < 10){
        return '#FFCBD1'
    }else if(percentage >=10 && percentage < 20){
        return '#EE6B6E'
    }else if(percentage >=20 && percentage < 30){
        return '#FF2C2C'
    }else if(percentage >=30){
        return '#D1001F'
    }
  
}

