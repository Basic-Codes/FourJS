import * as THREE from "three";

export const woodTexture = () => {
    return new THREE.TextureLoader().load("/textures/wood.jpg");
};
export const wood2Texture = () => {
    return new THREE.TextureLoader().load("/textures/wood2.jpg");
};
export const ironTexture = () => {
    return new THREE.TextureLoader().load("/textures/iron.jpg");
};
export const tilesTexture = () => {
    const texture = new THREE.TextureLoader().load("/textures/tiles.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
};
export const wallTexture = () => {
    const texture = new THREE.TextureLoader().load("/textures/wall.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
};
export const handRaiseTexture = () => {
    return new THREE.TextureLoader().load("/textures/hand_raise.png");
};
