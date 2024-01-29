import { useState } from "react";
import PptControl from "./PptControl";
import Whiteboard from "./Whiteboard";
import { useEffect } from "react";

const TeacherPanel = () => {
    const [currState, setCurrState] = useState("slide");

    return (
        <div>
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2
                        bg-white rounded-b-lg px-4 py-1
                        cursor-pointer font-semibold shadow"
            >
                {currState == "whiteboard" && (
                    <button onClick={() => setCurrState("slide")}>
                        Whiteboard Mode
                    </button>
                )}
                {currState == "slide" && (
                    <button onClick={() => setCurrState("whiteboard")}>
                        Slide Mode
                    </button>
                )}
            </div>
            {currState == "whiteboard" ? <Whiteboard /> : <PptControl />}
        </div>
    );
};

export default TeacherPanel;
