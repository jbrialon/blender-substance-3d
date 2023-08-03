import * as THREE from "three";
import Experience from "../Experience";

export default class Animation {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.actions = {};
    // this.controls = this.experience.transformControls;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Animations");
    }

    // Setup
    this.resource = this.resources.items.skateModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.animations = this.resource.animations;
    this.mixer = new THREE.AnimationMixer(this.model);

    this.animations.forEach((animation) => {
      let action = this.mixer.clipAction(animation);
      this.actions[animation.name] = () => {
        this.mixer.stopAllAction();
        action.play();
        this.currentAction = action;
      };
      if (this.debug.active) this.debugFolder.add(this.actions, animation.name);
    });

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.scene.add(this.model);
  }

  // Animation
  update() {
    this.mixer.update(this.time.delta * 0.001);
  }
}
