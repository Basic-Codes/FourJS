import * as THREE from "three";
import { Vector3 } from "three";
import {
    ironTexture,
    tilesTexture,
    wallTexture,
    woodTexture,
} from "./textures";

export const makeRoom = (mainScene) => {
    const roomGroup = new THREE.Group();
    roomGroup.position.set(0, 0, 0);

    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.05, 10),
        new THREE.MeshPhongMaterial({ map: tilesTexture() })
    );
    floor.castShadow = true;
    floor.position.set(0, -0.5, 0);

    const wallFront = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 0.05),
        new THREE.MeshPhongMaterial({ map: wallTexture() })
    );
    wallFront.castShadow = true;
    wallFront.position.set(0, 2, 5);

    const wallBack = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 0.05),
        new THREE.MeshPhongMaterial({ map: wallTexture() })
    );
    wallBack.castShadow = true;
    wallBack.position.set(0, 2, -5);

    const wallLeft = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 5, 10),
        new THREE.MeshPhongMaterial({ map: wallTexture() })
    );
    wallLeft.castShadow = true;
    wallLeft.position.set(5, 2, 0);

    const wallRight = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 5, 10),
        new THREE.MeshPhongMaterial({ map: wallTexture() })
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

export const addTable = (mainScene, position = new Vector3(0, 0, 0)) => {
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.05, 0.7),
        new THREE.MeshPhongMaterial({ map: woodTexture() })
    );
    top.position.set(0, 0, 0);

    const leg1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.5, 0.05),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    leg1.position.set(-0.4, -0.25, -0.3);
    const leg2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.5, 0.05),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    leg2.position.set(0.4, -0.25, -0.3);
    const leg3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.5, 0.05),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    leg3.position.set(0.4, -0.25, 0.3);
    const leg4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.5, 0.05),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
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

export const addBoard = (mainScene) => {
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

export const addSpotLight = (mainScene) => {
    var spotLight = new THREE.SpotLight("#208a12", 100);
    spotLight.position.set(0, 5, 5);
    mainScene.scene.add(spotLight);
    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    mainScene.scene.add(spotLightHelper);
};
