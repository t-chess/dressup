import Phaser from "phaser";
import Loading from "./scenes/Loading";
import Main from "./scenes/Main";
import Ending from "./scenes/Ending";
import BootScene from "./UI/BootScene";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "container",
  backgroundColor: "0xFFFFFF",
  scene: [new BootScene("assets/bg1.png"), Loading, Main, Ending],
});
