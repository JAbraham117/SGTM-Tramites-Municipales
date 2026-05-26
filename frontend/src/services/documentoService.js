import api from "./api";

export const subirDocumento = (formData) => {
  return api.post("/documentos/subir", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const obtenerDocumentosPorTramite = (idTramite) => {
  return api.get(`/documentos/tramite/${idTramite}`);
};