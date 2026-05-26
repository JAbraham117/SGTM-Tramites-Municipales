import { useEffect, useState } from "react";
import { obtenerTodosTramites, actualizarEstado } from "../services/tramiteService";

function ValidarTramites() {
  const [tramites, setTramites] = useState([]);

  const cargarTramites = async () => {
    try {
      const respuesta = await obtenerTodosTramites();
      setTramites(respuesta.data);
    } catch (error) {
      alert("Error al cargar trámites");
    }
  };

  const cambiarEstado = async (idTramite, idEstado) => {
    try {
      await actualizarEstado(idTramite, {
        id_estado_tramite: idEstado,
        comentario: idEstado === 3 ? "Trámite aprobado" : "Trámite rechazado"
      });

      alert("Estado actualizado");
      cargarTramites();

    } catch (error) {
      alert("No tiene permisos o ocurrió un error");
    }
  };

  useEffect(() => {
    cargarTramites();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Validación de Trámites</h3>

      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Código</th>
            <th>Ciudadano</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tramites.map((tramite) => (
            <tr key={tramite.id_tramite}>
              <td>{tramite.codigo_tramite}</td>
              <td>{tramite.ciudadano}</td>
              <td>{tramite.tipo_tramite}</td>
              <td>{tramite.estado}</td>
              <td>{tramite.fecha_solicitud}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => cambiarEstado(tramite.id_tramite, 3)}
                >
                  Aprobar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => cambiarEstado(tramite.id_tramite, 4)}
                >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tramites.length === 0 && (
        <p>No existen trámites registrados.</p>
      )}
    </div>
  );
}

export default ValidarTramites;