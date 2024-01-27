import * as THREE from "three";
import { Vector3 } from "three";
import {
    ironTexture,
    tilesTexture,
    wallTexture,
    wood2Texture,
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

export const addTable = (
    mainScene,
    tableNo,
    position = new Vector3(0, 0, 0)
) => {
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

    const tableG = new THREE.Group();
    tableG.add(top);
    tableG.add(leg1);
    tableG.add(leg2);
    tableG.add(leg3);
    tableG.add(leg4);
    tableG.position.set(0, 0, 0);

    // ! Adding Chair
    const chairBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.03, 0.3),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    chairBase.position.set(0, -0.18, 0);
    const chairBack = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.4, 0.03),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    chairBack.position.set(0, 0.02, -0.15);
    const chairLeg1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.35, 0.03),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    chairLeg1.position.set(-0.13, -0.36, -0.13);
    const chairLeg2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.35, 0.03),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    chairLeg2.position.set(0.13, -0.36, -0.13);
    const chairLeg3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.35, 0.03),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    chairLeg3.position.set(0.13, -0.36, 0.13);
    const chairLeg4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.35, 0.03),
        new THREE.MeshPhongMaterial({ map: ironTexture() })
    );
    chairLeg4.position.set(-0.13, -0.36, 0.13);

    const chairG = new THREE.Group();
    chairG.add(chairBase);
    chairG.add(chairBack);
    chairG.add(chairLeg1);
    chairG.add(chairLeg2);
    chairG.add(chairLeg3);
    chairG.add(chairLeg4);
    chairG.position.set(0, 0, -0.7);

    const group = new THREE.Group();
    group.name = `table_${tableNo}`;
    group.position.set(position.x, position.y, position.z);

    group.add(tableG);
    group.add(chairG);

    mainScene.scene.add(group);
};

export const addStudent = (mainScene, user_id, position) => {
    const student = new THREE.Group();
    student.position.set(position.x, position.y, position.z);
    student.name = `student_${user_id}`;

    const studentBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.4, 0.2),
        new THREE.MeshPhongMaterial({ color: "#f26b6b" })
    );
    studentBase.position.set(0, -0.25, 0);
    studentBase.receiveShadow = true;

    student.add(studentBase);
    mainScene.scene.add(student);

    return student;
};

export const addBoard = (mainScene, whiteBoardRef) => {
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, 1, 5 - 0.05);

    const board = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.1),
        new THREE.MeshPhongMaterial({ color: "#ffffff" })
    );
    board.position.set(0, 0, 0);

    const frameTop = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.1, 0.15),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    frameTop.position.set(0, 1, 0);

    const frameBottom = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.1, 0.15),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    frameBottom.position.set(0, -1, 0);

    const frameLeft = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 2.1, 0.15),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    frameLeft.position.set(1.55, 0, 0);

    const frameRight = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 2.1, 0.15),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    frameRight.position.set(-1.55, 0, 0);

    boardGroup.add(board);
    boardGroup.add(frameTop);
    boardGroup.add(frameBottom);
    boardGroup.add(frameLeft);
    boardGroup.add(frameRight);

    whiteBoardRef.current = board;

    mainScene.scene.add(boardGroup);
};

export const addSpotLight = (mainScene) => {
    var spotLight = new THREE.SpotLight("#208a12", 100);
    spotLight.position.set(0, 5, 5);
    mainScene.scene.add(spotLight);
    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    mainScene.scene.add(spotLightHelper);
};
