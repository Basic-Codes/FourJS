import React, { useEffect, useState } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../helper/staticVars";

function Whiteboard() {
    const [socket, setSocket] = useState(null);
    const [context, setContext] = useState(null);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [lineData, setLineData] = useState([]);
    const [receivedMouseData, setReceivedMouseData] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (socket) {
            socket.on("mousePos", (data) => {
                setReceivedMouseData(data);
            });
            socket.on("lineData", (data) => {
                if (data?.self) {
                    // Do nothing
                } else {
                    setLineData(data.data);
                    drawStroke(data.data);
                }
            });
        }
    }, [socket]);

    const updateLineData = (pos) => {
        setLineData((lineData) => [...lineData, pos]);
        socket.emit("lineData", [...lineData, pos]);
    };

    function drawStroke(strokeData) {
        context.beginPath();
        context.moveTo(strokeData[0].x, strokeData[0].y);

        strokeData.forEach((point) => {
            context.lineTo(point.x, point.y);
        });

        context.strokeStyle = "#fe0000";
        context.lineWidth = 2;
        context.stroke();
    }

    const onMouseMove = (e) => {
        socket.emit("mousePos", { x: e.clientX, y: e.clientY });

        if (context) {
            context.strokeStyle = "blue";
            context.lineWidth = "2";
            context.lineCap = "round";
            context.lineJoin = "round";

            if (isMousePressed) {
                context.stroke();
                updateLineData({ x: e.clientX, y: e.clientY });
                context.lineTo(e.clientX, e.clientY);
            } else {
                // context.stroke();
                // context.closePath();
            }
        }
    };

    useEffect(() => {
        if (canvasRef && canvasRef?.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            setContext(canvasRef?.current?.getContext("2d"));
        }
    }, [canvasRef]);

    return (
        <div className="h-screen w-screen bg-emerald-100">
            <div
                style={{
                    left: receivedMouseData?.data?.x,
                    top: receivedMouseData?.data?.y,
                }}
                className={`absolute h-4 w-4 rounded-full ${
                    receivedMouseData?.self ? "bg-red-500" : "bg-emerald-500"
                }`}
            ></div>
            <canvas
                onMouseMove={onMouseMove}
                onTouchMove={onMouseMove}
                onMouseDown={() => setIsMousePressed(true)}
                onMouseUp={(e) => {
                    onMouseMove(e);
                    setIsMousePressed(false);
                }}
                onTouchStart={() => setIsMousePressed(true)}
                onTouchEnd={(e) => {
                    onMouseMove(e);
                    setIsMousePressed(false);
                }}
                ref={canvasRef}
            ></canvas>
        </div>
    );
}

export default Whiteboard;
