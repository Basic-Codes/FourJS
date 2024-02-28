import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import io from "socket.io-client";
import { BACKEND_URL, testLine } from "../../helper/staticVars";
import VoiceChat from "./VoiceChat";

const FakeWhiteboard = ({ update3DWhiteboard, user_id }) => {
    const [socket, setSocket] = useState(null);
    const [context, setContext] = useState(null);
    const canvasRef = useRef(null);

    function drawStroke(strokeData) {
        context.beginPath();
        context.moveTo(strokeData[0].x, strokeData[0].y);

        strokeData.forEach((point) => {
            context.lineTo(point.x, point.y);
        });

        context.strokeStyle = "#000000";
        context.lineWidth = 2;
        context.stroke();

        makeTextureFromCanvas();
    }

    useEffect(() => {
        if (canvasRef && canvasRef?.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;

            setContext(canvasRef?.current?.getContext("2d"));
        }
    }, [canvasRef]);

    useEffect(() => {
        if (context && canvasRef?.current) {
            context.fillStyle = "white";
            context.fillRect(
                0,
                0,
                canvasRef?.current?.width,
                canvasRef?.current?.height
            );

            // drawStroke(testLine);
        }
    }, [context, canvasRef]);

    const makeTextureFromCanvas = () => {
        const texture = new THREE.Texture(canvasRef?.current);
        texture.needsUpdate = true;
        update3DWhiteboard(texture);
    };

    // useEffect(() => {
    //     makeTextureFromCanvas();
    // }, []);

    useEffect(() => {
        const newSocket = io(BACKEND_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        if (socket) {
            socket.on("lineData", (data) => {
                if (data?.self) {
                    // Do nothing
                } else {
                    drawStroke(data.data);
                }
            });
        }
    }, [socket]);

    return (
        <div>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <VoiceChat socket={socket} user_id={user_id} />
        </div>
    );
};

export default FakeWhiteboard;
