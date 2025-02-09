import gameState from "../gameState";

export default class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    this.load.setPath("assets");
    // loading screen
    Array.from({ length: gameState.bgtotal }, (_, i) => i + 1).forEach(
      (i) => {
        this.load.image("bg" + i, "bg" + i + ".png");
      }
    );
    Array.from({ length: gameState.cutScenes }, (_, i) => i + 1).forEach(
      (i) => {
        i>0&&this.load.image("cut" + i, "scenes/cut" + i + ".png");
      }
    );

    this.add.sprite(640, 480, "loadingBg").setPosition(320, 240);
    const title = this.add.panel(100,120,'md',11,2, "Abigail's Sweet Homecoming", 24)
    title.invertColors();
    const panel1 = this.add.panel(40,200,'md',14,3, "After spending a few years away from her hometown, 19-year-old Abigaïl is finally visiting to reunite with her mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special.")
    panel1.invertColors();

    this.add.progressbar(undefined, 320, undefined, () => this.scene.start("Intro"))
    const start = () => {
      this.scene.start("Main");
    };

    // bodies
    this.load.image("mother", "mom.png");
    this.load.image("abigail", "gail.png");

    // interface
    this.load.image("hairbtn", "interface/hairbtn.png");
    this.load.image("topsbtn", "interface/topsbtn.png");
    this.load.image("bottomsbtn", "interface/bottomsbtn.png");
    this.load.image("rightpanel", "interface/rightpanel.png");
    this.load.image("arrow", "interface/arrow.png");
    this.load.image("arrowgail", "interface/arrowgail.png");
    this.load.image("arrowmom", "interface/arrowmom.png");
    this.load.image("btndone", "interface/btndone.png");
    this.load.image("bgbtn", "interface/bgbtn.png");
    this.load.image("musicon", "interface/musicon.png");
    this.load.image("musicoff", "interface/musicoff.png");

    this.load.audio("music", "interface/LastWaltz.mp3");

    this.loadSet("hair", "mom");
    this.loadSet("top", "mom");
    this.loadSet("bottom", "mom");

    this.loadSet("hair", "gail");
    this.loadSet("top", "gail");
    this.loadSet("bottom", "gail");

    this.load.image("hand", "hand.png");
    this.load.image("eyes", "mom/eyes.png");
  }
  loadSet(name, who) {
    let total = gameState[who][name + "total"];
    for (var i = 1; i <= total; i++) {
      this.load.image(
        who + name + i,
        who + "/" + name + i + ".png"
      );
      this.load.image(
        who + name + "preview" + i,
        who + "/" + name + "preview" + i + ".png"
      );
    }
  }
}
