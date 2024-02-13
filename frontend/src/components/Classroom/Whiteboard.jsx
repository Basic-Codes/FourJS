import React, { useEffect, useState } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../helper/staticVars";

const xOffset = 600;
const yOffset = 100;

function Whiteboard() {
    const [color, setColor] = useState("#e95a5a");
    const [lineWidth, setLineWidth] = useState("2");
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
        socket.emit("mousePos", {
            x: e.clientX,
            y: e.clientY,
        });

        if (context) {
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.lineCap = "round";
            context.lineJoin = "round";

            if (isMousePressed) {
                context.stroke();
                updateLineData({
                    x: e.clientX - xOffset / 2,
                    y: e.clientY - yOffset / 2,
                });
                context.lineTo(
                    e.clientX - xOffset / 2,
                    e.clientY - yOffset / 2
                );
            } else {
                // context.stroke();
                // context.closePath();
            }
        }
    };

    useEffect(() => {
        if (canvasRef && canvasRef?.current) {
            canvasRef.current.width = window.innerWidth - xOffset;
            canvasRef.current.height = window.innerHeight - yOffset;
            setContext(canvasRef?.current?.getContext("2d"));
        }
    }, [canvasRef]);

    return (
        <div className="">
            <div
                style={{
                    left: receivedMouseData?.data?.x,
                    top: receivedMouseData?.data?.y,
                    background: receivedMouseData?.self ? color : "#10b981",
                }}
                className="absolute h-4 w-4 rounded-full"
            ></div>

            {/* Left Toolba: Start */}
            <div
                className="absolute lef-0 top-1/2 -translate-y-1/2
                        h-80 w-20 bg-white rounded-r-xl overflow-hidden
                        grid grid-flow-row grid-cols-1"
            >
                <div
                    onClick={() => setLineWidth("8")}
                    className="w-full grid place-items-center cursor-pointer"
                >
                    {lineWidth == "8" && (
                        <div className="absolute h-12 w-12 rounded-xl bg-[#c1f0ff76]"></div>
                    )}
                    <div className="absolute h-8 w-8 rounded-full bg-black z-20"></div>
                </div>
                <div
                    onClick={() => setLineWidth("4")}
                    className="w-full grid place-items-center cursor-pointer"
                >
                    {lineWidth == "4" && (
                        <div className="absolute h-12 w-12 rounded-xl bg-[#c1f0ff76]"></div>
                    )}
                    <div className="absolute h-4 w-4 rounded-full bg-black"></div>
                </div>
                <div
                    onClick={() => setLineWidth("2")}
                    className="w-full grid place-items-center cursor-pointer"
                >
                    {lineWidth == "2" && (
                        <div className="absolute h-12 w-12 rounded-xl bg-[#c1f0ff76]"></div>
                    )}
                    <div className="absolute h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="w-full grid place-items-center cursor-pointer">
                    <div
                        onClick={() => {
                            document.querySelector("#colorPicker").click();
                        }}
                        style={{ background: color }}
                        className="absolute h-8 w-8 rounded-lg"
                    ></div>
                    <input
                        className="absolute h-8 w-8 rounded-lg p-0 m-0 border-none outline-none invisible"
                        id="colorPicker"
                        style={{ background: color }}
                        onChange={(e) => setColor(e.target.value)}
                        type="color"
                        name=""
                    />
                </div>
            </div>
            {/* Left Toolba: End */}

            <div className="grid place-items-center min-h-screen min-w-screen bg-vr-white bg-i1">
                <canvas
                    className="cursor-none bg-white shadow rounded-3xl"
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
        </div>
    );
}

export default Whiteboard;
