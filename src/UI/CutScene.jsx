/*
scenesArray = [sceneType];
sceneType = {
    bgKey: "key of preloaded image",
    dialog: [dialogType]
}
dialogType = {
    character: "Name",
    text: [string],
    typingSpeed
}

TODO : dialog with options 

*/

export default class CutScene extends Phaser.Scene {
    constructor(key, scenesArray=[], nextScene) {
      super({key});
      this.scenesArray = scenesArray;
      this.nextScene = nextScene;
    }
    create() {
        this.nextIndex = 0;
        this.scenesArray.forEach(scene => {
            this[scene.bgKey] = this.add
              .sprite(640, 480, scene.bgKey)
              .setVisible(false)
              .setPosition(320, 240);
        });
        this.nextArrow = this.add.image(620, 460, "ui_atlas", "arrow-solo").setOrigin(1).setVisible(false);
        this.speechbox = this.add.speechbox();

        this.continue();
    }
    continue() {
        if (this.nextIndex===this.scenesArray.length) {
            this.scene.start(this.nextScene);
            return
        }
        this.nextArrow.setVisible(false);
        const currentScene = this.scenesArray[this.nextIndex];
        this[currentScene.bgKey].setVisible(true);

        this.time.delayedCall(1000, ()=>{
            if (!currentScene.dialog||!currentScene.dialog.length) {
                this.nextArrow.setVisible(true);
                this[currentScene.bgKey].setInteractive();
                this[currentScene.bgKey].once("pointerdown", () => {
                    this.sound.play("ui_click");
                    this.continue();
                });
            } else {
                this.playDialogSequence(currentScene.dialog, () => {
                    this.time.delayedCall(500, () => {
                        this.continue();
                    });
                });
            }
        })
        this[currentScene.bgKey].setVisible(true);
        this.nextIndex++;

    }
    playDialogSequence(dialogArray, onComplete) {
        let index = 0;
        let char;
        const playNext = () => {
            if (index < dialogArray.length) {
                const { character, text } = dialogArray[index];
                index++;
                if (character!==char) {
                    this.speechbox.setName(character);
                    char = character;
                }
                this.speechbox.run(text, playNext);
            } else {
                onComplete();
            }
        };
        playNext();
    }

}