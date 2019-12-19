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

//iniciar la conexion de io
io.on('connection', (socket) => {
    console.log('tenemos una nueva conexión');

    socket.on('join', ({ name, room }) => {
        console.log( name, room);
    });

    socket.on('disconnect', () => {
        console.log('el usuario se fue');
    })
});

app.use(router);
//iniciar el sevidor
server.listen(PORT, () => console.log(`EL servidor se inicio en el puerto ${PORT}`));