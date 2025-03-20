import Authenticated from '@/Layouts/AuthenticatedLayout';
import { usePage,useForm } from '@inertiajs/react';
import InputFecha from './Components/InputFecha';
import InputDatosPersonales from './Components/InputDatosPersonales';
import InputPersona from './Components/InputPersona';
import { useEffect } from 'react';
import MainHtml  from '@/Components/MainHtml';
import { ToastContainer } from 'react-toastify';
import PrimaryButton from '@/Components/PrimaryButton';
import { sumarDias,findPrecio,diasDeEstadia,getDataHuespede} from '../Helper/help';



export default function ReservacionEdit() {

    const{reservacion,precios,formaPagos,auth,flash,errors}=usePage().props;

    console.log(reservacion);
    //------------------
    const {data,setData,proccesing}=useForm({
        fecha_entrada:  reservacion.fecha_entrada.split(' ')[0],
        fecha_salida:reservacion.fecha_salida.split(' ')[0],
        dias_estadias: diasDeEstadia(reservacion.fecha_salida,reservacion.fecha_entrada),
        precio_id:1,
        nro_personas:reservacion.nro_personas,
        cantidad_cabana_reservadas:reservacion.cantidad_cabana_reservadas,
        totalPagar:reservacion.monto,
        pago_id:reservacion.formapago_id,
        observacion:reservacion.observacion,
        huespede_id:reservacion.huespede_id,
        nacionalidad:reservacion.huespede.nacionalidad,
        cedula:reservacion.huespede.cedula,
        nombre:reservacion.huespede.nombre,
        apellidos:reservacion.huespede.apellidos,
        nacimiento:reservacion.huespede.nacimiento,
        email:reservacion.huespede.email,
        celular:reservacion.huespede.celular,
        procedencia:'Barquisimeto',
        profesion:reservacion.huespede.profesion,
        aliado_id:reservacion.aliado_id  //

      })
      
      flash?.message &&mostrarToast(flash.message)
       

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
    let  {data:getData,error:getError}=await getDataHuespede(cedula);
    if(getData!==null) {
        const { nombre, apellidos, nacimiento, profesion, email, celular,id:huespede_id} = getData

        setData({
          ...data,
          nombre,
          apellidos,
          nacimiento,
          profesion,
          email,
          celular,
          huespede_id
        }
      )
   
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
      header={`Reservacion a Editar Nro:${reservacion.nro_reservacion}`}
     
     

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
