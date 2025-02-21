export default class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    this.load.setPath("assets");
    // load screen
    this.add.sprite(640, 480, "loadingBg").setPosition(320, 240);
    this.add.panel(100,120,'md',11,2, 24).setText("Gail's Sweet Homecoming");
    this.add.panel(40,200,'md',14,3).setText("After spending a few years away from her hometown, 19-year-old Abigaïl is finally visiting to reunite with her mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special.")

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

    const bodiesAtlas = {frames:[
      { filename: "mother", frame: { x: 0, y: 0, w: 187, h: 463 } },
      { filename: "abigail", frame: { x: 187, y: 0, w: 224, h: 424 } },
      { filename: "hand", frame: { x: 187, y: 424, w: 87, h: 39 } },
      { filename: "eyes", frame: { x: 274, y: 424, w: 59, h: 39 } },
    ]}
    this.load.atlas('bodies', 'bodies.png', bodiesAtlas);
    this.load.spritesheet([
      {key: 'momhair', frameConfig: {frameWidth: 191, frameHeight:176}},
      {key: 'momtop', frameConfig: {frameWidth: 216, frameHeight:361}},
      {key: 'mombottom', frameConfig: {frameWidth: 220, frameHeight:237}},
      {key: 'gailhair', frameConfig: {frameWidth: 176, frameHeight:136}},
      {key: 'gailtop', frameConfig: {frameWidth: 236, frameHeight:325}},
      {key: 'gailbottom', frameConfig: {frameWidth: 222, frameHeight:193}},
    ]);

    this.load.image("end1", "end1.png");
    this.load.image("end2", "end2.png");

    this.add.progressbar(undefined, 320, undefined, () => this.scene.start("Main"));
    this.add.soundbutton();
  }
}