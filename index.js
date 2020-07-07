const express = require('express');
const http = require('http');
const path = require('path');

const {UserJoin, getRoomUsers} = require('./utils/users');
const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log("WS Connected");
    socket.on('JoinRoom', ({username, room}) => {
        const user = UserJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', `welcome to ${user.room} Room Chat.`);

        socket.broadcast.to(user.room).emit('message', `${user.username} has joined the chat`);

        io.to(user.room).emit('roomUsers', {room : user.room, users: getRoomUsers(user.room)})

    })
})


server.listen(3000, () => {
    console.log("listining on 3000");
})

