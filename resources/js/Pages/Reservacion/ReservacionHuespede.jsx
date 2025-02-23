import MainHtml from '@/Components/MainHtml'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm,router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { findPrecio,sumarDias,fechaFormato_dmy,toISOStringDate } from '../Helper/help'
import InputLabel from '@/Components/InputLabel'
import { useEffect } from 'react'




export default function ReservacionHuespede({auth,precios,formaPagos,rangoFechas,backRangoFechas}) {
    const {data,setData,proccesing,errors}=useForm({
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
        ceular:'',
        proviene:'',
        profesion:''

      })
      console.log(backRangoFechas)

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
  useEffect(()=>{
    data.dias_estadias && onUpdateFechaSalida()
  },[data.dias_estadias])
  return (
    <Authenticated
      user={auth.user}
      header={'Reservaciones'}
    >
        <MainHtml>
             <form>
                     {/*  
                        fecha y precios
                     
                      */}
                      <div className='md:flex   gap-2 '>
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
                              value={data.fecha_salida}
                              onChange={e=>setData('fecha-salida',e.target.value)}
                              className='w-full'
                              disabled
            
            
            
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
                      {/* 
                        calculo de tarifa    
                       */} 
                      <div className='flex gap-2 mt-2 ' >
                            <div className=''>
                              <InputLabel>Nro Personas
                              <TextInput
                                type='number'
                                name='nro_personas'
                                value={data.nro_personas}
                                onChange={e => setData('nro_personas', e.target.value)}
                                required
                                min="1"
                                max="100"
                                className=''
                              />
                              </InputLabel>
                             
                              {errors.nro_personas && <div className="text-red-500">{errors.nro_personas}</div>}
                            </div>
                            <div className=''>
            
                              <InputLabel>Cabaña Reservar
                              <TextInput
                                type='number'
                                name='cantidad_cabana_reservadas'
                                value={data.cantidad_cabana_reservadas}
                                onChange={e => setData('cantidad_cabana_reservadas', e.target.value)}
                                required
                                min="1"
                                max="9"
                                className=''
                              />
                              </InputLabel>
                             
                              {errors.cantidad_cabana_reservadas && <div className="text-red-500">{errors.cantidad_cabana_reservadas}</div>}
                            </div>
            
                            <div className=''>
                              <InputLabel>Total a Pagar
                              <TextInput
                                type='number'
                                name='totalPagar'
                                step="0.01"
                                value={data.totalPagar}
                                className=''
                               //onChange={e => setData('totalPagar', e.target.value)}
                                readonly
                               
                              />
                              </InputLabel>
                             
            
                            </div>
                            
                            <div className=''>
                                <InputLabel>Calcular Pago</InputLabel> 
                                    <PrimaryButton className='py-3 w-full'
                                       onClick={precioValor}
                                    >Calcular</PrimaryButton>
                             </div>
                             <div className=''>
                                <InputLabel>Forma de Pago
                                <select
                                  name="pago_id"
                                  value={data.pago_id}
                                  onChange={e => setData('pago_id', e.target.value)}
                                  className="rounded-md "

                                >
                                  <option value="">Forma de pago</option>
                                  {formaPagos.map(formaPago => (
                                    <option key={formaPago.id} value={formaPago.id}>
                                      {formaPago.nombre}
                                    </option>
                                  ))}
                                </select>
                                </InputLabel>
                               
                                {errors.pago_id && <div className="text-red-500">{errors.pago_id}</div>}
            
                             </div>
                             <div >
                               
                              <div className=''>
                                <InputLabel>Observación:
                                <TextInput
                                  type='text'
                                  name='observacion'
                                  value={data.observacion}
                                  onChange={e => setData('observacion', e.target.value)}
                                  className=''
                                />
                                </InputLabel>
                               
                                {errors.observacion && <div className="text-red-500">{errors.observacion}</div>}
                              </div>
                             </div>

                            
                      </div>
                      


                        {/* 
                           formulario del huespede
                           
                         */}
                        <div className='flex gap-2 mt-4 '>
                            <div>
                                      <InputLabel>Nacionalidad
                                        <select
                                          name="nacionalidad"
                                          value={data.nacionalidad}
                                          onChange={e => setData('nacionalidad', e.target.value)}
                                          className="rounded-md w-full"
                                        >
                                          <option value="V">Venezolano</option>
                                          <option value="E">Extranjero</option>
                                        </select>
                                      </InputLabel>
                                      {errors.nacionalidad && <div className="text-red-500">{errors.nacionalidad}</div>}
                            </div>
                            <div className=''>
                                <InputLabel>Cédula
                                  <TextInput
                                    type='text'
                                    name='cedula'
                                    value={data.cedula}
                                    placeholder="nro"
                                    onChange={e => setData('cedula', e.target.value)}
                                    className='w-full'
                                    required
                                  />
                                </InputLabel>
                                {errors.cedula && <div className="text-red-500">{errors.cedula}</div>}
                            </div>
                            <div>
                              <InputLabel>
                                Realizar
                                </InputLabel>
                              <PrimaryButton className='' >Buscar</PrimaryButton>
                               
                              
                            </div>
                            <div>
                              <InputLabel>
                                  Nombre

                              </InputLabel>
                              <TextInput
                                 name='nombre'
                                 value={data.nombre}
                                 onChange={e=>setData('nombre',e.target.value) }
                                 required
                              />
                            </div>
                            <div className=''>
                            <InputLabel>
                              Apellidos
                            </InputLabel>
                            <TextInput
                              name='apellidos'
                              value={data.apellidos}
                                onChange={e => setData('apellidos', e.target.value)}
                                required
                            />
                            </div>
                            <div>
                                  <InputLabel>
                                    Fecha de Nacimiento
                                  </InputLabel>
                                  <TextInput
                                    type='date'
                                    name='nacimiento'
                                    value={data.nacimiento}
                                    onChange={e => setData('nacimiento', e.target.value)}
                                    className='w-full'
                                  />

                            </div>

                        </div>
                      
                       {/*---------------------------  
                         acciones del usuario 
                      */}
                     <div className='flex  gap-2 mt-4'>
                           <div>
                                <PrimaryButton className='bg-green-400'>Enviar Reservación</PrimaryButton>
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
