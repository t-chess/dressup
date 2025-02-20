import Phaser from "phaser";
import Loading from "./scenes/Loading";
import Main from "./scenes/Main";
import Ending from "./scenes/Ending";
import BootScene from "./UI/BootScene";
import { Intro } from "./scenes/CutScenes";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "container",
  backgroundColor: "0x000",
  dom: {createContainer: true},
  scene: [new BootScene("assets/scenes/cut1.png"), Loading, Intro, Main, Ending],
});
