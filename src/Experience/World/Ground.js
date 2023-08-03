import * as THREE from "three";
import Experience from "../Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Options
    this.options = {};

    // Debug
    if (this.debug.active) {
      // this.debugFolder = this.debug.ui.addFolder("Ground");
    }

    // Setup
    this.setModel();
  }

  setModel() {
    this.modelGeometry = new THREE.PlaneGeometry(50, 50, 25);
    this.modelMaterial = new THREE.MeshStandardMaterial();
    this.model = new THREE.Mesh(this.modelGeometry, this.modelMaterial);

    this.model.rotation.x = -Math.PI * 0.5;
    this.model.position.y = 0;
    this.model.receiveShadow = true;
    this.model.position.z = 5;

    this.scene.add(this.model);
  }

  update() {}
}
