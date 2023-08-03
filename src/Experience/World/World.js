import Experience from "../Experience";
import Environment from "./Environment";
import Cube from "./Cube";
import Watch from "./Watch";
import Animation from "./Animation";
import Ground from "./Ground";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      // this.cube = new Cube();
      this.watch = new Watch();
      // this.animation = new Animation();
      // this.ground = new Ground();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.cube) this.cube.update();
    if (this.watch) this.watch.update();
    if (this.animation) this.animation.update();
  }
}
