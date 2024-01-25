import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const testLine = [
    {
        x: 352,
        y: 225,
    },
    {
        x: 344,
        y: 231,
    },
    {
        x: 337,
        y: 236,
    },
    {
        x: 325,
        y: 248,
    },
    {
        x: 317,
        y: 255,
    },
    {
        x: 310,
        y: 261,
    },
    {
        x: 303,
        y: 268,
    },
    {
        x: 295,
        y: 276,
    },
    {
        x: 288,
        y: 283,
    },
    {
        x: 279,
        y: 290,
    },
    {
        x: 272,
        y: 295,
    },
    {
        x: 265,
        y: 302,
    },
    {
        x: 259,
        y: 309,
    },
    {
        x: 252,
        y: 316,
    },
    {
        x: 246,
        y: 323,
    },
    {
        x: 240,
        y: 329,
    },
    {
        x: 234,
        y: 334,
    },
    {
        x: 227,
        y: 339,
    },
    {
        x: 220,
        y: 344,
    },
    {
        x: 216,
        y: 348,
    },
    {
        x: 211,
        y: 352,
    },
    {
        x: 208,
        y: 355,
    },
    {
        x: 205,
        y: 356,
    },
    {
        x: 203,
        y: 358,
    },
    {
        x: 201,
        y: 358,
    },
    {
        x: 200,
        y: 359,
    },
    {
        x: 199,
        y: 359,
    },
    {
        x: 198,
        y: 359,
    },
    {
        x: 196,
        y: 359,
    },
    {
        x: 195,
        y: 359,
    },
    {
        x: 194,
        y: 359,
    },
    {
        x: 193,
        y: 359,
    },
    {
        x: 192,
        y: 358,
    },
    {
        x: 191,
        y: 357,
    },
    {
        x: 192,
        y: 357,
    },
    {
        x: 192,
        y: 357,
    },
    {
        x: 194,
        y: 357,
    },
    {
        x: 198,
        y: 357,
    },
    {
        x: 203,
        y: 357,
    },
    {
        x: 212,
        y: 357,
    },
    {
        x: 224,
        y: 359,
    },
    {
        x: 236,
        y: 359,
    },
    {
        x: 250,
        y: 361,
    },
    {
        x: 266,
        y: 361,
    },
    {
        x: 291,
        y: 361,
    },
    {
        x: 318,
        y: 361,
    },
    {
        x: 353,
        y: 361,
    },
    {
        x: 388,
        y: 361,
    },
    {
        x: 424,
        y: 361,
    },
    {
        x: 464,
        y: 361,
    },
    {
        x: 503,
        y: 361,
    },
    {
        x: 544,
        y: 361,
    },
    {
        x: 579,
        y: 359,
    },
    {
        x: 606,
        y: 359,
    },
    {
        x: 633,
        y: 359,
    },
    {
        x: 653,
        y: 359,
    },
    {
        x: 668,
        y: 357,
    },
    {
        x: 677,
        y: 356,
    },
    {
        x: 685,
        y: 356,
    },
    {
        x: 692,
        y: 355,
    },
    {
        x: 698,
        y: 355,
    },
    {
        x: 702,
        y: 355,
    },
    {
        x: 705,
        y: 355,
    },
    {
        x: 707,
        y: 355,
    },
    {
        x: 708,
        y: 355,
    },
    {
        x: 710,
        y: 355,
    },
    {
        x: 711,
        y: 355,
    },
    {
        x: 712,
        y: 355,
    },
    {
        x: 712,
        y: 355,
    },
    {
        x: 712,
        y: 355,
    },
    {
        x: 713,
        y: 355,
    },
    {
        x: 714,
        y: 354,
    },
];

const CanvasDraw = () => {
    const [context, setContext] = useState(null);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [lineData, setLineData] = useState([]);
    const canvasRef = useRef(null);

    function drawStroke() {
        context.beginPath(); // Start the drawing path
        context.moveTo(testLine[0].x, testLine[0].y); // Move to the start point

        testLine.forEach((point) => {
            context.lineTo(point.x, point.y); // Draw a line to the next point
        });

        context.strokeStyle = "#000000"; // Set the color of the stroke
        context.lineWidth = 2; // Set the width of the stroke
        context.stroke(); // Render the stroke
    }

    const onMouseMove = (e) => {
        // console.log(e.clientX, e.clientY);
        setLineData((lineData) => [
            ...lineData,
            { x: e.clientX, y: e.clientY },
        ]);

        // if (context) {
        //     console.log("_______________________________");
        //     drawStroke();
        // }

        if (context) {
            context.strokeStyle = "blue";
            context.lineWidth = "2";
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();

            if (isMousePressed) {
                context.lineTo(e.clientX, e.clientY);
            } else {
                context.stroke();
                context.closePath();
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

    useEffect(() => {
        console.log(isMousePressed);
        if (context && canvasRef?.current) {
            canvasRef?.current?.addEventListener(
                "mousemove",
                onMouseMove,
                false
            );
            canvasRef?.current?.addEventListener(
                "touchmove",
                onMouseMove,
                false
            );
            canvasRef?.current?.addEventListener(
                "mousedown",
                () => {
                    setIsMousePressed(true);
                },
                false
            );
            canvasRef?.current?.addEventListener(
                "mouseup",
                () => {
                    setIsMousePressed(false);
                },
                false
            );

            context.fillStyle = "tomato";
            context.fillRect(
                0,
                0,
                canvasRef?.current?.width,
                canvasRef?.current?.height
            );
        }

        return () => {
            canvasRef?.current?.removeEventListener(
                "mousemove",
                onMouseMove,
                false
            );
            canvasRef?.current?.removeEventListener(
                "touchmove",
                onMouseMove,
                false
            );
            canvasRef?.current?.removeEventListener(
                "mousedown",
                () => {
                    setIsMousePressed(true);
                },
                false
            );
            canvasRef?.current?.removeEventListener(
                "mouseup",
                () => {
                    setIsMousePressed(false);
                },
                false
            );
        };
    }, [context, canvasRef, isMousePressed]);

    useEffect(() => {
        if (!isMousePressed) {
            console.log("lineData", lineData);
        }
    }, [isMousePressed]);

    return (
        <div>
            <h1>{Math.random()}</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default CanvasDraw;
