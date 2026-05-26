const db = require("../config/db");


exports.subirDocumento = async (req, res) => {
  try {

  
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    const { id_tramite } = req.body;

    if (!id_tramite) {
      return res.status(400).json({ mensaje: "El id_tramite es obligatorio" });
    }

    if (!req.file) {
      return res.status(400).json({ mensaje: "Debe subir un archivo" });
    }

    await db.query(
      `INSERT INTO documento 
      (nombre, tipo_archivo, ruta_archivo, id_tramite)
      VALUES (?, ?, ?, ?)`,
      [
        req.file.originalname,
        req.file.mimetype,
        req.file.path,
        id_tramite
      ]
    );

    res.status(201).json({ mensaje: "Documento subido correctamente" });

  } catch (error) {
    console.log("ERROR AL SUBIR DOCUMENTO:", error);

    res.status(500).json({
      mensaje: "Error al subir documento",
      error: error.message
    });
  }
};

exports.listarDocumentosPorTramite = async (req, res) => {
  try {
    const { id_tramite } = req.params;

    const [documentos] = await db.query(
      "SELECT * FROM documento WHERE id_tramite = ?",
      [id_tramite]
    );

    res.json(documentos);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar documentos", error });
  }
};