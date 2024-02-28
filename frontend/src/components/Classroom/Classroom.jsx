/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import SceneInit from "../../helper/core/SceneInit";
// import SceneInit from "../../helper/core/SceneInit-Working-Backup";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";
import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../helper/firebase";
import { chairsData, vrCamOffset } from "../../helper/staticVars";
import {
    addBoard,
    addCube,
    addSpotLight,
    addStudent,
    addStudentHandRaise,
    addTable,
    addTeacher,
    addTeacherTable,
    addText,
    makeRoom,
} from "../../helper/Modelling/classroomCore";
import { useParams } from "wouter";
import { useQueryParams } from "react-use-query-params";
import FakeWhiteboard from "./FakeWhiteboard";
import VoiceChat from "./VoiceChat";
import { useCallback } from "react";
import ClassroomPageUI from "./ClassroomPageUI";

function Classroom() {
    const params = useParams();
    const { hasParam } = useQueryParams();

    const mainSceneRef = useRef(null);
    const mainScene = mainSceneRef.current;
    const whiteBoardRef = useRef(null);
    const whiteBoard = whiteBoardRef.current;
    const testCubeRef = useRef(null);
    const testCube = testCubeRef.current;

    const [studentPlacementData, setStudentPlacementData] = useState(null);
    const [sessionSettings, setSessionSettings] = useState(null);

    const update3DWhiteboard = (texture) => {
        if (whiteBoardRef?.current) {
            const updatedMat = new THREE.MeshPhongMaterial({
                map: texture,
            });
            whiteBoardRef.current.material = updatedMat;
        } else {
            console.log("Whiteboard Not Found");
        }
    };
    const updatePptOnWhiteboard = (pptImage) => {
        console.log("--pptImage--", pptImage);
        if (whiteBoardRef?.current) {
            // const loader = new THREE.TextureLoader();
            // const texture = loader.load(pptImage, () => {
            //     mainScene.renderer.render(scene, camera);
            //     whiteBoardRef.current.material = updatedMat;
            // });
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = "Anonymous";
            const texture = loader.load(pptImage);
            const updatedMat = new THREE.MeshPhongMaterial({
                map: texture,
            });
            whiteBoardRef.current.material = updatedMat;
        } else {
            console.log("Whiteboard Not Found");
        }
    };
    // const update3DWhiteboard = useCallback(
    //     (texture) => {
    //         if (whiteBoardRef?.current && sessionSettings) {
    //             console.log(sessionSettings["teachingMode"]);
    //             if (sessionSettings?.teachingMode == "slide") {
    //                 const loader = new THREE.TextureLoader();
    //                 texture = loader.load(
    //                     sessionSettings?.currPptImgUrl,
    //                     () => {
    //                         renderer.render(scene, camera);
    //                         whiteBoardRef.current.material = updatedMat;
    //                     }
    //                 );
    //             } else if (sessionSettings?.teachingMode == "whiteboard") {
    //                 const updatedMat = new THREE.MeshPhongMaterial({
    //                     map: texture,
    //                 });
    //                 whiteBoardRef.current.material = updatedMat;
    //             }
    //         } else {
    //             console.log("Whiteboard Not Found");
    //         }
    //     },
    //     [whiteBoardRef, sessionSettings]
    // );

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainSceneRef.current = mainScene;

        // mainScene.initialize({ x: -2, y: 2, z: -2 });
        // mainScene.initialize({ x: 2, y: 5, z: -2 });
        // mainScene.initialize({ x: 0, y: 0.5, z: -1 });

        if (hasParam("isTesting")) {
            mainScene.initialize({ x: 2, y: 5, z: -2 });
        } else {
            const tempChairPos = new Vector3(0, 0, 0);
            mainScene.initialize({
                x: tempChairPos.x + vrCamOffset.x,
                y: tempChairPos.y + vrCamOffset.y,
                z: tempChairPos.z + vrCamOffset.z,
            });
        }

        mainScene.animate();

        makeRoom(mainScene);
        addBoard(mainScene, whiteBoardRef);

        addCube(mainScene, testCubeRef);

        if (!hasParam("isTeacher")) {
            addTeacher(mainScene);
        }
        addTeacherTable(mainScene);
        chairsData?.map((item, index) => {
            addTable(mainScene, index, item.position);
        });

        // ! VR Stuffs
        document.body.appendChild(VRButton.createButton(mainScene.renderer));
    }, []);

    useEffect(() => {
        // ! Using Student Placement
        if (mainScene && studentPlacementData) {
            // ! Render All Students
            for (const [key, value] of Object.entries(studentPlacementData)) {
                const placeableChairPos = chairsData[value.index]?.position;
                const studentPosVector = new Vector3(
                    placeableChairPos?.x + vrCamOffset.x,
                    placeableChairPos?.y + vrCamOffset.y,
                    placeableChairPos?.z + vrCamOffset.z
                );
                const handRaisePos = new Vector3(
                    studentPosVector.x,
                    studentPosVector.y + 0.5,
                    studentPosVector.z
                );

                let studentModel = mainScene.scene.getObjectByName(
                    `student_${key}`
                );
                let handRaiseModel = mainScene.scene.getObjectByName(
                    `hand_raise_${key}`
                );

                console.log("xxxxxxxxxxxxxx", value.name, handRaiseModel);

                // ! Add Hand Raise
                if (handRaiseModel) {
                    if (value.isHandRaise == false) {
                        mainScene.scene.remove(handRaiseModel);
                    }
                } else {
                    if (value.isHandRaise) {
                        addStudentHandRaise(mainScene, handRaisePos, key);
                    }
                }

                // ! Add Students
                if (studentModel) {
                    console.log(`student_${key} model already exist`);
                } else {
                    addStudent(
                        mainScene,
                        studentPosVector,
                        key,
                        value.name,
                        key == `_${params.student_id}` &&
                            !hasParam("isTesting"),
                        key == `_${params.student_id}`
                    );
                }
            }

            // ! Place My camera in proper position
            if (!hasParam("isTesting")) {
                if (hasParam("isTeacher")) {
                    const myPosVector = new Vector3(0, 0.6, 4);
                    mainScene.cgroup.position.set(
                        myPosVector.x,
                        myPosVector.y,
                        myPosVector.z
                    );
                } else {
                    const myPlacementData =
                        studentPlacementData[`_${params.student_id}`];
                    const myPos = myPlacementData?.index
                        ? chairsData[myPlacementData.index].position
                        : null;
                    if (myPlacementData && myPos) {
                        const myPosVector = new Vector3(
                            myPos.x + vrCamOffset.x,
                            myPos.y + vrCamOffset.y,
                            myPos.z + vrCamOffset.z
                        );
                        mainScene.cgroup.position.set(
                            myPosVector.x,
                            myPosVector.y,
                            myPosVector.z
                        );
                        testCube.position.set(myPos.x, myPos.y + 0.07, myPos.z);
                    }
                }
            }
        }

        // ! traverse all objects
        let studentModelCount = 0;
        if (mainScene) {
            mainScene.scene?.traverse((child) => {
                if (child.name) {
                    if (child.name.includes("student")) {
                        studentModelCount += 1;
                        // let selectedObject = mainScene.scene.getObjectByName(child.name);
                        // mainScene.scene.remove(selectedObject);
                    }
                }
            });
        }
    }, [studentPlacementData, mainScene]);

    // ! Firebase Stuffs
    useEffect(() => {
        if (params?.session_code) {
            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/student-placement`
                ),
                async (snapshot) => {
                    const data = snapshot.val();
                    setStudentPlacementData(data);
                }
            );
        }
    }, []);
    // ! Firebase Stuffs
    useEffect(() => {
        if (params?.session_code) {
            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/settings`
                ),
                async (snapshot) => {
                    const data = snapshot.val();
                    updatePptOnWhiteboard(data?.currPptImgUrl);
                    setSessionSettings(data);
                }
            );
        }
    }, []);

    useEffect(() => {
        console.log("sessionSettings", sessionSettings);
    }, [sessionSettings]);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
            <ClassroomPageUI />
            <FakeWhiteboard
                update3DWhiteboard={update3DWhiteboard}
                user_id={params.student_id}
            />
        </div>
    );
}

export default Classroom;
