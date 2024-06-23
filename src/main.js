import Phaser from "phaser";
import preload from "./preload";
import create from "./create";
import update from "./update";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }
  preload() {
    preload.call(this);
  }
  create() {
    create.call(this);
  }
  update() {
    update.call(this);
  }
}
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: "#5f2a55",
  parent: "container",
  scene: GameScene,
});
