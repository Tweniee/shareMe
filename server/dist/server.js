"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
    },
});
app.use((0, cors_1.default)());
// Socket.IO connection handling
io.on('connection', function (socket) {
    console.log('A user connected');
    // Join a room
    socket.on('joinRoom', function (room) {
        socket.join(room);
        // socket.Broadcast.to(room).emit('User added');
        console.log("User joined room: ".concat(room));
    });
    // Handle messages from clients
    socket.on('shareMe', function (obj) {
        console.log('message::::: ' + JSON.stringify(obj.message));
        // Broadcast the message to all connected clients
        io.in(obj.id).emit('message', obj.message);
    });
    // Handle disconnection
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
// Start the server
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
