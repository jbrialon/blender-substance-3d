import * as THREE from "three";
import Experience from "../Experience";

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.controls = this.experience.transformControls;

    // Setup
    this.resource = this.resources.items.cubeModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.cubeOne = this.model.clone();
    this.cubeOne.position.set(-1.35, 1, 0);
    this.cubeOne.rotation.set(-Math.PI, 0.34, -Math.PI);
    this.scene.add(this.cubeOne);
    this.controls.attach(this.cubeOne);

    this.cubeTwo = this.model.clone();
    this.cubeTwo.position.set(0.89, 1, 0.73);
    this.cubeTwo.rotation.set(-Math.PI, -0.27, -Math.PI);
    this.scene.add(this.cubeTwo);

    this.cubeThree = this.model.clone();
    this.cubeThree.position.set(-0.35, 3, 0.36);
    this.cubeThree.rotation.set(-Math.PI, 0.14, -Math.PI);
    this.scene.add(this.cubeThree);
    this.controls.attach(this.cubeTwo);
  }

  update() {
    // Cube Animation
  }
}
