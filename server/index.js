const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUserInRoom} = require('./users.js');

//puert
const PORT = process.env.PORT || 5000;

//routes
const router = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//iniciar la conexion de io
io.on('connection', (socket) => {
    //console.log('tenemos una nueva conexión');
    socket.on('join', ({ name, room }, callback) => {
        //console.log( name, room);
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);
       

        socket.emit('message', {user: 'admin', text: `${user.name}, Bienvenido a la Sala ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.room);

        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

   
        callback();
    });


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    
        callback();
      });
  
        socket.on('disconnect', () => {
            const user = removeUser(socket.id);
            //console.log('el usuario se fue');
            if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            
            }
        })
});

app.use(router);
//iniciar el sevidor
server.listen(PORT, () => console.log(`EL servidor se inicio en el puerto ${PORT}`));