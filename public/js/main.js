const users = document.getElementById('users');
const roomname = document.getElementById('room-name')
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

console.log(username);

const socket = io();
console.log("eh");

socket.emit('JoinRoom', ({username, room}));

socket.on('message', message => {
    console.log(message);   
})

socket.on('roomUsers', users => {
    console.log(users);
})

socket.emit('chatmessage', "hello i am bhavesh");


