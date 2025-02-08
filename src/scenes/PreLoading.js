import registerUI from "../UI/registerUI";

export default class PreLoading extends Phaser.Scene {
  constructor() {
    super({ key: "PreLoading" });
  }
  init() {
    registerUI();

  }
  preload() {
    this.load.image("bg1", "assets/bg1.png");
    this.load.image("hugepanel", "assets/interface/hugepanel.png");
    this.load.on("complete", () => {
      this.scene.start("Loading");
    });
  }
}
