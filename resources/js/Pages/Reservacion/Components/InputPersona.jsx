import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import PrimaryButton from "@/Components/PrimaryButton"

export default function InputPersona({data,setData,errors,precioValor,formaPagos}) {
  return (
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
                                    disabled
                                   
                                  />
                                  </InputLabel>
                                  {errors.totalPagar && <div className="text-red-500">{errors.totalPagar}</div>}
                                 
                
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
                                      required
                                    />
                                    </InputLabel>
                                   
                                    {errors.observacion && <div className="text-red-500">{errors.observacion}</div>}
                                  </div>
                                 </div>
    
                                
                                  </div>
                          
  )
}
