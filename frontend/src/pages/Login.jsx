import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
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
      const respuesta = await login(form);

      localStorage.setItem("token", respuesta.data.token);
      localStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));

      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-4 mx-auto">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">SGTM</h3>
          <h5 className="text-center mb-3">Iniciar Sesión</h5>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              Ingresar
            </button>
          </form>

          <p className="text-center mt-3">
            ¿No tiene cuenta? <Link to="/registro">Registrarse</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;