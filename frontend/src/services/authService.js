import api from "./api";

export const login = (datos) => {
  return api.post("/auth/login", datos);
};

export const registrar = (datos) => {
  return api.post("/auth/registro", datos);
};