import { useEffect, useState } from "react";
import { obtenerMisTramites } from "../services/tramiteService";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [tramites, setTramites] = useState([]);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cargarTramites = async () => {
    try {
      const respuesta = await obtenerMisTramites();
      setTramites(respuesta.data);
    } catch (error) {
      alert("Error al cargar trámites");
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    cargarTramites();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand">SGTM - Municipalidad</span>
        <button className="btn btn-light" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </nav>

      <div className="container mt-4">
        <h4>Bienvenido, {usuario?.nombre}</h4>

        <Link to="/crear-tramite" className="btn btn-success my-3">
          Nuevo Trámite
        </Link>

        <div className="card shadow">
          <div className="card-header">
            Mis Trámites
          </div>

        <Link to="/subir-documento" className="btn btn-secondary my-3 ms-2">
          Subir Documento
        </Link>

        <Link to="/validar-tramites" className="btn btn-warning my-3 ms-2">
          Validar Trámites
        </Link>

        <Link to="/reportes" className="btn btn-info my-3 ms-2">
          Reportes
        </Link>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Tipo</th>
                  <th>Municipio</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {tramites.map((tramite) => (
                  <tr key={tramite.id_tramite}>
                    <td>{tramite.codigo_tramite}</td>
                    <td>{tramite.tipo_tramite}</td>
                    <td>{tramite.municipio}</td>
                    <td>{tramite.estado}</td>
                    <td>{tramite.fecha_solicitud}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {tramites.length === 0 && (
              <p className="text-center">No existen trámites registrados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;