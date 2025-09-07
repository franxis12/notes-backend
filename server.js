const express = require("express");
const cors = require("cors");
const db = require("./db"); // Solo aquí

// Probar conexión
db.query("SELECT 1")
  .then(() => console.log("✅ Conexión a MySQL exitosa."))
  .catch(err => console.error("❌ Error en MySQL:", err));

const app = express();
console.log("🚀 Express cargado y middlewares listos");

app.use(express.json());

app.use(cors());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Ruta para crear nota
app.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "El texto de la nota es requerido" });
    }

    const [result] = await db.query(
      "INSERT INTO notes (text) VALUES (?)",
      [text]
    );

    res.status(201).json({ id: result.insertId, text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la nota" });
  }
});
// Ruta para obtener todas las notas
app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las notas" });
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
