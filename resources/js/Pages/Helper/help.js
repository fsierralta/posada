import Mensaje from "@/Components/Mensaje";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

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


  function toISOStringDate(fecha=new Date(),year=0){
    
     if(year===0) {
        fecha=restarAnios(fecha,18);
        return fecha.toISOString().split('T')[0] 


  }else {
    fecha=restarAnios(fecha,0);
    return fecha.toISOString().split('T')[0] 
  }
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
    console.log("restar año a esta fecha",nuevaFecha)
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - anios);
    return nuevaFecha;
}



/**
 * Fetches data for a guest based on their ID (cedula).
 *
 * @param {string} cedula - The ID of the guest to fetch data for.
 * @returns {Promise<Object>} A promise that resolves to an object containing either the guest data or an error.
 * @property {Object|null} data - The guest data if the request was successful, otherwise null.
 * @property {string|null} error - The error message if the request failed, otherwise null.
 */
const getDataHuespede=async(cedula)=>{
    //e.preventDefault()
    try {
        let response=await axios.get(route('registrohuespedecedula.get',cedula))

        if (response.status===200){
        // console.log(response)
         
         return {data:response.data.dataHuespede,
                 error:null
                }
         
      }
      //console.log(response)
       
   } catch (error) {
       console.log(error.response.data.dataHuespede) 
       return {data:null,
               error:error.response.data.dataHuespede}
     
      
   }
 }

 //---------------
 function mostrarToast(mensaje){
    const notify=()=>toast.error(mensaje)
    return notify()


 }

function diasDeEstadia(fecha_salida,fecha_entrada){

    return Math.ceil((new Date(fecha_salida) - new Date(fecha_entrada)) / (1000 * 60 * 60 * 24))
}

export {
    fechaFormato_dmy,
    findPrecio,
    dateTimeToDate,
    sumarDias,
    toISOStringDate,
    getDataHuespede,
    mostrarToast,
    diasDeEstadia


}


let date=new Date();
