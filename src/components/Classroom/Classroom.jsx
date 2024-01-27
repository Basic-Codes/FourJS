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
import { chairsData } from "../../helper/staticVars";
import {
    addBoard,
    addSpotLight,
    addTable,
    makeRoom,
} from "../../helper/Modelling/classroomCore";

function Classroom() {
    const mainSceneRef = useRef(null);
    const mainScene = mainSceneRef.current;

    const [chairs, setChairs] = useState(chairsData);
    const [totalStudents, setTotalStudents] = useState(0);

    const addCube = (mainScene) => {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1),
            new THREE.MeshNormalMaterial({ color: "#5962e6" })
        );
        mesh.position.set(0, 0.1, 0);
        mesh.receiveShadow = true;
        mesh.name = "base_cube";
        mainScene.scene.add(mesh);

        const animate = () => {
            if (totalStudents == 5) {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
            }
            window.requestAnimationFrame(animate);
        };
        animate();
    };

    const addStudent = (mainScene, user_id, position) => {
        const student = new THREE.Group();
        student.position.set(0, 0, 0);
        student.name = `student_${user_id}`;

        const studentBase = new THREE.Mesh(
            new THREE.BoxGeometry(position.x, position.y, position.z),
            new THREE.MeshPhongMaterial({ color: "#f26b6b" })
        );
        studentBase.position.set(0, 0, 0);
        studentBase.receiveShadow = true;

        student.add(studentBase);
        mainScene.scene.add(student);

        return student;
    };

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainSceneRef.current = mainScene;

        // mainScene.initialize({ x: -2, y: 2, z: -2 });
        mainScene.initialize({ x: 0, y: 0.5, z: -1 });

        // mainScene.animate();

        mainScene.renderer.setAnimationLoop(() => {
            mainScene.renderer.render(mainScene.scene, mainScene.camera);
        });

        makeRoom(mainScene);
        addBoard(mainScene);

        addCube(mainScene);

        // addStudent(mainScene, "aaabbbccc", new Vector3(0.2, 0.2, 0.2));

        chairs?.map((item, index) => {
            addTable(mainScene, index, item.position);
        });

        // addSpotLight(mainScene);

        // ! VR Stuffs
        document.body.appendChild(VRButton.createButton(mainScene.renderer));
    }, []);

    useEffect(() => {
        // ! Adding Table
        if (totalStudents > 0) {
            // [...Array(totalStudents).keys()]?.map((i) => {
            //     addTable(mainScene, i, chairs[i].position);
            // });
        }

        // ! traverse all objects
        // if (mainScene) {
        //     mainScene.scene?.traverse(function (child) {
        //         if (child.name) {
        //             console.log("name", child.name);
        //             if (child.name == "table_0") {
        //                 let selectedObject = mainScene.scene.getObjectByName(
        //                     child.name
        //                 );
        //                 mainScene.scene.remove(selectedObject);
        //             }
        //         }
        //     });
        // }

        // ! Remove Box
        // if (totalStudents > 5) {
        //     var selectedObject = mainScene.scene.getObjectByName("base_cube");
        //     mainScene.scene.remove(selectedObject);
        // }
    }, [totalStudents]);

    useEffect(() => {
        onValue(
            ref(db, "vr-classroom/session/my-code/total-students"),
            async (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                setTotalStudents(data);
            }
        );

        // setTimeout(() => {
        //     setTotalStudents(5);
        // }, 4_000);
    }, []);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default Classroom;
