class PreLoading extends Phaser.Scene {
  constructor() {
    super({ key: "PreLoading" });
  }
  preload() {
    this.load.image("bg", "assets/bg.png");
    this.load.on("complete", () => {
      this.scene.start("Loading");
    });
  }
}

export default PreLoading;
