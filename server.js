import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Endpoint POST a Wolkvox
app.post("/call", async (req, res) => {
  try {
    const WOLKVOX_SERVER = process.env.WOLKVOX_SERVER;
    const AGENT_ID = process.env.AGENT_ID;
    const CUSTOMER_PHONE = process.env.CUSTOMER_PHONE;
    const TOKEN = process.env.TOKEN;

    const url = `https://wv${WOLKVOX_SERVER}.wolkvox.com/api/v2/agentbox.php?agent_id=${AGENT_ID}&api=dial&customer_phone=${CUSTOMER_PHONE}`;

    const response = await axios.post(url, null, {
      headers: {
        "wolkvox_server": WOLKVOX_SERVER,
        "wolkvox-token": TOKEN,
        "Content-Type": "application/json"
      }
    });

    res.json({ ok: true, data: response.data });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message,
      wolkvox: err?.response?.data || null
    });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
