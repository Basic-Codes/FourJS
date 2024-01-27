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
    addSpotLight,
    addStudent,
    addTable,
    makeRoom,
} from "../../helper/Modelling/classroomCore";
import { useParams } from "wouter";
import { useQueryParams } from "react-use-query-params";

function Classroom() {
    const params = useParams();
    const { hasParam } = useQueryParams();

    console.log(params.session_code);

    const mainSceneRef = useRef(null);
    const mainScene = mainSceneRef.current;
    const testCubeRef = useRef(null);
    const testCube = testCubeRef.current;

    const [chairs, setChairs] = useState(chairsData);
    const [totalStudents, setTotalStudents] = useState(0);
    const [studentPlacementData, setStudentPlacementData] = useState(null);

    const addCube = (mainScene) => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1),
            new THREE.MeshNormalMaterial({ color: "#5962e6" })
        );
        cube.position.set(0, 0.1, 0);
        cube.receiveShadow = true;
        cube.name = "base_cube";
        mainScene.scene.add(cube);

        testCubeRef.current = cube;

        const animate = () => {
            if (totalStudents == 5) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
            window.requestAnimationFrame(animate);
        };
        animate();
    };

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

        // mainScene.renderer.setAnimationLoop(() => {
        //     mainScene.renderer.render(mainScene.scene, mainScene.camera);
        // });

        makeRoom(mainScene);
        addBoard(mainScene);

        addCube(mainScene);

        chairs?.map((item, index) => {
            addTable(mainScene, index, item.position);
        });

        // addSpotLight(mainScene);

        // ! VR Stuffs
        document.body.appendChild(VRButton.createButton(mainScene.renderer));
    }, []);

    useEffect(() => {
        // ! Adding Student
        // if (totalStudents > 0) {
        //     [...Array(totalStudents).keys()]?.map((i) => {
        //         let studentModel = mainScene.scene.getObjectByName(
        //             `student_${i}`
        //         );
        //         if (studentModel) {
        //             console.log(`student_${i} already exist`);
        //         } else {
        //             addStudent(mainScene, `${i}`, chairs[i].position);
        //         }
        //     });
        // }

        // ! Using Student Placement
        if (mainScene && studentPlacementData) {
            // ! Render All Students
            for (const [key, value] of Object.entries(studentPlacementData)) {
                let studentModel = mainScene.scene.getObjectByName(
                    `student_${key}`
                );
                if (studentModel) {
                    console.log(`student_${key} already exist`);
                } else {
                    const placeableChairPos = chairs[value.index].position;
                    const studentPosVector = new Vector3(
                        placeableChairPos.x + vrCamOffset.x,
                        placeableChairPos.y + vrCamOffset.y,
                        placeableChairPos.z + vrCamOffset.z
                    );
                    if (key != params.student_id) {
                        addStudent(mainScene, key, studentPosVector);
                    }
                }
            }

            // ! Place My camera in proper position
            if (!hasParam("isTesting")) {
                const myPlacementData = studentPlacementData[params.student_id];
                const myPos = chairs[myPlacementData.index].position;
                console.log("myPos", myPos);
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

        // ! traverse all objects
        let studentModelCount = 0;
        if (mainScene) {
            mainScene.scene?.traverse((child) => {
                if (child.name) {
                    // console.log("name", child.name);
                    if (child.name.includes("student")) {
                        studentModelCount += 1;
                        // let selectedObject = mainScene.scene.getObjectByName(child.name);
                        // mainScene.scene.remove(selectedObject);
                    }
                }
            });
        }
        console.log("studentModelCount", studentModelCount);
    }, [totalStudents, studentPlacementData, mainScene]);

    // ! Firebase Stuffs
    useEffect(() => {
        if (params?.session_code) {
            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/total-students`
                ),
                async (snapshot) => {
                    const data = snapshot.val();
                    console.log("total-students", data);
                    setTotalStudents(data);
                }
            );

            onValue(
                ref(
                    db,
                    `vr-classroom/session/${params?.session_code}/student-placement`
                ),
                async (snapshot) => {
                    const data = snapshot.val();
                    console.log("student-placement", data);
                    setStudentPlacementData(data);
                }
            );
        }
    }, []);

    // ! Testing
    useEffect(() => {
        setTimeout(() => {
            if (mainScene) {
                // console.log("Changing Camera Pos");
                // mainScene.cgroup.position.set(0, 5, 0);
                // mainScene.camera.position.set(0, 5, 0);
            }
        }, 4_000);
    }, [mainScene]);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default Classroom;
