import InputLabel  from "@/Components/InputLabel"
import TextInput  from "@/Components/TextInput"

InputLabel
function DatoHuespedes({posada,huespede,fichaRegistroH}) {
  return (
    <>
    <div>
    <InputLabel
      htmlFor="posadanombre"                       
        value={"Nombre Posada"}
       
    />
    <TextInput
       type="text"
       defaultValue={posada.nombre}
       name='posadanombre'
       disabled={true}
    />
  </div>
  <div className=" flex grid-cols-3 space-x-2 mt-2">
   <div>
  <InputLabel
      htmlFor="cedula"                       
        value={"Cedula"}
       
    />
    <TextInput
       type="text"
       defaultValue={`${huespede.nacionalidad}${huespede.cedula}`}
       name='cedula'
       className="font-bold"
       disabled
    />
   
    
    </div>
    <div className="block w-full" >
           <InputLabel
           htmlFor="nroficha"                       
               value={"Nro Ficha"}
               
           />
           <TextInput
               type="text"
               defaultValue={`${fichaRegistroH.nroficha}`}
               name='nroficha'
               className="w-full font-bold"
               disabled={true}
               
               
           />
          

    </div>
    
                       
    <div className="block w-full" >
           <InputLabel
           htmlFor="nombreHuespedes"                       
               value={"Nombre Huespede"}
               
           />
           <TextInput
               type="text"
               defaultValue={`${huespede.nombre}${huespede.apellidos}`}
               name='nombrehuespedes'
               className="w-full font-bold"
               disabled={true}
               
               
           />
          

    </div>

  </div>
  <div className="mt-2 flex   space-x-2  ">
           <div className="">
                   <InputLabel
                       htmlFor="fechaEntrada"
                       value={"Fecha Entrada"}

                   
                   />
                   <TextInput
                       type="date"
                       required
                       name="fechaEntrada"
                      defaultValue={fichaRegistroH.fechaEntrada}
                      disabled
                     
                   
                   />
                      
           </div>

       
           <div className="">
                   <InputLabel
                           htmlFor="fechaSalida"
                           value={"Fecha Salida"}
                           

                       
                       />
                       <TextInput
                           type="date"
                           required
                           name="fechaSalida"
                           defaultValue={`${fichaRegistroH.fechaSalida}`}
                           disabled
                           
                       
                       />
                       
           </div>

  </div>

    
  </>

  ) 
}

export default DatoHuespedes