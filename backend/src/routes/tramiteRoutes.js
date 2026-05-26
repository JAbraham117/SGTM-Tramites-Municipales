const express = require("express");
const router = express.Router();
const tramiteController = require("../controllers/tramiteController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/", verificarToken, tramiteController.crearTramite);
router.get("/mis-tramites", verificarToken, tramiteController.listarTramitesUsuario);
router.get("/", verificarToken, tramiteController.listarTodos);
router.put("/:id_tramite/estado", verificarToken, tramiteController.actualizarEstado);
router.get("/reporte/estados", verificarToken, tramiteController.reporteTramites);

module.exports = router;