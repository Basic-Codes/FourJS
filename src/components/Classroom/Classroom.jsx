import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "../../helper/SceneInit";

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

    useEffect(() => {
        const mainScene = new SceneInit("myThreeJsCanvas");
        mainScene.initialize({ x: 10, y: 10, z: 10 });
        mainScene.animate();

        addFloor(mainScene);
        addCube(mainScene);

        addSpotLight(mainScene);
    }, []);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default Classroom;
