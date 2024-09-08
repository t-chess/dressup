import gameState from "./gameState";
import phrases from "./phrases.json";

class Ending extends Phaser.Scene {
  constructor() {
    super({ key: "Ending" });
  }
  preload() {
    this.load.image("end1", "assets/end1.png");
    this.load.image("end2", "assets/end2.png");
    this.load.image("bigpanel", "assets/interface/bigpanel.png");
  }
  create() {
    const supermap = (who) => {
      let arr = gameState.chosenItems
        .filter((i) => i.includes(who))
        .map((i) => i.replace(who, ""));
      let obj = {};
      arr.forEach((string) => {
        let number = string.replace(/[a-zA-Z]/g, ""),
          letters = string.replace(number, "");
        obj[letters] = Number(number);
      });
      return obj;
    };
    let mom = supermap("mom");

    if ([9].includes(mom.hair) || [3, 6].includes(mom.top)) {
      this.ending = 1; //present
    } else if ([5, 10].includes(mom.hair) || [4].includes(mom.top)) {
      this.ending = 2; //past
    } else if (
      [
        [1, 2, 6].includes(mom.hair),
        [2, 5].includes(mom.top),
        [1, 2, 5].includes(mom.bottom),
      ].filter(Boolean).length > 1
    ) {
      this.ending = 2;
    } else {
      this.ending = 1;
    }

    this.phrases = phrases["end" + this.ending];

    this.bg = this.add
      .sprite(640, 480, this.ending === 1 ? "end1" : "end2")
      .setPosition(0, 0)
      .setOrigin(0)
      .setVisible(false);
    this.musicon = this.add
      .sprite(640, 480, "musicon")
      .setPosition(590, 50)
      .setVisible(gameState.musicPause.play ? true : false)
      .setInteractive({ cursor: "pointer" });
    this.musicoff = this.add
      .sprite(640, 480, "musicoff")
      .setVisible(gameState.musicPause.play ? false : true)
      .setPosition(590, 50)
      .setInteractive({ cursor: "pointer" });

    this.next = this.add
      .sprite(640, 480, "arrow")
      .setVisible(false)
      .setPosition(this.ending === 1 ? 300 : 550, 330)
      .setInteractive({ cursor: "pointer" });
    this.next.on("pointerdown", () => {
      this.next.setVisible(false);
      this.printText();
    });

    this.music = this.sound.add("music");
    this.music.loop = true;
    if (gameState.musicPause.play) {
      this.music.play({ seek: gameState.musicPause.time });
    } else {
      this.music.play();
      this.music.pause();
    }
    this.sound.pauseOnBlur = false;
    this.musicoff.on("pointerdown", () => {
      this.music.resume();
      this.musicoff.visible = false;
      this.musicon.visible = true;
    });
    this.musicon.on("pointerdown", () => {
      this.music.pause();
      this.musicoff.visible = true;
      this.musicon.visible = false;
    });

    setTimeout(() => {
      this.msg = this.add.group();
      let panel = this.add.sprite(640, 480, "bigpanel").setPosition(320, 240);
      let text = this.add
        .text(
          320,
          220,
          `While Abigail was sorting through old things and getting ready for the ceremony, she found ${
            this.ending === 1 ? "a" : "an old"
          } photograph with a handwritten note on the back.`,
          {
            font: "18px monospace",
            fill: "black",
            lineSpacing: 2,
            align: "center",
            wordWrap: { width: 320, useAdvancedWrap: true },
          }
        )
        .setOrigin(0.5, 0.5);

      setTimeout(() => {
        let ok = this.add
          .text(320, 300, `Look`, {
            font: "22px monospace",
            fill: "black",
          })
          .setOrigin(0.5, 0.5)
          .setInteractive({ cursor: "pointer" });
        this.msg.add(panel);
        this.msg.add(text);
        this.msg.add(ok);
        ok.on("pointerdown", () => {
          this.textIndex = 0;
          this.msg.setVisible(false);
          this.bg.setVisible(true);
          setTimeout(() => {
            this.printText();
          }, 1000);
        });
      }, 2000);
    }, 2000);
  }
  printText() {
    let styleObject = {
      font: "16px monospace",
      backgroundColor: "white",
      lineSpacing: 2,
      color: "black",
      wordWrap: { width: 280, useAdvancedWrap: true },
    };
    this.textik?.destroy();
    if (this.phrases[this.textIndex]) {
      this.textik = this.add
        .text(
          this.ending === 1 ? 30 : 330,
          240,
          this.phrases[this.textIndex],
          styleObject
        )
        .setOrigin(0, 0.5);
      this.textIndex += 1;

      setTimeout(() => {
        this.next.setVisible(true);
      }, 2000);
    } else {
      this.musicoff.setVisible(false);
      this.musicon.setVisible(false);
      setTimeout(() => {
        this.add
          .text(620, 460, "Thanks for playing <3\nMorry", {
            ...styleObject,
            align: "right",
          })
          .setOrigin(1, 1);
      }, 5000);
    }
  }
}

export default Ending;
