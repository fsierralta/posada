import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import PrimaryButton from "@/Components/PrimaryButton"

export default function InputDatosPersonales({data,setData,errors,onGetHupespede}) {
  return (
    <div className="mt-8">
      <hr />
      {/* Agrupa los campos principales en un grid responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
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
        <div>
          <InputLabel>{`Cédula`}
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
        <div className="flex items-end">
          <PrimaryButton className='w-full' onClick={onGetHupespede}>
            Buscar
          </PrimaryButton>
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
            className="w-full"
          />
        </div>
        <div>
          <InputLabel>
            Apellidos
          </InputLabel>
          <TextInput
            name='apellidos'
            type="text"
            value={data.apellidos}
            onChange={e => setData('apellidos', e.target.value)}
            required
            className="w-full"
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
            required
          />
          {errors?.nacimiento &&<div className='text-red-500'>{errors.nacimiento}</div>}
        </div>
      </div>
      {/* Agrupa los campos secundarios en otro grid responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div>
          <InputLabel>
            Email
          </InputLabel>
          <TextInput 
            type="email"
            name="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="w-full"
            required
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div>
          <InputLabel>
            Celular
          </InputLabel>  
          <TextInput
            type="text"
            name="celular"
            value={data.celular}
            onChange={e => setData('celular', e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <InputLabel>
            Procedencia
          </InputLabel>
          <TextInput
            type="text"
            name="procedencia"
            value={data.procedencia}
            onChange={e => setData('procedencia', e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <InputLabel>
            Profesión
          </InputLabel>
          <TextInput
            type="text"
            name="profesion"
            value={data.profesion}
            onChange={e => setData('profesion', e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>
    </div>
  )
}