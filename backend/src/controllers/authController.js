const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.registrar = async (req, res) => {
  try {
    const { nombre, dpi, nit, telefono, email, password } = req.body;

    const [existe] = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuario 
      (nombre, dpi, nit, telefono, email, password, id_rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, dpi, nit, telefono, email, passwordHash, 3]
    );

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [usuarios] = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuario = usuarios[0];

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.id_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Inicio de sesión correcto",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.id_rol
      }
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};