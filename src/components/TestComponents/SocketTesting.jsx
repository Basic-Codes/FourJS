import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

function SocketTesting() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [receivedMousePos, setReceivedMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (message) => {
                setReceivedMessages((prev) => [...prev, message]);
            });
            socket.on("mousePos", (data) => {
                console.log(data);
                setReceivedMousePos(data);
            });
        }
    }, [socket]);

    const sendMessage = () => {
        socket.emit("message", message);
        setMessage("");
    };

    const onMouseMove = (e) => {
        // console.log(e.clientX, e.clientY);
        socket.emit("mousePos", { x: e.clientX, y: e.clientY });
    };

    return (
        <div
            onMouseMove={onMouseMove}
            className="h-screen w-screen bg-emerald-100"
        >
            <div
                style={{ left: receivedMousePos.x, top: receivedMousePos.y }}
                className="absolute h-4 w-4 rounded-full bg-emerald-500"
            ></div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export default SocketTesting;
