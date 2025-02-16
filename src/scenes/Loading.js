export default class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    this.load.setPath("assets");
    // load screen
    this.add.sprite(640, 480, "loadingBg").setPosition(320, 240);
    this.add.panel(100,120,'md',11,2, "Gail's Sweet Homecoming", 24);
    this.add.panel(40,200,'md',14,3, "After spending a few years away from her hometown, 19-year-old Abigaïl is finally visiting to reunite with her mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special.")

    // bgs & cutscenes
    Array.from({ length: 4 }, (_, i) => i + 1).forEach(
      (i) => {
        this.load.image("bg" + i, "bg" + i + ".png");
      }
    );
    Array.from({ length: 5 }, (_, i) => i + 1).forEach(
      (i) => {
        i>0&&this.load.image("cut" + i, "scenes/cut" + i + ".png");
      }
    );

    // audio
    this.load.audio("sea", "scenes/sea.mp3");
    this.load.audio("aggrolighter", "scenes/aggrolighter.mp3");
    this.load.audio("zippo", "scenes/zippo.mp3");
    this.load.audio("music", "music.mp3");

    // interface
    this.load.image("btndone", "interface/btndone.png");

    // dressup 
    this.load.image("mother", "mom.png");
    this.load.image("abigail", "gail.png");

    this.load.spritesheet([
      {key: 'momhair', frameConfig: {frameWidth: 191, frameHeight:176}},
      {key: 'momtop', frameConfig: {frameWidth: 216, frameHeight:361}}
    ]);
    
    this.load.image("hand", "hand.png");
    this.load.image("eyes", "eyes.png");

    this.add.progressbar(undefined, 320, undefined, () => this.scene.start("Main"));
    this.add.soundbutton();
  }
}