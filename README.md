# 🦈🐧 SharkyAndPinguin - Game

🎮 **Sharky and Pinguin** es un minijuego multijugador en línea inspirado en *Journey of the Prairie King*. Puedes jugar solo o con un amigo usando un código de lobby. ¡Lucha, esquiva y sobrevive en este duelo helado entre el tiburón mako y el pingüino de Humboldt, ambos chilenos!

---

## 🔧 Arquitectura del Proyecto

### Frontend (HTML + JS + Canvas)
- Renderizado del juego usando la API Canvas.
- Inputs por teclado (movimiento, disparo).
- Opciones de juego:
  - **Singleplayer**: Juego local sin conexión.
  - **Multiplayer**: Conexión a un lobby en tiempo real vía WebSocket.

### Backend (Node.js + Express + WebSocket)
- Servidor Express para servir HTML y JS.
- WebSocket para comunicación entre jugadores.
- API REST mínima para guardar puntajes en la base de datos.

### Base de datos (Supabase)
- Almacena puntajes y nombres de jugador.
- Sin login: los jugadores ingresan su nombre al terminar la partida.

---

## 🌳 Estructura del Proyecto

```
SharkyAndPinguin-Game/
├── public/
│   ├── index.html          ← Menú inicial y Canvas
│   ├── game.js             ← Lógica del juego
│   └── styles.css          ← Estilos opcionales
├── server/
│   ├── index.js            ← Express + WebSocket
│   └── supabase.js         ← Conexión a Supabase
├── .gitignore
├── .env.example            ← Variables de entorno
├── package.json
├── README.md
```

---

## 🧩 Flujo del juego multijugador

1. Jugador A crea un lobby (código como `ABC123`)
2. Jugador B se une con el mismo código.
3. Ambos inician la partida sincronizados.
4. WebSocket mantiene movimientos, disparos y enemigos sincronizados.
5. Al finalizar, se guarda el puntaje:
   - En **singleplayer**: `"nombre" : puntaje`
   - En **multiplayer**: `"nombre1+nombre2" : puntaje combinado`

---

## 🎯 MVP objetivo

✅ Crear/Unirse a un lobby  
✅ Ver al otro jugador moverse  
✅ Disparar y sincronizar enemigos  
✅ Guardar puntaje en Supabase  
✅ Power-ups y corazones en pantalla  
✅ Sprites animados pixelados (16x16 o 32x32)

---

## 🖌️ Sprites y Personajes

- Hechos a mano en [Piskel](https://www.piskelapp.com/)
- Estilo pixel art (16x16 o 32x32)
- Personajes:
  - **Sharky**: Tiburón mako chileno 🦈
  - **Pinguin**: Pingüino de Humboldt 🐧
- Objetos:
  - Corazones (vidas)
  - Power-ups (disparo doble, velocidad, etc)

---

## 🧪 Ejecutar el proyecto localmente

1. Clona este repositorio:

```bash
git clone https://github.com/Stakosh/SharkyAndPinguin-Game.git
cd SharkyAndPinguin-Game
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example` con tu URL y KEY de Supabase.

4. Inicia el servidor:

```bash
npm start
```

5. Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Ramas Git

| Rama         | Propósito                                                              |
|--------------|-------------------------------------------------------------------------|
| `main`       | Versión estable y lista para producción                                 |
| `dev`        | Rama de integración de funcionalidades antes de llegar a `main`         |
| `feature`    | Desarrollo de nuevas funcionalidades específicas                         |
| `fix`        | Corrección de errores o bugs                                            |
| `test`       | Pruebas de rendimiento, multiplayer, u otras funcionalidades inestables |

---

## 📜 Licencia

MIT © Stakosh

---

## 🌎 English Summary

**Sharky and Pinguin** is a pixel-style online minigame inspired by *Journey of the Prairie King*. You can play solo or with a friend by creating/joining a multiplayer lobby. Sharky the mako shark and Pinguin the Humboldt penguin fight side by side in a pixelated icy showdown.

- HTML + JS frontend (Canvas)
- Node.js + Express backend with WebSocket
- Supabase for score saving (no login)
- Chilean fauna pixel heroes 🦈🐧
