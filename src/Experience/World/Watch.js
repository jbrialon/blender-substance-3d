import * as THREE from "three";
import Experience from "../Experience";

export default class Watch {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.controls = this.experience.transformControls;
    this.metalMaterial = null;

    // Options
    this.debugFolder = this.debug.ui.addFolder("Watch");
    this.options = {
      metalMaterialColor: new THREE.Color(0x0b0a0a),
    };

    // Setup
    this.resource = this.resources.items.watchModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material.name === "metal" && !this.metalMaterial) {
          this.metalMaterial = child.material;
          this.options.metalMaterialColor = child.material.color;
        }
      }
    });
    this.debugFolder
      .addColor(this.options, "metalMaterialColor")
      .name("Metal Material Color")
      .onChange(() => {
        this.metalMaterial.color.set(this.options.metalMaterialColor);
      });

    this.model.scale.set(0.1, 0.1, 0.1);
    this.model.rotation.set(
      2.403496113504702,
      -0.007089392424503884,
      3.135144249136255
    );

    this.scene.add(this.model);
    this.controls.attach(this.model);
  }

  update() {
    // Cube Animation
  }
}
