import Experience from "../Experience";
import Environment from "./Environment";
import Cube from "./Cube";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.cube = new Cube();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.cube) this.cube.update();
  }
}
