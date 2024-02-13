import { useEffect } from "react";
import Classroom from "./Classroom";
import { useState } from "react";
import { useParams } from "wouter";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../helper/firebase";
import Loading from "../Misc/Loading";

const findNextAvailableIndex = (data) => {
    // Extract all index values, filter out undefined, and sort them
    let indices = Object.values(data)
        .map((obj) => obj.index)
        .filter((index) => index !== undefined)
        .sort((a, b) => a - b);

    // Find the first missing number in the sequence
    for (let i = 0; i <= indices[indices.length - 1]; i++) {
        if (!indices.includes(i)) {
            return i;
        }
    }

    // If no missing number is found, return the next number after the last index
    return indices[indices.length - 1] + 1;
};

const SessionChecker = () => {
    const params = useParams();

    const [isReady, setIsReady] = useState(false);

    // ! Firebase Stuffs
    useEffect(() => {
        if (params?.session_code && params?.student_id) {
            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/student-placement`
                ),
                async (snapshot) => {
                    let data = snapshot.val();

                    console.log(params?.student_id);

                    if (!data || !data[`_${params?.student_id}`]?.index) {
                        console.log("Not added in the placement list");

                        if (data) {
                            data[`_${params?.student_id}`] = {
                                id: params?.student_id,
                                name: "Jolil",
                                index: data ? findNextAvailableIndex(data) : 0,
                            };
                        } else {
                            data = {
                                [`_${params?.student_id}`]: {
                                    id: params?.student_id,
                                    index: 0,
                                    name: "XXXX",
                                },
                            };
                        }
                        set(
                            ref(
                                db,
                                `vr-classroom/session/${params?.session_code}/student-placement`
                            ),
                            data
                        );
                    } else {
                        setIsReady(true);
                    }
                }
            );
        }
    }, []);

    return (
        <div className="h-full w-full">
            {!isReady ? (
                <Loading />
            ) : (
                <div>
                    <Classroom />
                </div>
            )}
        </div>
    );
};

export default SessionChecker;
