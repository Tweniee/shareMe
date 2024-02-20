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
var connection_socket_1 = require("./service/sockets/connection.socket");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
    },
});
app.use((0, cors_1.default)());
(0, connection_socket_1.connectionSocket)(io);
// compileTypescriptCode("");
// Start the server
var PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
