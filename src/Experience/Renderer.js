import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SAOPass } from "three/addons/postprocessing/SAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    // Setup
    this.setInstance();
    this.setDebug();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });

    // this.composer = new EffectComposer(this.instance);
    // this.renderPass = new RenderPass(this.scene, this.camera.instance);
    // this.composer.addPass(this.renderPass);
    // this.saoPass = new SAOPass(this.scene, this.camera.instance, false, true);
    // this.composer.addPass(this.saoPass);
    // const outputPass = new OutputPass();
    // this.composer.addPass(outputPass);
    // this.composer.setSize(this.sizes.width, this.sizes.height);

    // this.saoPass.params.saoKernelRadius = 16;
    // this.saoPass.params.saoIntensity = 0.05;

    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  // Debug
  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("World");
      this.debugFolder.add(this.instance, "toneMapping", {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
      });

      this.debugFolder.add(this.instance, "toneMappingExposure", 0, 10, 0.001);

      // this.debugFolder
      //   .add(this.saoPass.params, "output", {
      //     Beauty: SAOPass.OUTPUT.Beauty,
      //     "Beauty+SAO": SAOPass.OUTPUT.Default,
      //     SAO: SAOPass.OUTPUT.SAO,
      //     Depth: SAOPass.OUTPUT.Depth,
      //     Normal: SAOPass.OUTPUT.Normal,
      //   })
      //   .onChange((value) => {
      //     this.saoPass.params.output = parseInt(value);
      //   });

      // this.debugFolder.add(this.saoPass.params, "saoBias", -1, 1);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoIntensity", 0, 1)
      //   .step(0.001);
      // this.debugFolder.add(this.saoPass.params, "saoScale", 0, 10).step(0.001);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoKernelRadius", 1, 100)
      //   .step(0.001);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoMinResolution", 0, 1)
      //   .step(0.001);
      // this.debugFolder.add(this.saoPass.params, "saoBlur").step(0.001);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoBlurRadius", 0, 200)
      //   .step(0.001);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoBlurStdDev", 0.5, 150)
      //   .step(0.001);
      // this.debugFolder
      //   .add(this.saoPass.params, "saoBlurDepthCutoff", 0.0, 0.1)
      //   .step(0.001);
    }
  }
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    // this.composer.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
    // this.composer.render();
  }
}
