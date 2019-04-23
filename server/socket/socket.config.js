'user strict';
const io = require('socket.io')
const chalk = require('chalk');
const chatModel = require('../model/chats.model.js');
const chatRoomModel = require('../model/room.model');

module.exports = function connectSocket(server) {
    const client = io(server);
    client.on('connection', function (socket) {
        console.log(socket.adapter.rooms);
        console.log(chalk.bgGreen("have a connection: " + socket.id));
        socket.currenRoom = 'all';
        socket.join('all');
        let sendStatus = function (s) {
            socket.emit('status', s)
        }
        chatRoomModel.find({}).limit(20).sort({
            _id: 1
        }).exec(function (err, data) {
            socket.emit('listRoom', data);
        })

        function loadOldMessage(_room) {
            console.log(_room);
            chatModel.find({
                room: _room
            }).limit(20).sort({
                _id: 1
            }).exec(function (err, data) {
                socket.emit('oldMessage', data);
            })
        }

        loadOldMessage(socket.currenRoom);

        socket.on('createRoom', function (data) {
            const newRoomModel = new chatRoomModel(data);
            newRoomModel.save().then(data => {
                socket.join(data);
            })
            client.sockets.emit('listRoom', [newRoomModel])
        })
        socket.on('new-user', function (data) {
            socket.userName = data.username;
            if (data.username === '') {
                sendStatus('Please enter a name and message');
            } else {
                socket.emit('server-new-user', data)
            }
        });
        socket.on('logOut', function () {
            socket.leave(socket.currentRoom);
            socket.join('all');
            socket.broadcast.in(socket.currentRoom).emit('notifi_logOut', socket.userName);
            loadOldMessage(socket.currenRoom)
            socket.currentRoom = 'all';
            socket.emit('dashboard', socket.currentRoom);
        })
        socket.on('input', function (data) {
            let user_name = data.user_name;
            let ms = data.messages;
            data.room = socket.currentRoom;
            let newChat = new chatModel(data);
            newChat.save().then(() => {
                if (!socket.currentRoom) {
                    client.sockets.emit('output', [data]);
                }
                client.sockets.in(socket.currentRoom).emit('output', [data]);
            })
        })
        socket.on('selectRoom', async function (data) {
            socket.join(data);
            socket.currentRoom = data;
            loadOldMessage(socket.currentRoom);
            socket.emit('currenRoom', data);

        })
        socket.on('sending...', function () {
            let user = `${socket.userName} writing...`;
            client.sockets.in(socket.currentRoom).emit('writing', user)
        })
        socket.on('stop', function () {
            client.sockets.emit('removeStatusSendMessages')
        })
    })
    //  socket.on ("disconnect", function () {
    //     console.log(chalk.bgRed(socket.id + " disconect"));
    // })

}