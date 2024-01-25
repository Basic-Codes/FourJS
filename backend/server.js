const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

const corsOpts = {
    origin: "*",

    methods: ["GET", "POST"],

    allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

const sockets = new Set();

function sendAll(src, name, data) {
    sockets.forEach((socket) => {
        try {
            if (socket !== src) {
                socket.emit(name, { self: false, data });
            } else {
                socket.emit(name, { self: true, data });
            }
        } catch (error) {
            console.error(error);
        }
    });
}

io.on("connection", (socket) => {
    console.log("New client connected");
    sockets.add(socket);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("mousePos", (data) => {
        sendAll(socket, "mousePos", data);
    });

    socket.on("lineData", (data) => {
        sendAll(socket, "lineData", data);
    });

    socket.on("disconnect", () => {
        sockets.delete(socket);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
