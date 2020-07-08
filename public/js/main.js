const usersList = document.getElementById('users');
const roomname = document.getElementById('room-name');

const chatmessages = document.querySelector('.chat-messages'); 
const chatform = document.getElementById('chat-form');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });


const socket = io();
console.log("eh");

socket.emit('JoinRoom', ({username, room}));

socket.on('message', message => {
    let DateNow = new Date;
    DateNow = DateNow.toLocaleTimeString();
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
                    <p class="text"> ${message.message} </p>`

    chatmessages.appendChild(div);

})

socket.on('roomUsers', ({room, users}) => {
    outputRoonname(room);
    outputUsers(users);
})


const outputRoonname = (room) => {
    roomname.innerText = room;
}

const outputUsers = (users) => {
    usersList.innerHTML = `
        ${users.map(user => `<li>${user.username}`).join(' ')}
    `

}

chatform.addEventListener('submit', e => {
    e.preventDefault();

    socket.emit('chatmessage', e.target.elements.msg.value);

    e.target.elements.msg.value = '';
})