import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Servir el index.html directamente
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint POST a Wolkvox
app.post("/call", async (req, res) => {
  try {
    const WOLKVOX_SERVER = "0100";
    const AGENT_ID = "12964";
    const CUSTOMER_PHONE = "9573143387562";
    const TOKEN = "7b69645f6469737472697d2d3230323430393136313030303239";

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


app.listen(3000, () => console.log("Servidor en puerto 3000"));
