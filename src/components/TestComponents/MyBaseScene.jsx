import { useEffect } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const MyBaseScene = () => {
    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 96;

        const canvas = document.querySelector("#main_canvas");
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // ! Adding Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        // ! Adding Spot Light
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);

        // ! Adding Cube
        const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
        const boxMaterial = new THREE.MeshNormalMaterial();
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        scene.add(boxMesh);

        // ! Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // ! Add FPS stats
        const stats = Stats();
        document.body.appendChild(stats.dom);

        const animate = () => {
            // ! Adding bit of a rotation
            boxMesh.rotation.x += 0.01;
            boxMesh.rotation.y += 0.01;

            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <div>
            <canvas id="main_canvas" />
        </div>
    );
};

export default MyBaseScene;
