import gameState from "./gameState";

class Loading extends Phaser.Scene {
  constructor() {
    super({ key: "Loading" });
  }
  preload() {
    // loading screen
    this.load.image("bg", "assets/bg.png");
    this.add.sprite(640, 480, "bg").setPosition(320, 240);

    this.add.graphics().fillStyle(0xffffff, 1).fillRect(50, 190, 540, 180);

    this.add
      .text(320, 150, "Abigail's sweet homecoming", {
        font: "36px monospace",
        fill: "black",
        backgroundColor: "white",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ cursor: "pointer" });
    this.add.text(
      70,
      200,
      "After spending a few years away from her hometown, 19-year-old Abigail is finally visiting to reunite with her beloved mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special. Let the dress-up fun begin and create unforgettable memories for this heartwarming homecoming!",
      {
        font: "18px monospace",
        fill: "black",
        lineSpacing: 2,
        align: "center",
        wordWrap: { width: 540, useAdvancedWrap: true },
      }
    );

    let progressBox = this.add
      .graphics()
      .fillStyle(0x222222, 1)
      .fillRect(210, 395, 220, 30);
    let progressBar = this.add.graphics();
    let playButton = this.add
      .text(320, 400, "Play", {
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
        .fillRect(215, 400, 210 * value, 20);
    });
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      playButton.setVisible(true);
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

    this.loadSet("hair", "mom", true);
    this.loadSet("top", "mom", true);
    this.loadSet("bottom", "mom", true);

    this.loadSet("hand", "gail");
    this.loadSet("face", "gail");
    this.loadSet("hair", "gail");
    this.loadSet("top", "gail");
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
}

export default Loading;
