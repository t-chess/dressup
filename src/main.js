import Phaser from "phaser";
import Loading from "./Loading";
import Game from "./Game";
import PreLoading from "./PreLoading";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "container",
  scene: [PreLoading, Loading, Game],
});
