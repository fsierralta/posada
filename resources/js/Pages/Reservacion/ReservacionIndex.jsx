import MainHtml from '@/Components/MainHtml';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import { usePage, Head, useForm, router } from '@inertiajs/react';
import ReservacionTable from '@/Components/Reservacion/ReservacionTable';
import { use, useEffect } from 'react';
import axios from 'axios';
const ReservacionIndex = () => {
  const { reservaciones, auth, rangoFechas,flash,nroCabana } = usePage().props;
  const { data, setData } = useForm({
    fecha_entrada: rangoFechas[0],
    fecha_salida: rangoFechas[1],
  });
  console.log(reservaciones)
  const { links } = reservaciones;

  const getDataOnClick = (e) => {
    e.preventDefault();
    router.get(route('reservaciones.index', data), {
      onSuccess: () => {
        console.log('onSuccess');
      },
    });
  };

  const createReservacion = (e) => {
    e.preventDefault();
    router.get(route('reservaciones.create'), { rangoFechas });
  };

  

  return (
    <Authenticated user={auth.user} header="Reservaciones">
      <Head title="Reservaciones" />
      <MainHtml>
        <>
        <div className='mt-2 bg-green-400 w-full py-2 rounded-md'>
              {flash?.message ?<p>{flash.message}</p>:<p>{`Resevaciones en rango de fecha`}</p>}


        </div>
          <div className="flex justify-between">
            
            <div className='mt-2'>
              <PrimaryButton className="bg-green-500" onClick={createReservacion}>
                Crear Reservación
              </PrimaryButton>
            </div>
          </div>
          <div className="flex mt-2 gap-2">
            <div className="w-full">
              <InputLabel>Fecha Entrada</InputLabel>
              <input
                type="date"
                className="w-full border border-green-400 rounded-md"
                value={data.fecha_entrada}
                onChange={(e) => setData('fecha_entrada', e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputLabel>Fecha Salida</InputLabel>
              <input
                type="date"
                className="w-full border border-green-400 rounded-md"
                value={data.fecha_salida}
                onChange={(e) => setData('fecha_salida', e.target.value)}
              />
            </div>
            <div>
              <InputLabel>Buscar </InputLabel>
              <PrimaryButton className="bg-green-500 py-3" onClick={getDataOnClick}>
                Enviar
              </PrimaryButton>
            </div>
          </div>
           {reservaciones.data.length>0 ?(
                  <div>
                 < ReservacionTable reservaciones={reservaciones} data={data} links={links} />
                     <div>{`Cantida de Resevaciones en este PAGINA:${nroCabana}`}</div> 
                </div>):(
          <h1>no hay data</h1>
                )
              }     
          
        </>
      </MainHtml>
    </Authenticated>
  );
};

export default ReservacionIndex;

