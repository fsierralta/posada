import MainHtml from '@/Components/MainHtml';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { fechaFormato_dmy,dateTimeToDate } from '../Helper/help';
import { usePage, Head, useForm, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';


export default function ReservacionesConfirmadas() {
    const {reservaciones,auth}=(usePage().props);
    const {data,links}=reservaciones
    const {pago_huespedes}=data
    const {fecha_inicio,fecha_final}=route().params

     const goBack=(e)=>{
      e.preventDefault()
      router.get(route('reservaciones.index'),{
        fecha_entrada:fecha_inicio,
        fecha_salida:fecha_final
      })
      }    
  return (
    <Authenticated
      user={auth.user}
      header={'Reservaciones Confirmadas con hospedaje'}

    >
       <Head title='Reservaciones Confirmadas con hospedaje'/>
       <MainHtml>
       <div>Reservaciones Confirmadas</div>
       <div>
         <PrimaryButton
          className='mb-4'
          onClick={goBack}
         >
            Regresar
         </PrimaryButton>
       </div>
       <div className='overflow-x-auto mt-4'>
          <table  
           className="w-full border-collapse border border-green-400 border-rounded-md min-w-[800px]"
          >
             <thead
               className="bg-green-300 border-collapse border border-gray-300 rounded-md"
             >
              <tr  className='bg-green-400' >
                <th  className="border border-collapse rounded-md py-2">Id</th>
                <th className="border border-collapse rounded-md">Nro Reservacion</th>
                <th className="border border-collapse rounded-md">F. Entrada</th>
                <th className="border border-collapse rounded-md">F. Salida</th>
                <th className="border border-collapse rounded-md">Huespede</th>
                <th className="border border-collapse rounded-md">Monto </th>
                <th className="border border-collapse rounded-md">Residuo</th>
                <th className="border border-collapse rounded-md">Cabaña</th>
                <th className="border border-collapse rounded-md">Pago</th>
              </tr> 
             </thead>
             <tbody>
                 {data ?(
                    data.map((item,idx)=>(
                      <tr key={item.id}
                        className="border border-collapse rounded-md"
                      >
                        <td className="border border-collapse rounded-md py-2">{item.id}</td>
                        <td className="border border-collapse rounded-md py-2">{item.nro_reservacion}</td>
                        <td className="border border-collapse rounded-md py-2">{fechaFormato_dmy(dateTimeToDate(item.fecha_entrada))}</td>
                        <td className="border border-collapse rounded-md py-2">{fechaFormato_dmy(dateTimeToDate(item.fecha_salida))}</td>
                        <td className="border border-collapse rounded-md py-2">{`${item.huespede.nombre} ${item.huespede.apellidos}`}</td>
                        <td className="border border-collapse rounded-md py-2">{item.monto_original}</td>
                        <td className="border border-collapse rounded-md py-2">{item.monto}</td>
                        <td className="border border-collapse rounded-md py-2">{item.posadas[0].nombre}</td>
                        <td className="border border-collapse rounded-md py-2">
                            {item.pago_huespedes.length > 0 ? (
                              <ul>
                                {item.pago_huespedes.map((pago) => (
                                  <li key={pago.id} className='text-sm text-blue-500 font-bold'>
                                    {`Monto: ${pago.monto}, Fecha: ${pago.fechapago}, Ref: ${pago.referencia}`}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              'Sin pagos'
                            )}
                    </td>
                    </tr>

                    ))
                    
                 ):
                   (<p>No hay Data</p>)  
                 }
              
             </tbody>
             <tfoot>
               <tr>
                 <td colSpan={5}>
                   Datos 
                 </td>
               </tr>
             </tfoot>

          </table>
          <div>  
               <Pagination links={links}/>
           </div>
       </div>

       </MainHtml>

        
    </Authenticated>
    

  )
}
  