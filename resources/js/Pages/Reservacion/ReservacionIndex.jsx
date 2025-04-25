import MainHtml from '@/Components/MainHtml';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import { usePage, Head, useForm, router } from '@inertiajs/react';
import ReservacionTable from '@/Components/Reservacion/ReservacionTable';
import { useEffect } from 'react';
import axios from 'axios';

const ReservacionIndex = () => {
  const { reservaciones, auth, rangoFechas, flash, nroCabana } = usePage().props;
  const { data, setData } = useForm({
    fecha_entrada: rangoFechas[0],
    fecha_salida: rangoFechas[1],
  });
  const { links } = reservaciones ? reservaciones : [];

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
            {flash?.message ? <p>{flash.message}</p> : <p>{`Resevaciones en rango de fecha`}</p>}
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
            <div>
              <PrimaryButton className="bg-green-500 w-full md:w-auto" onClick={createReservacion}>
                Crear Reservación
              </PrimaryButton>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-2 gap-2">
            <div className="w-full md:w-1/3">
              <InputLabel>Fecha Entrada</InputLabel>
              <input
                type="date"
                className="w-full border border-green-400 rounded-md"
                value={data.fecha_entrada}
                onChange={(e) => setData('fecha_entrada', e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <InputLabel>Fecha Salida</InputLabel>
              <input
                type="date"
                className="w-full border border-green-400 rounded-md"
                value={data.fecha_salida}
                onChange={(e) => setData('fecha_salida', e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/6 flex items-end">
              <PrimaryButton className="bg-green-500 py-3 w-full" onClick={getDataOnClick}>
                Enviar
              </PrimaryButton>
            </div>
          </div>
          {reservaciones !== null ? (
            reservaciones.data.length > 0 ? (
              <div className="mt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
                <ReservacionTable reservaciones={reservaciones} data={data} links={links} />
                <div className="mt-2 text-sm text-gray-700">{`Cantidad de Reservaciones en esta página: ${nroCabana}`}</div>
              </div>
            ) : (
              <h1 className="mt-4 text-center text-gray-500">No hay data</h1>
            )
          ) : (
            <h1 className="mt-4 text-center text-gray-500">No hay data</h1>
          )}
        </>
      </MainHtml>
    </Authenticated>
  );
};

export default ReservacionIndex;

