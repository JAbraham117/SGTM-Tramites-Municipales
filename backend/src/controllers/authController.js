const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.registrar = async (req, res) => {
  try {

    const { nombre, dpi, nit, telefono, email, password } = req.body;

    // Validación DPI
    if (!/^\d{13}$/.test(dpi)) {
      return res.status(400).json({
        mensaje: "El DPI debe contener exactamente 13 dígitos"
      });
    }

    // Validación teléfono
    if (!/^\d{8}$/.test(telefono)) {
      return res.status(400).json({
        mensaje: "El teléfono debe contener exactamente 8 dígitos"
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuario
      (nombre, dpi, nit, telefono, email, password, id_rol)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, dpi, nit, telefono, email, passwordHash, 3]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar usuario",
      error
    });
  }
};