import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "../../helper/SceneInit";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";

function Classroom() {
    const addFloor = (mainScene) => {
        const boxGeometry = new THREE.BoxGeometry(10, 0.1, 10);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: "#5edb9b" });
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.castShadow = true;
        mesh.position.set(0, -0.5, 0);
        mainScene.scene.add(mesh);
    };
    const addCube = (mainScene) => {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: "#f18170" });
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.position.set(0, 0, 0);
        mesh.receiveShadow = true;
        mainScene.scene.add(mesh);
    };
    const addSpotLight = (mainScene) => {
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 5, 5);
        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        mainScene.scene.add(spotLightHelper);
    };
    const addVRFloor = (mainScene) => {
        const floorGeometry = new THREE.PlaneGeometry(4, 4);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x666666,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        mainScene.scene.add(floor);
    };

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainScene.initialize({ x: 0, y: 1.6, z: 3 });
        mainScene.animate();

        addFloor(mainScene);
        addCube(mainScene);
        addSpotLight(mainScene);
        // addVRFloor(mainScene);

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
