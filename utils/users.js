let users = [];

const UserJoin = (socket_id, username, room) => {
 
    const user = { socket_id, username, room};

    users.push(user);
    return user;

}

const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
}

const getCurrentUser = (id) => {
    return users.find(user => user.socket_id === id);
}

const userLeave = (id) => {
    const index = users.findIndex(user => user.socket_id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}
module.exports = {
    UserJoin,
    getRoomUsers,
    getCurrentUser,
    userLeave
};