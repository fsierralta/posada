import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"


export default function InputFecha({data,errors,setData,precios}) {
  return (
    <div className='md:flex gap-2'>
                                      <div className='w-full'>
                                      <InputLabel>Fecha Entrada</InputLabel>
                              
                                      <TextInput 
                                        type='Date'
                                        name='fecha_entrada'
                                        value={data.fecha_entrada}
                                        className='w-full'
                                        onChange={e => setData('fecha_entrada', e.target.value)}
                                        required
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
                                      {errors.dias_estadias && <div className="text-red-500">{errors.dias_estadias}</div>}
                                      </div>
                                      <div className='w-full'>
                                      <InputLabel>Fecha Salida</InputLabel>
                              
                                      <TextInput 
                                        type='Date'
                                        name='fecha_salida'
                                        value={data.fecha_salida}
                                        onChange={e => setData('fecha-salida', e.target.value)}
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
  )
}
