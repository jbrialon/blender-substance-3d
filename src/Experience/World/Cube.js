import * as THREE from "three";
import Experience from "../Experience";

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Cube");
    }

    // Setup
    this.resource = this.resources.items.cubeModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (this.debug.active) {
    }

    this.model.rotation.y = Math.PI;
    this.scene.add(this.model);
  }

  setAnimation() {}

  update() {
    // Cube Animation
  }
}
