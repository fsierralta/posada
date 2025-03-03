import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MainHtml from '@/Components/MainHtml';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Mensaje from '@/Components/Mensaje';
import useDashboard from './HookCustom/useDashboard';

export default function Dashboard({ auth, flash, dataPosada, huespedesRegistrados }) {
   const {
    selectPosada,
    show,
    enviar,
    mostrar,
    mensaje,
    onClose,
    estatusPosada,
    seleccionada,
    onSelectPosada,
    onHoverMouseCabana,
    urlImg,
    alquilarPosada,
    registrarPago,
    estadoCta,
    registrarConsumo,
    darDeAlta,
    CajaShow,
    setMostrarMessage,
    setMensaje,
  } = useDashboard(dataPosada, huespedesRegistrados, flash); 

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <MainHtml>
        <div className="w-full h-6 my-6">
          {mostrar ? (
            <Mensaje mensaje={flash.message} setMostrar={setMostrarMessage} setMensaje={setMensaje} />
          ) : (
            <h1 className="bg-green-500 rounded-lg text-2xl block w-full my-4">Seleccione una Operación</h1>
          )}
        </div>
        {show && (
          <Modal show={show} onClose={onClose}>
            <div className="space-x-2">
              <div className="w-full">
                <span className="font-bold text-xl text-center block w-full bg-green-300">Desea</span>
              </div>
              <div className="flex justify-center space-x-2 py-6">
                <div>
                  <PrimaryButton name="enviar" value={true} onClick={onClose}>
                    Enviar
                  </PrimaryButton>
                </div>
                <div>
                  <SecondaryButton name="cancelar" value={false} onClick={onClose}>
                    Cancelar
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <div className="justify-center mx-auto flex flex-wrap gap-2 py-2 sm:mb-14 rounded-lg my-3 space-x-2 md:bg-slate-300 sm:bg-white">
          <PrimaryButton className="bg-green-400" id="btnAlquilar" name="btnAlquilar" onClick={alquilarPosada}>
            Alquilar
          </PrimaryButton>
          <PrimaryButton className="bg-green-500" id="btnPago" name="btnPago" onClick={registrarPago}>
            Registrar Pago
          </PrimaryButton>
          <PrimaryButton className="bg-green-600" onClick={registrarConsumo} name="btnConsumo">
            Cargar un consumo
          </PrimaryButton>
          <PrimaryButton className="bg-green-700" name="btnEstadoCta" id="btnEstadoCta" onClick={estadoCta}>
            Estado Cta
          </PrimaryButton>
          <PrimaryButton className="bg-green-800">Cambiar de Cabaña</PrimaryButton>
          <PrimaryButton className="bg-green-800">F. Salida</PrimaryButton>
          <PrimaryButton className="bg-green-900" name="btnDarDeAlta" onClick={darDeAlta}>
            Dar de Alta
          </PrimaryButton>
          <PrimaryButton className="bg-green-400" name="btnCaja" onClick={CajaShow}>
            Caja
          </PrimaryButton>
        </div>
        {dataPosada.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 sm:grid sm:grid-cols-1">
            {dataPosada.map((item) => (
              <div className={seleccionada(item.id)} key={item.id} onClick={() => onSelectPosada(item.id)}>
                <div>
                  <div>
                    <img src={urlImg(item.estatus)} alt="posada" width="20" height="20" />
                  </div>
                  <div>
                    <img
                      src="/imagenes/logo.png"
                      alt="posada"
                      className="bg-green-50 object-fill rounded-lg"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="font-bold text-center text-amber-800 text-lg">{item.nombre}</div>
                  <div className="text-center font-bold">
                    <span>{`Capacidad: ${item.capacidad}`}</span>
                  </div>
                  <div className="text-center font-bold">
                    <span>{item.descripcion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>sin data</p>
        )}
      </MainHtml>
    </AuthenticatedLayout>
  );
}