import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { testLine } from "../../helper/staticVars";

const FakeWhiteboard = ({ whiteBoard }) => {
    const [context, setContext] = useState(null);
    const canvasRef = useRef(null);

    function drawStroke() {
        context.beginPath();
        context.moveTo(testLine[0].x, testLine[0].y);

        testLine.forEach((point) => {
            context.lineTo(point.x, point.y);
        });

        context.strokeStyle = "#000000";
        context.lineWidth = 2;
        context.stroke();
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

            drawStroke();
        }
    }, [context, canvasRef]);

    const update3DWhiteboard = () => {
        if (whiteBoard) {
            const texture = new THREE.Texture(canvasRef?.current);
            texture.needsUpdate = true;
            const updatedMat = new THREE.MeshPhongMaterial({ map: texture });
            whiteBoard.material = updatedMat;
        } else {
            console.log("whiteBoard not found");
        }
    };

    useEffect(() => {
        update3DWhiteboard();
    }, [whiteBoard]);

    return <canvas ref={canvasRef} className="hidden"></canvas>;
};

export default FakeWhiteboard;
