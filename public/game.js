const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const socket = new WebSocket(`ws://${location.host}`);

let playerId = null; // Asumimos que el cliente no sabe su ID
const player = { x: 50, y: 50, color: 'blue' };

// Otros jugadores
const remotePlayers = {}; // id: { x, y, color }

// Dibuja todo en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Jugador local
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, 20, 20);

  // Jugadores remotos
  Object.values(remotePlayers).forEach((remote) => {
    ctx.fillStyle = remote.color || 'red';
    ctx.fillRect(remote.x, remote.y, 20, 20);
  });
}

// Enviar nuestra posición
function sendPosition() {
  const msg = JSON.stringify({
    type: 'move',
    x: player.x,
    y: player.y
  });
  socket.send(msg);
}

// Control del jugador local
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': player.y -= 5; break;
    case 'ArrowDown': player.y += 5; break;
    case 'ArrowLeft': player.x -= 5; break;
    case 'ArrowRight': player.x += 5; break;
  }

  draw();
  sendPosition();
});

// Mensajes desde el servidor
socket.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === 'move') {
    // Ignora tu propio mensaje si llega (opcional, pero defensivo)
    if (msg.id === playerId) return;

    // Actualiza la posición del jugador con ese ID
    remotePlayers[msg.id] = {
      x: msg.x,
      y: msg.y,
      color: 'red'
    };

    draw();
  }
});

function startMultiplayer() {
  draw(); // inicia el dibujo inicial
}
