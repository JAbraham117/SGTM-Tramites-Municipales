const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const tramiteRoutes = require("./routes/tramiteRoutes");
const documentoRoutes = require("./routes/documentoRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tramites", tramiteRoutes);
app.use("/api/documentos", documentoRoutes);

app.get("/", (req, res) => {
  res.send("API SGTM funcionando correctamente");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});