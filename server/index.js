const express = require('express');
const socketio = require('socket.io');
const http = require('http');

//puert
const PORT = process.env.PORT || 5000;

//routes
const router = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
//iniciar el sevidor
server.listen(PORT, () => console.log(`EL servidor se inicio en el puerto ${PORT}`));