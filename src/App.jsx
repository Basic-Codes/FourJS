import { useState } from "react";
import MyBaseScene from "./components/TestComponents/MyBaseScene";
import TutBaseScene from "./components/TestComponents/TutBaseScene";
import WebXRTest from "./components/TestComponents/WebXRTest";
import CanvasDraw from "./components/TestComponents/CanvasDraw";
import Canvas2DOn3js from "./components/TestComponents/Canvas2DOn3js";
import Classroom from "./components/Classroom/Classroom";
import FirebaseTesting from "./components/TestComponents/FirebaseTesting";
import SocketTesting from "./components/TestComponents/SocketTesting";

function App() {
    return (
        <div>
            {/* <MyBaseScene /> */}

            {/* <TutBaseScene /> */}

            {/* <WebXRTest /> */}

            {/* <CanvasDraw /> */}

            {/* <Canvas2DOn3js /> */}

            {/* <FirebaseTesting /> */}

            <SocketTesting />

            {/* <Classroom /> */}
        </div>
    );
}

export default App;
