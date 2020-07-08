const express = require('express');
const http = require('http');
const path = require('path');

const { UserJoin, getRoomUsers, getCurrentUser, userLeave } = require('./utils/users');
const formatmessage = require('./utils/messages');
const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
const botname = "ChatCord";

io.on('connection', socket => {
    console.log("WS Connected");
    socket.on('JoinRoom', ({ username, room }) => {
        const user = UserJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatmessage(botname, "Welcome to Chat"));

        socket.broadcast.to(user.room).emit('message', formatmessage(user.username, `${user.username} has joined the Chat`));

        io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) })


    })

    socket.on('chatmessage', msg => {
        const user = getCurrentUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', formatmessage(user.username, msg));
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user) {
            io.to(user.room).emit('message', formatmessage(botname, `${user.username} has left the Chat`));
        }
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });

    })
})


server.listen(3000, () => {
    console.log("listining on 3000");
})

