import MainHtml from '@/Components/MainHtml'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm,router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { findPrecio,sumarDias,fechaFormato_dmy,toISOStringDate } from '../Helper/help'
import InputLabel from '@/Components/InputLabel'
import { useEffect } from 'react'
import { getDataHuespede,mostrarToast } from '../Helper/help'
import { ToastContainer,toast } from 'react-toastify'
import InputFecha from './Components/InputFecha'
import InputPersona from './Components/InputPersona'
import InputDatosPersonales from './Components/InputDatosPersonales'



export default function ReservacionHuespede({auth,precios,formaPagos,rangoFechas,backRangoFechas,errors,flash}) {
  
    const {data,setData,proccesing}=useForm({
        fecha_entrada:rangoFechas[0],
        fecha_salida:rangoFechas[1],
        dias_estadias:1,
        precio_id:0,
        nro_personas:1,
        cantidad_cabana_reservadas:1,
        totalPagar:0,
        pago_id:0,
        observacion:"",
        huespede_id:0,
        nacionalidad:'V',
        cedula:"",
        nombre:'',
        apellidos:'',
        nacimiento:toISOStringDate(new Date()),
        email:'',
        celular:'',
        procedencia:'Barquisimeto',
        profesion:'comerciante',
        aliado_id:0  //

      })
      console.log(backRangoFechas)
      flash?.message &&mostrarToast(flash.message)
       console.log(errors)  
      const precioValor=(e)=>{
              e.preventDefault()
               const precio=findPrecio(data.precio_id,precios)
               console.log(precio)
               if(precio>0){
                 const totap=parseInt(data.dias_estadias)*parseInt(data.nro_personas)*precio
                setData('totalPagar',totap)
               } else{
                setData('totalPagar',0)
               }
            } 
   const goBack=(e)=>{
    e.preventDefault()
    router.get(route('reservaciones.index'),{
      fecha_entrada:backRangoFechas[0],
      fecha_salida:backRangoFechas[1]
    })
    }         
  const onUpdateFechaSalida=()=>{
    const fechaupdate=sumarDias(data.fecha_entrada,data.dias_estadias)
    console.log(fechaupdate);
    setData("fecha_salida",sumarDias(data.fecha_entrada,data.dias_estadias))

  }
   //-
   const onGetHupespede=async(e)=>{
    e.preventDefault()
    const cedula=data.nacionalidad.concat(data.cedula)
    console.log(cedula)
    let  {data:getData,error:getError}=await getDataHuespede(cedula);
     console.log(getData)
     console.log(typeof(getError))
     if(getData!==null) {
        const { nombre, apellidos, nacimiento, profesion, email, celular } = getData

        setData({
          ...data,
          nombre,
          apellidos,
          nacimiento,
          profesion,
          email,
          celular
        })
      }
      if(getError){
         mostrarToast(getError)
            console.log(getError)
      }

   }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(data);

   router.post(route('reservaciones.store'),data,{
     onSuccess:()=>console.log('eviado'),
     onError:(error)=>console.log(error)
   })
  }
  useEffect(()=>{
    data.dias_estadias && onUpdateFechaSalida()
  },[data.dias_estadias])
  return (
    <Authenticated
      user={auth.user}
      header={'Reservaciones'}
    >
        <MainHtml>
              <div>
                <ToastContainer />
              </div>  

             <form onSubmit={handleSubmit}>
                        <div>
                           <InputFecha 
                                  data={data}
                                  precios={precios}
                                  setData={setData}
                                  errors={errors}

                                />
                         </div>       
                         <div>
                             <InputPersona
                               data={data}
                               precioValor={precioValor}
                               formaPagos={formaPagos}
                               setData={setData}
                               errors={errors}
                             />
                        </div>
 
                        <InputDatosPersonales
                           data={data}
                           setData={setData}
                           errors={errors}
                           onGetHupespede={onGetHupespede}
                         
                       />
                       {/*---------------------------  
                         acciones del usuario 
                      */}
                     <div className='flex  gap-2 mt-8'>
                           <div>
                                <PrimaryButton className='bg-green-400'
                                   disabled={proccesing}
                                   type="sumit"
                                >Enviar Reservación</PrimaryButton>
                           </div>
                           <div>
                                <PrimaryButton 
                                onClick={goBack}
                                >Regresar</PrimaryButton>
                           </div>

            
                     </div>
             </form>
        </MainHtml>
    </Authenticated>
  
  )
}
