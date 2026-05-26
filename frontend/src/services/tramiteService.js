import api from "./api";

export const crearTramite = (datos) => {
  return api.post("/tramites", datos);
};

export const obtenerMisTramites = () => {
  return api.get("/tramites/mis-tramites");
};

export const obtenerTodosTramites = () => {
  return api.get("/tramites");
};

export const actualizarEstado = (id, datos) => {
  return api.put(`/tramites/${id}/estado`, datos);
};