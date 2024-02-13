import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
    constructor(canvasId) {
        // NOTE: Core components to initialize Three.js app.
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        // NOTE: Camera params;
        this.fov = 50;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;

        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initialize(cameraPos) {
        this.cgroup = new THREE.Group();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );

        this.cgroup.add(this.camera);
        this.scene.add(this.cgroup);

        // this.camera.position.z = cameraZPos;
        // this.camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
        this.cgroup.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

        // NOTE: Specify a canvas which is already created in the HTML.
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            // NOTE: Anti-aliasing smooths out the edges.
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.xr.enabled = true;
        this.renderer.xr.setReferenceSpaceType("local");
        // this.renderer.xr.addEventListener("sessionstart", () => {
        //     this.renderer.xr.getCamera().cameras[0].position.x = 1000;
        //     this.renderer.xr.getCamera().cameras[0].position.y = 1000;
        //     this.renderer.xr.getCamera().cameras[0].position.z = 1000;
        // });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.scene.background = new THREE.Color("#ffa7e9");
        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        // ambient light which is for the whole scene
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        // directional light - parallel sun rays
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(0, 32, 64);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);

        // if window resizes
        window.addEventListener("resize", () => this.onWindowResize(), false);

        // NOTE: Load space background.
        // this.loader = new THREE.TextureLoader();
        // this.scene.background = this.loader.load('./pics/space.jpeg');

        // NOTE: Declare uniforms to pass into glsl shaders.
        // this.uniforms = {
        //   u_time: { type: 'f', value: 1.0 },
        //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
        //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
        // };
    }

    animate() {
        let ci = 0;
        // NOTE: Window is implied.
        // requestAnimationFrame(this.animate.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
        // this.render();
        // this.stats.update();
        // this.controls.update();

        this.renderer.setAnimationLoop((data) => {
            // const frame = this.renderer.xr.getFrame();

            // if (!frame) {
            //     this.renderer.render(this.scene, this.camera);
            //     return;
            // }

            // const refSpace = this.renderer.xr.getReferenceSpace();

            // const views = frame.getViewerPose(refSpace).views;

            // const pos = views[0].transform.position;

            // // var c = renderer.xr.getCamera().cameras[0].position;

            // this.renderer.xr.getCamera().cameras[ci].position.x = 100;

            // this.renderer.xr.getCamera().cameras[ci].position.y = pos.y;
            // this.renderer.xr.getCamera().cameras[ci].position.z = pos.z;

            this.renderer.render(this.scene, this.camera);

            // ci = (ci + 1) % 2;
        });
    }

    render() {
        // NOTE: Update uniform data on each render.
        // this.uniforms.u_time.value += this.clock.getDelta();
        // this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
