import gameState from "./gameState";

class Loading extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }
  preload() {
    // loading screen
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      console.log(file.src);
    });
    this.load.on("complete", function () {
      console.log("complete");
      // progressBar.destroy();
      // progressBox.destroy();
    });
    // bg and bodies
    this.load.image("bg", "assets/bg.png");
    this.load.image("mother", "assets/mom.png");
    this.load.image("abigail", "assets/gail.png");

    // interface
    this.load.image("hairbtn", "assets/interface/hairbtn.png");
    this.load.image("topsbtn", "assets/interface/topsbtn.png");
    this.load.image("bottomsbtn", "assets/interface/bottomsbtn.png");
    this.load.image("rightpanel", "assets/interface/rightpanel.png");
    this.load.image("arrow", "assets/interface/arrow.png");
    this.load.image("arrowgail", "assets/interface/arrowgail.png");

    this.loadSet("hair", "mom", true);
    this.loadSet("top", "mom", true);
    this.loadSet("bottom", "mom", true);

    this.loadSet("hand", "gail");
    this.loadSet("face", "gail");
    this.loadSet("hair", "gail");
  }
  loadSet(name, who, withPreview) {
    let total = gameState[who][name + "total"];
    for (var i = 1; i <= total; i++) {
      this.load.image(
        who + name + i,
        "assets/" + who + "/" + name + i + ".png"
      );
      if (withPreview) {
        this.load.image(
          who + name + "preview" + i,
          "assets/" + who + "/" + name + "preview" + i + ".png"
        );
      }
    }
  }
  createPlayButton() {
    const playButton = this.add.text(400, 350, "Play", {
      fontSize: "32px",
      fill: "#fff",
    });
    playButton.setOrigin(0.5);
    playButton.setInteractive({ useHandCursor: true });
    playButton.on("pointerdown", () => this.startGame());
  }

  startGame() {
    this.scene.start("Game");
  }
}

export default Loading;
