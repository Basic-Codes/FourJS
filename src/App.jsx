import { useState } from "react";
import { Link, Route } from "wouter";
import MyBaseScene from "./components/TestComponents/MyBaseScene";
import TutBaseScene from "./components/TestComponents/TutBaseScene";
import WebXRTest from "./components/TestComponents/WebXRTest";
import CanvasDraw from "./components/TestComponents/CanvasDraw";
import Canvas2DOn3js from "./components/TestComponents/Canvas2DOn3js";
import Classroom from "./components/Classroom/Classroom";
import FirebaseTesting from "./components/TestComponents/FirebaseTesting";
import Whiteboard from "./components/Classroom/Whiteboard";
import Login from "./components/Dashboard/Login";
import SignUp from "./components/Dashboard/Register";
import VoiceChat from "./components/Classroom/VoiceChat";

function App() {
  return (
    <div className="overflow-x-hidden">
      {/* <MyBaseScene /> */}

      {/* <TutBaseScene /> */}

      {/* <WebXRTest /> */}

      {/* <CanvasDraw /> */}

      {/* <Canvas2DOn3js /> */}

      {/* <FirebaseTesting /> */}

      {/* <Whiteboard /> */}

      {/* <Classroom /> */}

<<<<<<< HEAD
            <div>
                <Route path="/">Hello</Route>
                <Route path="/session/:session_code/student/:student_id">
                    <Classroom />
                </Route>
                <Route path="/session/:session_code/teacher">
                    <Whiteboard />
                </Route>
                <Route path="/voice-chat">
                    <VoiceChat />
                </Route>
                <Route path="/users/:name">
                    {(params) => <div>Hello, {params.name}!</div>}
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signup" component={SignUp} />
            </div>
        </div>
    );
=======
      <div>
        <Route path="/">Hello</Route>
        <Route path="/session/:session_code/student/:student_id">
          <Classroom />
        </Route>
        <Route path="/session/:session_code/teacher">
          <Whiteboard />
        </Route>
        <Route path="/users/:name">
          {(params) => <div>Hello, {params.name}!</div>}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </div>
    </div>
  );
>>>>>>> 2130778 (log in register works basic)
}

export default App;
