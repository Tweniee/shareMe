"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSocket = void 0;
var joinRoom_socket_1 = require("./joinRoom.socket");
var shareMe_socket_1 = require("./shareMe.socket");
var ioredis_1 = require("ioredis");
var redis = new ioredis_1.Redis();
var code = 'function x() {\n\tconsole.log("Welcome!");\n}';
var connectionSocket = function (io) {
    io.on('connection', function (socket) {
        // Join a room
        (0, joinRoom_socket_1.joinRoomSockets)(socket, io, redis, code);
        // Handle messages from clients
        (0, shareMe_socket_1.shareMeSocket)(socket, io, redis);
        // Handle disconnection
        socket.on('disconnect', function () {
            console.log('User disconnected');
        });
    });
};
exports.connectionSocket = connectionSocket;
