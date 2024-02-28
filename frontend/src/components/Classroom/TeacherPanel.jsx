import { useState } from "react";
import PptControl from "./PptControl";
import Whiteboard from "./Whiteboard";
import { useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../helper/firebase";
import { useLocation, useParams } from "wouter";

const TeacherPanel = () => {
    const params = useParams();
    const [location, setLocation] = useLocation();

    const [currState, setCurrState] = useState("whiteboard");
    const [currPptImgUrl, setCurrPptImgUrl] = useState(null);

    // ! Firebase Stuffs
    useEffect(() => {
        if (params?.session_code) {
            const data = {
                teachingMode: currState,
                currPptImgUrl: currPptImgUrl,
            };

            set(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/settings`
                ),
                data
            );
        }
    }, [currState, currPptImgUrl]);

    return (
        <div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 flex space-x-5">
                <div
                    className="bg-white rounded-b-lg px-4 py-1
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
                <div
                    className="bg-white rounded-b-lg px-4 py-1
                        cursor-pointer font-semibold shadow"
                >
                    <button
                        onClick={() =>
                            window.open(
                                `/session/${params?.session_code}/student/teacher?isTeacher`,
                                "_blank"
                            )
                        }
                    >
                        Go to VR Mode
                    </button>
                </div>
            </div>
            {currState == "whiteboard" ? (
                <Whiteboard />
            ) : (
                <PptControl setCurrPptImgUrl={setCurrPptImgUrl} />
            )}
        </div>
    );
};

export default TeacherPanel;
