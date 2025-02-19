
//
import MainHtml from '@/Components/MainHtml';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import ReservacionHuespede from './ReservacionHuespede';
import { usePage,Head,useForm,router} from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import { fechaFormato_dmy,dateTimeToDate } from '../Helper/help';



const ReservacionIndex = () => {
    const { reservaciones,precios,flash,auth,formaPagos,rangoFechas } = usePage().props;
    const {data,setData,proccesing,errors}=useForm({
       fecha_entrada:rangoFechas[0],
       fecha_salida:rangoFechas[1],

    })
    const {links}=reservaciones
    console.log(usePage().props)

    const getDataOnClick=(e)=>{

      e.preventDefault()
       console.log(data)
       router.get(route('reservaciones.index',data),{
        onSuccess:()=>{
          console.log('onSuccess')
        },
        
       }) 






    }




    

   


    return (
      <Authenticated
       user={auth.user}
       header="Reservaciones"
        >

      <Head title="Reservaciones" />
      <MainHtml>
       <>
         <div className="flex justify-between">
        <div>
          <PrimaryButton className='bg-green-500'>Crear Reservación</PrimaryButton>

        </div>
       
           
          </div>  
          <div className='flex mt-2 gap-2 '>

          <div className='w-full'>
            <InputLabel>Fecha Entrada</InputLabel>
            <input type='date' className='w-full border border-green-400 rounded-md ' value={data.fecha_entrada}
            onChange={e=>setData('fecha_entrada',e.target.value)}
            />

          </div>
          <div className='w-full'>
            <InputLabel>Fecha Salida</InputLabel>
            <input type='date' className='w-full border border-green-400 rounded-md ' value={data.fecha_salida}
          onChange={e=>setData('fecha_salida',e.target.value)}

          />
          </div>  
          <div>
          <InputLabel>Buscar </InputLabel>
            <PrimaryButton className='bg-green-500 py-3'
            onClick={getDataOnClick}
            >Enviar</PrimaryButton>
          </div>

         
         </div>      

         <div className='w-full mt-4'>

            <table className='w-full border-collapse border border-green-400  border-rounded-md  '>
             <thead className='bg-green-300 border-collapse border border-gray-300 rounded-md'>
            <tr>
            <th  className='border border-collapse rounded-md  py-2 '>id</th>
            <th className='border border-collapse  rounded-md  '>Nro Reservacion</th>
            <th className='border border-collapse  rounded-md  '>Nro Personas</th>
            <th className='border border-collapse  rounded-md ' >Cedula</th>
            <th className='border border-collapse  rounded-md '>Nombre</th>
            <th className='border border-collapse  rounded-md  '>Fecha Entrada</th>
            <th className='border border-collapse  rounded-md  '>Fecha Salida</th>
            <th className='border border-collapse  rounded-md  '>
              $ Pago
            </th>
             <th>Editar</th>
             


            </tr>
             </thead>
             <tbody>
            {
              reservaciones.data.length > 0 ? (
                reservaciones.data.map((reservacion, index) => (
               <tr key={reservacion.id} className='border border-collapse rounded-md'>
                 <td className='border border-collapse rounded-md py-2 '>{reservacion.id}</td>
                 <td className='border border-collapse rounded-md '>{reservacion.nro_reservacion}</td>
                 <td className='border border-collapse rounded-md '>{reservacion.nro_personas}</td>
                 <td>{`${reservacion.huespede.nacionalidad}-${reservacion.huespede.cedula}`}</td>
                 <td className='border border-collapse rounded-md '>{`${reservacion.huespede.nombre} ${reservacion.huespede.apellidos} `}</td>
                 <td className='border border-collapse rounded-md '>{fechaFormato_dmy(dateTimeToDate(reservacion.fecha_entrada))}</td>
                 <td className='border border-collapse rounded-md '>{fechaFormato_dmy(dateTimeToDate(reservacion.fecha_salida))}</td>
                 <td className='border border-collapse rounded-md '>{reservacion.monto}</td>
                 <td className='justify-center text-center items-center'><PrimaryButton className='bg-yellow-500 '>Editar</PrimaryButton></td>
               </tr>
                ))
              ) : (
                <tr>
               <td colSpan="6" className='border border-collapse rounded-md py-2 text-center'>No reservations found</td>
                </tr>
              )
             
            }
             </tbody>

            </table> 
          <div><Pagination links={links.map(link => {
            if (link.url) {
              link.url += `&fecha_entrada=${data.fecha_entrada}&fecha_salida=${data.fecha_salida}`;
            }
            return link;
          })} /></div> 

          </div>     
        
          
       </>
      </MainHtml>

      </Authenticated>  
        )
};

export default ReservacionIndex;

