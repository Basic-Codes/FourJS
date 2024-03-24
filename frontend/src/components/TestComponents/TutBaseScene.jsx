import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "../../helper/core/SceneInit";
import { GUI } from "dat.gui";

function TutBaseScene() {
    useEffect(() => {
        const test = new SceneInit("myThreeJsCanvas");
        test.initialize();
        test.animate();

        const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: "#5edb9b" });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

        test.scene.add(boxMesh);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 32, 64);
        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        test.scene.add(spotLightHelper);

        const gui = new GUI();

        const geometryFolder = gui.addFolder("Mesh Geometry");
        geometryFolder.open();
        const rotationFolder = geometryFolder.addFolder("Rotation");
        rotationFolder
            .add(boxMesh.rotation, "x", 0, Math.PI)
            .name("Rotate X Axis");
        rotationFolder
            .add(boxMesh.rotation, "y", 0, Math.PI)
            .name("Rotate Y Axis");
        rotationFolder
            .add(boxMesh.rotation, "z", 0, Math.PI)
            .name("Rotate Z Axis");
        const scaleFolder = geometryFolder.addFolder("Scale");
        scaleFolder.add(boxMesh.scale, "x", 0, 2).name("Scale X Axis");
        scaleFolder.add(boxMesh.scale, "y", 0, 2).name("Scale Y Axis");
        scaleFolder.add(boxMesh.scale, "z", 0, 2).name("Scale Z Axis");
        scaleFolder.open();

        const materialFolder = gui.addFolder("Mesh Material");
        const materialParams = {
            boxMeshColor: boxMesh.material.color.getHex(),
        };
        materialFolder.add(boxMesh.material, "wireframe");
        materialFolder
            .addColor(materialParams, "boxMeshColor")
            .onChange((value) => boxMesh.material.color.set(value));
    }, []);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default TutBaseScene;
