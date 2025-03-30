import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
console.log("working");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods:['GET', 'POST'],
        // credentials: true
    }
});

io.on('connection', (socket) => {
    console.log("User connected to socket", socket.id);
    
})

export {app, io, server};