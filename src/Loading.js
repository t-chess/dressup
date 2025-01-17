import gameState from "./gameState";

class Loading extends Phaser.Scene {
  constructor() {
    super({ key: "Loading" });
  }
  preload() {
    // loading screen
    Array.from({ length: gameState.bgtotal - 1 }, (_, i) => i + 2).forEach(
      (i) => {
        this.load.image("bg" + i, "assets/bg" + i + ".png");
      }
    );

    this.add.sprite(640, 480, "bg1").setPosition(320, 240);
    this.add.sprite(640, 480, "hugepanel").setPosition(320, 240);

    this.add
      .text(320, 140, "Abigail's Sweet Homecoming", {
        font: "35px monospace",
        fill: "black",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ cursor: "pointer" });
    this.add
      .text(
        320,
        240,
        "After spending a few years away from her hometown, 19-year-old Abigail is finally visiting to reunite with her beloved mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special.",
        {
          font: "18px monospace",
          fill: "black",
          lineSpacing: 2,
          align: "center",
          wordWrap: { width: 540, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5, 0.5);

    let progressBox = this.add
      .graphics()
      .fillStyle(0x222222, 1)
      .fillRect(210, 335, 220, 30);
    let progressBar = this.add.graphics();
    let playButton = this.add
      .text(320, 340, "Play", {
        font: "36px monospace",
        fill: "#fff",
        backgroundColor: "black",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ cursor: "pointer" });
    playButton.on("pointerdown", () => this.scene.start("Game"));
    playButton.setVisible(false);

    this.load.on("progress", function (value) {
      progressBar
        .clear()
        .fillStyle(0xffffff, 1)
        .fillRect(215, 340, 210 * value, 20);
    });
    // !!!!!!!!! remove
    const start = () => {
      this.scene.start("Game");
    };
    //
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      playButton.setVisible(true);
      // start(); // !!!!!!!!!!! remove
    });
    // bodies
    this.load.image("mother", "assets/mom.png");
    this.load.image("abigail", "assets/gail.png");

    // interface
    this.load.image("hairbtn", "assets/interface/hairbtn.png");
    this.load.image("topsbtn", "assets/interface/topsbtn.png");
    this.load.image("bottomsbtn", "assets/interface/bottomsbtn.png");
    this.load.image("rightpanel", "assets/interface/rightpanel.png");
    this.load.image("arrow", "assets/interface/arrow.png");
    this.load.image("arrowgail", "assets/interface/arrowgail.png");
    this.load.image("arrowmom", "assets/interface/arrowmom.png");
    this.load.image("btndone", "assets/interface/btndone.png");
    this.load.image("bgbtn", "assets/interface/bgbtn.png");
    this.load.image("musicon", "assets/interface/musicon.png");
    this.load.image("musicoff", "assets/interface/musicoff.png");

    this.load.audio("music", "assets/interface/LastWaltz.mp3");

    this.loadSet("hair", "mom");
    this.loadSet("top", "mom");
    this.loadSet("bottom", "mom");

    this.loadSet("hair", "gail");
    this.loadSet("top", "gail");
    this.loadSet("bottom", "gail");

    this.load.image("hand", "assets/hand.png");
    this.load.image("eyes", "assets/mom/eyes.png");
  }
  loadSet(name, who) {
    let total = gameState[who][name + "total"];
    for (var i = 1; i <= total; i++) {
      this.load.image(
        who + name + i,
        "assets/" + who + "/" + name + i + ".png"
      );
      this.load.image(
        who + name + "preview" + i,
        "assets/" + who + "/" + name + "preview" + i + ".png"
      );
    }
  }
}

export default Loading;
