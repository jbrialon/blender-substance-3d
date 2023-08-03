import * as THREE from "three";
import Experience from "../Experience";
const cubeTextureLoader = new THREE.CubeTextureLoader();

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
    }

    // Setup
    this.setAmbientLight();
    this.setEnvMap();
    this.setSunLight();
  }

  setEnvMap() {
    this.environmentMap = cubeTextureLoader.load([
      "/textures/environmentMaps/2/px.png",
      "/textures/environmentMaps/2/nx.png",
      "/textures/environmentMaps/2/py.png",
      "/textures/environmentMaps/2/ny.png",
      "/textures/environmentMaps/2/pz.png",
      "/textures/environmentMaps/2/nz.png",
    ]);

    this.environmentMap.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = this.environmentMap;
    this.scene.environment = this.environmentMap;
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(0.25, 2, -2.25);
    this.scene.add(this.sunLight);

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);
    }
  }
}
