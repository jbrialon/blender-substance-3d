import Experience from "../Experience";
import * as THREE from "three";
import { TransformControls } from "three/addons/controls/TransformControls.js";

export default class Performance {
  constructor() {
    this.active = window.location.hash === "#debug";
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.debug = this.experience.debug;

    // Setup
    if (this.active) this.init();
    if (this.active) this.addEvents();
  }

  init() {
    this.instance = new TransformControls(
      this.experience.camera.instance,
      this.experience.canvas
    );

    this.instance.enabled = false;
    this.instance.showX = false;
    this.instance.showY = false;
    this.instance.showZ = false;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Transform Controls");
      this.debugFolder.add(this.instance, "enabled").onChange((value) => {
        this.instance.showX = value;
        this.instance.showY = value;
        this.instance.showZ = value;
      });
    }

    this.scene.add(this.instance);
  }

  addEvents() {
    // this.experience.canvas.addEventListener("click", () => {
    //   if (this.debug.active && this.instance.enabled) this.onMeshClick();
    // });

    // if controls are used we disabled the camera orbit
    this.instance.addEventListener("dragging-changed", (event) => {
      console.log(this.activeMesh.position, this.activeMesh.rotation);
      this.experience.camera.controls.enabled = !event.value;
    });

    window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 71: // G
          this.instance.setMode("translate");
          break;

        case 82: // R
          this.instance.setMode("rotate");
          break;

        case 83: // s
          this.instance.setMode("scale");
          break;
      }
    });
  }

  onMeshClick() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Calculate normalized device coordinates (NDC) from mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster from the camera through the mouse
    raycaster.setFromCamera(mouse, this.experience.camera.instance);

    // Get the list of objects intersected by the ray
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      // Find the first object of type Mesh in the intersections array
      const intersectedMesh = intersects.find((intersection) => {
        return intersection.object && intersection.object.type === "Mesh";
      }).object;
      if (this.activeMesh && this.activeMesh !== intersectedMesh) {
        this.detachControlsFromMesh();
      }
      this.attachControlsToMesh(intersectedMesh);
    } else {
      this.detachControlsFromMesh();
    }
  }

  attachControlsToMesh(mesh) {
    this.activeMesh = mesh;
    this.instance.attach(mesh);
  }

  detachControlsFromMesh() {
    if (this.activeMesh) {
      this.instance.detach();
      this.activeMesh = null;
    }
  }

  attach(model) {
    if (model && this.active) {
      this.activeMesh = model;
      this.instance.attach(this.activeMesh);
    }
  }
}
