import { useEffect, useState } from "react";
import api from "../services/api";

function Reportes() {
  const [reporte, setReporte] = useState([]);

  const cargarReporte = async () => {
    try {
      const respuesta = await api.get("/tramites/reporte/estados");
      setReporte(respuesta.data);
    } catch (error) {
      alert("Error al cargar reporte");
    }
  };

  useEffect(() => {
    cargarReporte();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Reporte de Trámites por Estado</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {reporte.map((item, index) => (
            <tr key={index}>
              <td>{item.estado}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reportes;
//Ajustes
