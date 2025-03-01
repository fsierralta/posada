
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

/**
 * Añade un número especificado de días a una fecha dada.
 *
 * @param {string|Date} fechaActual - La fecha inicial.
 * @param {number} dias - El número de días a añadir.
 * @returns {Date} La nueva fecha con los días añadidos.
 */
function sumarDias(fechaActual, dias) {
    // Creamos una copia de la fecha para no modificar la original
    const year_month_day=fechaActual.split('-')
    console.log(`fecha recibida: ${fechaActual}+${dias}`)
    const fecha = new Date(        parseInt(year_month_day[0]),
                                   parseInt(year_month_day[1]-1),
                                   parseInt(year_month_day[2]))
                                   ;
    
    // Sumamos los días utilizando setDate()
    fecha.setDate(fecha.getDate() + parseInt(dias));
    console.log(fecha)
    return `${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2,"0")}-${fecha.getDate().toString().padStart(2,"0")}`;
  }


  function toISOStringDate(fecha=new Date()){
    fecha=restarAnios(fecha,18);
    return fecha.toISOString().split('T')[0]

  }

  /**
 * Resta un número especificado de años a una fecha dada.
 *
 * @param {Date} fecha - La fecha inicial.
 * @param {number} anios - El número de años a restar.
 * @returns {Date} La nueva fecha con los años restados.
 */
function restarAnios(fecha, anios) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - anios);
    return nuevaFecha;
}

export {
    fechaFormato_dmy,
    findPrecio,
    dateTimeToDate,
    sumarDias,
    toISOStringDate

}
