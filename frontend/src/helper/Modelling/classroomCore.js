import * as THREE from "three";
import { Vector3 } from "three";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import {
    handRaiseTexture,
    ironTexture,
    tilesTexture,
    wallTexture,
    wood2Texture,
    woodTexture,
} from "./textures";

export const addCube = (mainScene, testCubeRef) => {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshNormalMaterial({ color: "#5962e6" })
    );
    cube.position.set(0, 0.1, 0);
    cube.receiveShadow = true;
    cube.name = "base_cube";
    mainScene.scene.add(cube);

    testCubeRef.current = cube;

    const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        window.requestAnimationFrame(animate);
    };
    animate();
};

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

export const addTeacher = (mainScene) => {
    const teacher = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.5, 0.3),
        new THREE.MeshPhongMaterial({ color: "#814be5" })
    );
    teacher.position.set(0, 0.6, 4);
    teacher.receiveShadow = true;
    teacher.name = "teacher_table";

    mainScene.scene.add(teacher);
};

export const addTeacherTable = (mainScene) => {
    const teacherTableBottom = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.8, 0.7),
        new THREE.MeshPhongMaterial({ map: woodTexture() })
    );
    teacherTableBottom.position.set(0, -0.2, 0);
    teacherTableBottom.receiveShadow = true;
    teacherTableBottom.name = "teacher_table";

    const teacherTableTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: wood2Texture() })
    );
    teacherTableTop.position.set(0, 0.25, 0);
    teacherTableTop.receiveShadow = true;
    teacherTableTop.name = "teacher_table";

    const teacherTableG = new THREE.Group();
    teacherTableG.position.set(0, 0.1, 3.5);
    teacherTableG.add(teacherTableBottom);
    teacherTableG.add(teacherTableTop);

    mainScene.scene.add(teacherTableG);
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

export const addText = (mainScene, text, position) => {
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load("/fonts/jet_brains_mono_regular.ttf", (json) => {
        const jetBrainsFont = fontLoader.parse(json);
        const textMesh = new THREE.Mesh(
            new TextGeometry(text, {
                height: 0.01,
                size: 0.05,
                font: jetBrainsFont,
            }),
            new THREE.MeshBasicMaterial({ color: "white" })
        );
        textMesh.position.set(position.x, position.y, position.z);
        mainScene.scene.add(textMesh);
    });
};

export const addStudentHandRaise = (mainScene, position, user_id) => {
    const handRaise = new THREE.Mesh(
        new THREE.PlaneGeometry(0.2, 0.2),
        new THREE.MeshPhongMaterial({
            map: handRaiseTexture(),
            transparent: true,
            side: THREE.DoubleSide,
        })
    );
    handRaise.position.set(position.x, position.y, position.z);
    handRaise.receiveShadow = true;
    handRaise.name = `hand_raise_${user_id}`;

    mainScene.scene.add(handRaise);
};

export const addStudent = (
    mainScene,
    position,
    user_id,
    name = "",
    hideModel,
    isSelfModel = false
) => {
    const student = new THREE.Group();
    student.position.set(position.x, position.y, position.z);
    student.name = `student_${user_id}`;

    const studentBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.4, 0.2),
        new THREE.MeshPhongMaterial({
            color: isSelfModel ? "#4be586" : "#f26b6b",
        })
    );
    studentBase.position.set(0, -0.25, 0);
    studentBase.receiveShadow = true;

    // ! Adding Student Name
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load("/fonts/jet_brains_mono_regular.ttf", (json) => {
        const jetBrainsFont = fontLoader.parse(json);
        const nameMesh = new THREE.Mesh(
            new TextGeometry(name, {
                height: 0.01,
                size: 0.05,
                font: jetBrainsFont,
            }),
            new THREE.MeshBasicMaterial({ color: "white" })
        );
        nameMesh.position.set(-0.1, 0.2, 0);
        student.add(nameMesh);
    });

    student.add(studentBase);
    student.visible = !hideModel;
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
    board.name = "main_board";

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
