import { useState } from "react";
import { registrar } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    dpi: "",
    nit: "",
    telefono: "",
    email: "",
    password: ""
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
      await registrar(form);
      alert("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Registro</h3>

          <form onSubmit={handleSubmit}>
            <input className="form-control mb-3" name="nombre" placeholder="Nombre completo" onChange={handleChange} required />
            <input className="form-control mb-3" name="dpi" placeholder="DPI" onChange={handleChange} />
            <input className="form-control mb-3" name="nit" placeholder="NIT" onChange={handleChange} />
            <input className="form-control mb-3" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            <input className="form-control mb-3" type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
            <input className="form-control mb-3" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />

            <button className="btn btn-success w-100">
              Registrarse
            </button>
          </form>

          <p className="text-center mt-3">
            ¿Ya tiene cuenta? <Link to="/">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;