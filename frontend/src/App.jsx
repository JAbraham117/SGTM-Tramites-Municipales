import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import CrearTramite from "./pages/CrearTramite";
import SubirDocumento from "./pages/SubirDocumento";
import ValidarTramites from "./pages/ValidarTramites";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-tramite" element={<CrearTramite />} />
        <Route path="/subir-documento" element={<SubirDocumento />} />
        <Route path="/validar-tramites" element={<ValidarTramites />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;