import { useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import SceneInit from "../../helper/SceneInit";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";
import { useState } from "react";

const chairsData = [
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
        position: new Vector3(-2, 0, 2),
    },
    {
        position: new Vector3(0, 0, 2),
    },
    {
        position: new Vector3(2, 0, 2),
    },
];

function Classroom() {
    const [chairs, setChairs] = useState([chairsData]);

    const addFloor = (mainScene) => {
        const geometry = new THREE.BoxGeometry(10, 0.1, 10);
        const material = new THREE.MeshPhongMaterial({ color: "#5edb9b" });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.position.set(0, -0.5, 0);
        mainScene.scene.add(mesh);
    };
    const addCube = (mainScene) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: "#f18170" });
        const mesh = new THREE.Mesh(geometry, material);
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

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainScene.initialize({ x: 5, y: 5, z: 5 });
        mainScene.animate();

        // mainScene.renderer.xr.addEventListener("sessionstart", (session) => {
        //     session.target.getCamera().cameras[0].position.x = 100;
        //     session.target.getCamera().cameras[0].position.y = 5;
        //     session.target.getCamera().cameras[0].position.z = 7;
        // });

        addFloor(mainScene);
        // addCube(mainScene);

        chairsData?.map((item) => {
            addTable(mainScene, item.position);
        });

        addSpotLight(mainScene);

        // ? Shadow Not working
        // var DL = new THREE.PointLight("#FFFFFF", 10, 600);
        // DL.position.set(2, 2, 2);
        // DL.castShadow = true;
        // const d = 100;
        // DL.shadow.camera.left = -d;
        // DL.shadow.camera.right = d;
        // DL.shadow.camera.top = d;
        // DL.shadow.camera.bottom = -d;
        // mainScene.scene.add(DL);

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
