import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Pagination from '@/Components/Pagination';
import { fechaFormato_dmy, dateTimeToDate } from '../../Pages/Helper/help';
import { Link } from '@inertiajs/react';
import axios from 'axios';
const ReservacionTable = ({ reservaciones, data, links }) => {



  return (
    <div className="w-full mt-4">
      <table className="w-full border-collapse border border-green-400 border-rounded-md">
        <thead className="bg-green-300 border-collapse border border-gray-300 rounded-md">
          <tr>
            <th className="border border-collapse rounded-md py-2">id</th>
            <th className="border border-collapse rounded-md">Nro Reservacion</th>
            <th className="border border-collapse rounded-md">Nro Personas</th>
            <th className="border border-collapse rounded-md">Nro Cabañas</th>
            <th className="border border-collapse rounded-md">Cedula</th>
            <th className="border border-collapse rounded-md">Nombre</th>
            <th className="border border-collapse rounded-md">Fecha Entrada</th>
            <th className="border border-collapse rounded-md">Fecha Salida</th>
            <th className="border border-collapse rounded-md">$ Pago</th>
            <th className="border border-collapse rounded-md">Editar</th>
            <th className="border border-collapse rounded-md">Imprimir</th>
          </tr>
        </thead>
        <tbody>
          {reservaciones.data.length > 0 ? (
            reservaciones.data.map((reservacion) => (
              <tr key={reservacion.id} className="border border-collapse rounded-md">
                <td className="border border-collapse rounded-md py-2">{reservacion.id}</td>
                <td className="border border-collapse rounded-md">{reservacion.nro_reservacion}</td>
                <td className="border border-collapse rounded-md">{reservacion.nro_personas}</td>
                <td className="border border-collapse rounded-md">{reservacion.cantidad_cabana_reservadas}</td>
                <td>{`${reservacion.huespede.nacionalidad}-${reservacion.huespede.cedula}`}</td>
                <td className="border border-collapse rounded-md">{`${reservacion.huespede.nombre} ${reservacion.huespede.apellidos}`}</td>
                <td className="border border-collapse rounded-md">{fechaFormato_dmy(dateTimeToDate(reservacion.fecha_entrada))}</td>
                <td className="border border-collapse rounded-md">{fechaFormato_dmy(dateTimeToDate(reservacion.fecha_salida))}</td>
                <td className="border border-collapse rounded-md">{reservacion.monto}</td>
                <td className="justify-center text-center items-center">
                  <Link  href={route('reservaciones.edit',reservacion.id)} as="button" className="bg-yellow-500 py-2 rounded-md px-2">Editar</Link>
                </td>
                <td className="justify-center text-center items-center">
                  <a  href={route('repo.06', reservacion.id)}  className="bg-blue-500 py-2 rounded-md px-2">Imprimir</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="border border-collapse rounded-md py-2 text-center">
                No reservations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Pagination
          links={links.map((link) => {
            if (link.url) {
              link.url += `&fecha_entrada=${data.fecha_entrada}&fecha_salida=${data.fecha_salida}`;
            }
            return link;
          })}
        />
      </div>
    </div>
  );
};

export default ReservacionTable;