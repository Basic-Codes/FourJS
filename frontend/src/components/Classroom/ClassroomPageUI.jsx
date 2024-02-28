import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { FaHandRock, FaHandPaper } from "react-icons/fa";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { useParams } from "wouter";
import { db } from "../../helper/firebase";
import { useStore } from "@nanostores/react";
import { $mic } from "../../stores/classroom";

const ClassroomPageUI = () => {
    const params = useParams();

    const [isHandRaise, setIsHandRaise] = useState(false);

    const mic = useStore($mic);

    const onHandRaise = () => {
        set(
            ref(
                db,
                `vr-classroom/session/${params?.session_code}/student-placement/_${params?.student_id}/isHandRaise`
            ),
            !isHandRaise
        );
    };

    const onMicClick = () => {
        $mic.set(!mic);
    };

    useEffect(() => {
        if (params?.session_code) {
            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/student-placement/_${params?.student_id}/isHandRaise`
                ),
                async (snapshot) => {
                    const data = snapshot.val();
                    setIsHandRaise(!!data);
                }
            );
        }
    }, []);

    return (
        <div className="">
            <button
                onClick={onMicClick}
                className="absolute bottom-20 left-5 bg-white p-3 rounded-lg"
            >
                {mic ? (
                    <IoMdMic className="text-2xl text-emerald-300" />
                ) : (
                    <IoMdMicOff className="text-2xl" />
                )}
            </button>
            <button
                onClick={onHandRaise}
                className="absolute bottom-5 left-5 bg-white p-3 rounded-lg"
            >
                {isHandRaise ? (
                    <FaHandPaper className="text-2xl text-orange-300" />
                ) : (
                    <FaHandRock className="text-2xl" />
                )}
            </button>
        </div>
    );
};

export default ClassroomPageUI;
