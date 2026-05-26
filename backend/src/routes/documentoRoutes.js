const express = require("express");
const multer = require("multer");
const router = express.Router();

const documentoController = require("../controllers/documentoController");
const verificarToken = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  "/subir",
  verificarToken,
  upload.single("documento"),
  documentoController.subirDocumento
);

router.get(
  "/tramite/:id_tramite",
  verificarToken,
  documentoController.listarDocumentosPorTramite
);

module.exports = router;