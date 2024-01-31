const send = (socket, data) => {
    socket.send(JSON.stringify(data));
}

const sendAll = (sockets, data) => {
    sockets.forEach(socket => {
        send(socket, data);
    });
}

module.exports = {
    send,
    sendAll,
}