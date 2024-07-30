class PreLoading extends Phaser.Scene {
  constructor() {
    super({ key: "PreLoading" });
  }
  preload() {
    this.load.image("bg1", "assets/bg1.png");
    this.load.on("complete", () => {
      this.scene.start("Loading");
    });
  }
}

export default PreLoading;
