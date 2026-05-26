import { useState } from "react";
import { crearTramite } from "../services/tramiteService";
import { useNavigate } from "react-router-dom";

function CrearTramite() {
  const [form, setForm] = useState({
    id_tipo_tramite: "",
    descripcion: "",
    direccion_inmueble: "",
    municipio: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearTramite(form);
      alert("Trámite creado correctamente");
      navigate("/dashboard");
    } catch (error) {
      alert("Error al crear trámite");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card shadow p-4">
          <h3 className="mb-4">Crear Trámite</h3>

          <form onSubmit={handleSubmit}>
            <label>Tipo de trámite</label>
            <select
              className="form-control mb-3"
              name="id_tipo_tramite"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="1">Licencia Comercial</option>
              <option value="2">Permiso de Construcción</option>
              <option value="3">Catastro</option>
            </select>

            <label>Descripción</label>
            <textarea
              className="form-control mb-3"
              name="descripcion"
              onChange={handleChange}
              required
            />

            <label>Dirección del inmueble</label>
            <input
              className="form-control mb-3"
              name="direccion_inmueble"
              onChange={handleChange}
            />

            <label>Municipio</label>
            <input
              className="form-control mb-3"
              name="municipio"
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              Enviar Trámite
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearTramite;