// server/index.js
import express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Manejar rutas absolutas con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Iniciar servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Crear WebSocket server sobre el mismo servidor HTTP
const wss = new WebSocketServer({ server });

// Asignar IDs únicos a cada cliente
let clientId = 0;

wss.on('connection', (ws) => {
  ws.id = clientId++;
  console.log(`🔌 Jugador conectado con ID: ${ws.id}`);

  // Cuando recibimos un mensaje del cliente
  ws.on('message', (msg) => {
    let data;

    try {
      data = JSON.parse(msg);
    } catch (err) {
      console.error('Mensaje mal formado:', msg);
      return;
    }

    // Añadir ID del remitente
    data.id = ws.id;

    // Reenviar a todos los clientes excepto al que envió
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  // Al desconectarse
  ws.on('close', () => {
    console.log(`❌ Jugador ${ws.id} desconectado`);
  });
});

// Ruta para guardar puntajes (mock)
app.post('/api/score', async (req, res) => {
  const { nombre, puntaje } = req.body;

  // Aquí se conectará a Supabase más adelante
  console.log(`📝 Puntaje recibido: ${nombre} - ${puntaje}`);

  res.status(200).json({ ok: true, mensaje: 'Puntaje recibido (mock)' });
});
