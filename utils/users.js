let users = [];

const UserJoin = (socket_id , username, room) => {
    const user = {
        socket_id,
        username,
        room
    }
    users.push(user);
    return user;
}

const getRoomUsers = (room) => {
   return users.filter(user => user.room === room);
}

module.exports = {
    UserJoin,
    getRoomUsers
};