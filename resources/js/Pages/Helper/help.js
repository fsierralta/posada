function fechaFormato_dmy(fecha){
    const fechaArray=fecha.split('-')
    if( fechaArray.length>0){
       return `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
    }else {
        return fecha 

    }


   
}

export {
    fechaFormato_dmy,

}
