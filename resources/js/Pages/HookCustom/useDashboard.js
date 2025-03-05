import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { fechaFormato_dmy } from "../Helper/help"

const  useDashboard = (dataPosada, huespedesRegistrados, flash) => {
  const [selectPosada, setSelectPosada] = useState(0);
  const [show, setShow] = useState(false);
  const [enviar, setEnviar] = useState(false);
  const [mostrar, setMostrarMessage] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const onClose = (e) => {
    let onSumit = e.target.value;
    setEnviar(onSumit);
    setShow(false);
  };

const estatusPosada = (posada_id) => {
    const posada = dataPosada.find((item) => item.id === posada_id);
    return posada ? posada.estatus : null;
  };

  const seleccionada = (id) => {
    return id === selectPosada
      ? 'border-collapse border-green-400 shadow-black bg-blue-100 cursor-pointer'
      : 'border-collapse border-blue-400 shadow-black bg-green-100 cursor-pointer';
  };

  const onSelectPosada = (id) => {
    setSelectPosada(id);
    seleccionada(id);
    onHoverMouseCabana(id);
  };

  const onHoverMouseCabana = (id) => {
    if (estatusPosada(id) === 'O') {
      const huespede = huespedesRegistrados.find((item) => item.posada_id === id);
      if (huespede) {
        flash.message = `Huespede: ${huespede.nombre} Entrada: ${fechaFormato_dmy(huespede.fechaEntrada)} Salida: ${fechaFormato_dmy(huespede.fechaSalida)}`;
        setMostrarMessage(true);
      }
    }
  };

  const urlImg = (estatus) => {
    return estatus === 'D' ? '/imagenes/circulo_verde.jpg' : '/imagenes/circulo_rojo.jpg';
  };

  const alquilarPosada = (e) => {
    e.preventDefault();
    if (selectPosada && estatusPosada(selectPosada) === 'D') {
      router.get(route('registrohuespede.get', selectPosada));
    } else {
      flash.message = 'Cabaña ocupada.. no se puede alquilar';
      setMostrarMessage(true);
    }
  };

  const registrarPago = (e) => {
    e.preventDefault();
    if (selectPosada && estatusPosada(selectPosada) === 'O') {
      router.get(route('registrohuespedepago.show', selectPosada));
    } else {
      flash.message = 'Cabaña Desocupada.. no se puede registrar pago';
      setMostrarMessage(true);
    }
  };

  const estadoCta = (e) => {
    e.preventDefault();
    if (selectPosada && estatusPosada(selectPosada) === 'O') {
      router.get(route('estadocta.show', selectPosada));
    } else {
      flash.message = 'Cabaña Desocupada.. no se puede emitir estado cta';
      setMostrarMessage(true);
    }
  };

  const registrarConsumo = (e) => {
    e.preventDefault();
    if (selectPosada && estatusPosada(selectPosada) === 'O') {
      router.get(route('cargoconsumo.get', selectPosada));
    } else {
      flash.message = 'Cabaña Desocupada.. no se puede registrar consumo';
      setMostrarMessage(true);
    }
  };

  const darDeAlta = (e) => {
    e.preventDefault();
    if (selectPosada && estatusPosada(selectPosada) === 'O') {
      router.get(route('notafactura.get', selectPosada));
    } else {
      flash.message = 'Cabaña Desocupada.. no se puede dar de alta';
      setMostrarMessage(true);
    }
  };

  const CajaShow = () => {
    router.get(route('caja.show'));
  };

  useEffect(() => {
    if (flash?.message) {
      setMostrarMessage(true);
    }
  }, [flash]);

  return {
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
  };
};

export default useDashboard;
