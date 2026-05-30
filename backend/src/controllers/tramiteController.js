const db = require("../config/db");

exports.crearTramite = async (req, res) => {
  try {
    const { descripcion, direccion_inmueble, municipio, id_tipo_tramite } = req.body;

    const codigo = "TRM-" + Date.now();

    const [resultado] = await db.query(
      `INSERT INTO tramite 
      (codigo_tramite, descripcion, direccion_inmueble, municipio, id_usuario, id_tipo_tramite, id_estado_tramite)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo,
        descripcion,
        direccion_inmueble,
        municipio,
        req.usuario.id_usuario,
        id_tipo_tramite,
        1
      ]
    );

    res.status(201).json({
      mensaje: "Trámite creado correctamente",
      id_tramite: resultado.insertId,
      codigo
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear trámite", error });
  }
};

exports.listarTramitesUsuario = async (req, res) => {
  try {
    const [tramites] = await db.query(
      `SELECT 
        t.id_tramite,
        t.codigo_tramite,
        t.descripcion,
        t.municipio,
        tt.nombre AS tipo_tramite,
        et.nombre AS estado,
        t.fecha_solicitud
      FROM tramite t
      INNER JOIN tipo_tramite tt ON t.id_tipo_tramite = tt.id_tipo_tramite
      INNER JOIN estado_tramite et ON t.id_estado_tramite = et.id_estado_tramite
      WHERE t.id_usuario = ?`,
      [req.usuario.id_usuario]
    );

    res.json(tramites);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar trámites", error });
  }
};

exports.listarTodos = async (req, res) => {
  try {
    const [tramites] = await db.query(
      `SELECT 
        t.id_tramite,
        t.codigo_tramite,
        u.nombre AS ciudadano,
        tt.nombre AS tipo_tramite,
        et.nombre AS estado,
        t.fecha_solicitud
      FROM tramite t
      INNER JOIN usuario u ON t.id_usuario = u.id_usuario
      INNER JOIN tipo_tramite tt ON t.id_tipo_tramite = tt.id_tipo_tramite
      INNER JOIN estado_tramite et ON t.id_estado_tramite = et.id_estado_tramite`
    );

    res.json(tramites);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar trámites", error });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {

     if (req.usuario.rol !== 1 && req.usuario.rol !== 2) {
      return res.status(403).json({
        mensaje: "No tiene permisos para cambiar el estado del trámite"
      });
    }


    const { id_tramite } = req.params;
    const { id_estado_tramite, comentario } = req.body;

    await db.query(
      "UPDATE tramite SET id_estado_tramite = ? WHERE id_tramite = ?",
      [id_estado_tramite, id_tramite]
    );

    await db.query(
      `INSERT INTO historial_tramite 
      (comentario, id_tramite, id_estado_tramite, id_usuario)
      VALUES (?, ?, ?, ?)`,
      [comentario, id_tramite, id_estado_tramite, req.usuario.id_usuario]
    );

    res.json({ mensaje: "Estado actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar estado", error });
  }
};

exports.reporteTramites = async (req, res) => {
  try {
    const [reporte] = await db.query(
      `SELECT 
        et.nombre AS estado,
        COUNT(t.id_tramite) AS total
      FROM tramite t
      INNER JOIN estado_tramite et 
      ON t.id_estado_tramite = et.id_estado_tramite
      GROUP BY et.nombre`
    );

    res.json(reporte);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al generar reporte", error });
  }
};

//tramites
