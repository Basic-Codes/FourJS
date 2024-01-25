import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

function SocketTesting() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);

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
        }
    }, [socket]);

    const sendMessage = () => {
        socket.emit("message", message);
        setMessage("");
    };

    return (
        <div>
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
