import { useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import SceneInit from "../../helper/SceneInit";
// import SceneInit from "../../helper/SceneInit-Working-Backup";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";
import { useState } from "react";

const chairsData = [
    // Front Seats
    {
        position: new Vector3(-2, 0, 0),
    },
    {
        position: new Vector3(0, 0, 0),
    },
    {
        position: new Vector3(2, 0, 0),
    },
    {
        position: new Vector3(4, 0, 0),
    },
    {
        position: new Vector3(-4, 0, 0),
    },
    // Middle Seats
    {
        position: new Vector3(-2, 0, 2),
    },
    {
        position: new Vector3(0, 0, 2),
    },
    {
        position: new Vector3(2, 0, 2),
    },
    {
        position: new Vector3(4, 0, 2),
    },
    {
        position: new Vector3(-4, 0, 2),
    },
    // Back Seats
    {
        position: new Vector3(-2, 0, -2),
    },
    {
        position: new Vector3(0, 0, -2),
    },
    {
        position: new Vector3(2, 0, -2),
    },
    {
        position: new Vector3(4, 0, -2),
    },
    {
        position: new Vector3(-4, 0, -2),
    },
];

function Classroom() {
    const [chairs, setChairs] = useState(chairsData);

    const makeRoom = (mainScene) => {
        const roomGroup = new THREE.Group();
        roomGroup.position.set(0, 0, 0);

        const floor = new THREE.Mesh(
            new THREE.BoxGeometry(10, 0.1, 10),
            new THREE.MeshPhongMaterial({ color: "#5edb9b" })
        );
        floor.castShadow = true;
        floor.position.set(0, -0.5, 0);

        const wallFront = new THREE.Mesh(
            new THREE.BoxGeometry(10, 5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#d4d4d4" })
        );
        wallFront.castShadow = true;
        wallFront.position.set(0, 2, 5);

        const wallBack = new THREE.Mesh(
            new THREE.BoxGeometry(10, 5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#d4d4d4" })
        );
        wallBack.castShadow = true;
        wallBack.position.set(0, 2, -5);

        const wallLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 5, 10),
            new THREE.MeshPhongMaterial({ color: "#d4d4d4" })
        );
        wallLeft.castShadow = true;
        wallLeft.position.set(5, 2, 0);

        const wallRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 5, 10),
            new THREE.MeshPhongMaterial({ color: "#d4d4d4" })
        );
        wallRight.castShadow = true;
        wallRight.position.set(-5, 2, 0);

        roomGroup.add(floor);
        roomGroup.add(wallFront);
        roomGroup.add(wallBack);
        roomGroup.add(wallLeft);
        roomGroup.add(wallRight);
        mainScene.scene.add(roomGroup);
    };
    const addCube = (mainScene) => {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: "#e65959" })
        );
        mesh.position.set(0, 0, 0);
        mesh.receiveShadow = true;
        mainScene.scene.add(mesh);
    };
    const addSpotLight = (mainScene) => {
        var spotLight = new THREE.SpotLight("#208a12", 100);
        spotLight.position.set(0, 5, 5);
        mainScene.scene.add(spotLight);
        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        mainScene.scene.add(spotLightHelper);
    };
    const addTable = (mainScene, position = new Vector3(0, 0, 0)) => {
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.05, 0.7),
            new THREE.MeshPhongMaterial({ color: "#d39b55" })
        );
        top.position.set(0, 0, 0);

        const leg1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#f1b770" })
        );
        leg1.position.set(-0.4, -0.25, -0.3);
        const leg2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#f1b770" })
        );
        leg2.position.set(0.4, -0.25, -0.3);
        const leg3 = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#f1b770" })
        );
        leg3.position.set(0.4, -0.25, 0.3);
        const leg4 = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.5, 0.05),
            new THREE.MeshPhongMaterial({ color: "#f1b770" })
        );
        leg4.position.set(-0.4, -0.25, 0.3);

        const group = new THREE.Group();
        group.add(top);
        group.add(leg1);
        group.add(leg2);
        group.add(leg3);
        group.add(leg4);
        group.position.set(position.x, position.y, position.z);

        mainScene.scene.add(group);
    };
    const addBoard = (mainScene) => {
        const boardGroup = new THREE.Group();
        boardGroup.position.set(0, 1, 5 - 0.05);

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(3, 2, 0.1),
            new THREE.MeshPhongMaterial({ color: "#ffffff" })
        );
        board.position.set(0, 0, 0);

        const frameTop = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.1, 0.15),
            new THREE.MeshPhongMaterial({ color: "#914f18" })
        );
        frameTop.position.set(0, 1, 0);

        const frameBottom = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.1, 0.15),
            new THREE.MeshPhongMaterial({ color: "#914f18" })
        );
        frameBottom.position.set(0, -1, 0);

        const frameLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.1, 0.15),
            new THREE.MeshPhongMaterial({ color: "#914f18" })
        );
        frameLeft.position.set(1.55, 0, 0);

        const frameRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 2.1, 0.15),
            new THREE.MeshPhongMaterial({ color: "#914f18" })
        );
        frameRight.position.set(-1.55, 0, 0);

        boardGroup.add(board);
        boardGroup.add(frameTop);
        boardGroup.add(frameBottom);
        boardGroup.add(frameLeft);
        boardGroup.add(frameRight);

        mainScene.scene.add(boardGroup);
    };

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainScene.initialize({ x: 0, y: 0.5, z: -1 });
        mainScene.initialize({ x: -3, y: 3, z: -3 });
        mainScene.animate();

        // addCube(mainScene);

        makeRoom(mainScene);
        addBoard(mainScene);

        chairs?.map((item) => {
            addTable(mainScene, item.position);
        });

        // addSpotLight(mainScene);

        // ! VR Stuffs
        document.body.appendChild(VRButton.createButton(mainScene.renderer));
    }, []);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default Classroom;
