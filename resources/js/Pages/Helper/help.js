/* 
    @param fecha: string "2021-09-01"
    @return string "01-09-2021"
 */
function fechaFormato_dmy(fecha){
    const fechaArray=fecha.split('-')
    if( fechaArray.length>0){
       return `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
    }else {
        return fecha 

    }


   
}

/* 
 @param datetime: string "2021-09-01 12:00:00"
    @return string "2021-09-01"

 */
function dateTimeToDate(datetime){
    const fechaArray=datetime.split(' ')
    return (fechaArray[0])


}

/* 
 @param id: 1
 @param precios: [{id:1,precio:100},{   id:2,precio}]
 @return 100


 */
function findPrecio(id,precios){
    console.log(precios,id)
     const precio=precios.find( (item)=> item.id===parseInt(id))
     console.log('data',precio)
    return precio.id ? parseFloat(precio.precio) :0  
     


   


}

export {
    fechaFormato_dmy,
    findPrecio,
    dateTimeToDate

}
