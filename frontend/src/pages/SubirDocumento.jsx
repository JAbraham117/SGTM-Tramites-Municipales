import { useState } from "react";
import { subirDocumento } from "../services/documentoService";
import { useNavigate } from "react-router-dom";

function SubirDocumento() {
  const [idTramite, setIdTramite] = useState("");
  const [archivo, setArchivo] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_tramite", idTramite);
    formData.append("documento", archivo);

    try {
      await subirDocumento(formData);
      alert("Documento subido correctamente");
      navigate("/dashboard");
    } catch (error) {
      alert("Error al subir documento");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">
        <div className="card shadow p-4">
          <h3>Subir Documento</h3>

          <form onSubmit={handleSubmit}>
            <label>ID del trámite</label>
            <input
              className="form-control mb-3"
              type="number"
              value={idTramite}
              onChange={(e) => setIdTramite(e.target.value)}
              required
            />

            <label>Documento</label>
            <input
              className="form-control mb-3"
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              required
            />

            <button className="btn btn-primary w-100">
              Subir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubirDocumento;