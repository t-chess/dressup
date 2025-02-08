import Phaser from "phaser";
import Loading from "./scenes/Loading";
import Main from "./scenes/Main";
import PreLoading from "./scenes/PreLoading";
import Ending from "./scenes/Ending";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "container",
  backgroundColor: "0xFFFFFF",
  scene: [PreLoading, Loading, Main, Ending],
});
