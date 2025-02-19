import MainHtml from '@/Components/MainHtml'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { findPrecio } from '../Helper/help'
import InputLabel from '@/Components/InputLabel'




export default function ReservacionHuespede({user,precios,formaPagos,rangoFechas}) {
    const {data,setData,proccesing,errors}=useForm({
        fecha_entrada:rangoFechas[0],
        fecha_salida:rangoFechas[1],
        dias_estadias:1,
        precio_id:0,
        nro_personas:1,
        cantidad_cabana_reservadas:1,
        totalPagar:0,
        pago_id:0,
      })

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

  return (
    <Authenticated
      user={user}
      header={'Reservaciones'}
    >
        <MainHtml>
             <form>
                      <div className='flex gap-2 '>
                          <div className='w-full'>
                            <InputLabel>Fecha Entrada</InputLabel>
            
                            <TextInput type='Date'
                              name='fecha_entrada'
                              value={data.fecha_entrada}
                              className='w-full'
                              onChange={e=>setData('fecha_entrada',e.target.value)}
            
            
            
                            />
            
                          </div>
                          <div className='w-full'>
                            <InputLabel>Días de Estadía</InputLabel>
                            <TextInput
                              type='number'
                              name='dias_estadias'
                              value={data.dias_estadias}
                              className='w-full'
                              onChange={e => setData('dias_estadias', e.target.value)}
                              required
                              min="1"
                              max="100"
                            />
                          </div>
                          <div className='w-full'>
                            <InputLabel>Fecha Salida</InputLabel>
            
                            <TextInput type='Date'
                              name='fecha_salida'
                              value={data.fecha_salidad}
                              onChange={e=>setData('fecha-salida',e.target.value)}
                              className='w-full'
            
            
            
                            />
            
                          </div>
                          <div className='w-full'>
                          <InputLabel>Precio</InputLabel>
                          <select
                            name="precio_id"
                            value={data.precio_id}
                            onChange={e => setData('precio_id', e.target.value)}
                            className="rounded-md w-full"
                          >
                            <option value="">Seleccione un precio</option>
                            {precios.map(precio => (
                              <option key={precio.id} value={precio.id}>
                                {precio.descripcion.substr(0,10)} - ${precio.precio}
                              </option>
                            ))}
                          </select>
                          {errors.precio_id && <div className="text-red-500">{errors.precio_id}</div>}
                          </div>
                          
                        </div>  
                        <div className='flex gap-2 mt-2'>
                            <div className='w-full'>
                              <InputLabel>Número de Personas</InputLabel>
                              <TextInput
                                type='number'
                                name='nro_personas'
                                value={data.nro_personas}
                                onChange={e => setData('nro_personas', e.target.value)}
                                required
                                min="1"
                                max="100"
                                className='w-full'
                              />
                              {errors.nro_personas && <div className="text-red-500">{errors.nro_personas}</div>}
                            </div>
                            <div className='w-full'>
            
                              <InputLabel>Nro de Cabañas a Reservar</InputLabel>
                              <TextInput
                                type='number'
                                name='cantidad_cabana_reservadas'
                                value={data.cantidad_cabana_reservadas}
                                onChange={e => setData('cantidad_cabana_reservadas', e.target.value)}
                                required
                                min="1"
                                max="9"
                                className='w-full'
                              />
                              {errors.cantidad_cabana_reservadas && <div className="text-red-500">{errors.cantidad_cabana_reservadas}</div>}
                            </div>
            
                            <div className='w-full'>
                              <InputLabel>Total a Pagar</InputLabel>
                              <TextInput
                                type='number'
                                name='totalPagar'
                                step="0.01"
                                value={data.totalPagar}
                                className='w-full'
                                onChange={e => setData('totalPagar', e.target.value)}
                               
                              />
            
                            </div>
                            
                            <div className='w-full'>
                                <InputLabel>Calcular Pago</InputLabel> 
                                    <PrimaryButton className='py-3 w-full'
                                       onClick={precioValor}
                                    >Calcular</PrimaryButton>
                             </div>
                             <div>
                                <InputLabel>Forma de Pago</InputLabel>
                                <select
                                  name="pago_id"
                                  value={data.pago_id}
                                  onChange={e => setData('pago_id', e.target.value)}
                                  className="rounded-md "
                                >
                                  <option value="">Seleccione una forma de pago</option>
                                  {formaPagos.map(formaPago => (
                                    <option key={formaPago.id} value={formaPago.id}>
                                      {formaPago.nombre}
                                    </option>
                                  ))}
                                </select>
                                {errors.pago_id && <div className="text-red-500">{errors.pago_id}</div>}
            
                             </div>
                            
                        </div>
                        
            
                        <div className='flex  gap-2 mt-4'>
                           <div>
                                <PrimaryButton className='bg-green-400'>Enviar Reservación</PrimaryButton>
                           </div>
            
                        </div>
             </form>
        </MainHtml>
    </Authenticated>
  
  )
}
