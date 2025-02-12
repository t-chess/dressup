export default class SpeechBox extends Phaser.GameObjects.Container {
    constructor(scene, typingSpeed=15) {
        super(scene, 20, 420);
        this.scene = scene;
        this.typingSpeed = typingSpeed;
        this.options = [];

        this.init();
        this.setVisible(false);
        scene.add.existing(this);
    }
    init() {
        this.box = this.scene.add.image(0, 0, "ui_atlas", "speechline").setOrigin(0);
        this.add(this.box);
        
        this.textline = this.scene.add.text(20, 20, "", {
            font: "16px monospace",
            color: "#ffffff"
        }).setOrigin(0,0.5);
        this.add(this.textline);

        this.nextBtn = this.scene.add.text(580, 20, "▶", {
            font: "16px monospace",
            color: "#ffffff",
        })
        .setOrigin(1,0.5)
        .setVisible(false);
        this.add(this.nextBtn);
    }
    setName(name) {
        this.character = name;
        if (this.nameBox) {
            this.nameBox.destroy();
        }
        if (name) {
            const w = Math.max(4, this.character.length) * 10;
            this.nameBox = this.scene.add.panel(0, -40, "sm", Math.ceil(w / 20) + 2, 2, this.character);
            this.add(this.nameBox);
        }
    }
    playDialogSequence(dialogArray, onComplete=()=>{}) {
        let index = 0;
        const playNext = () => {
            if (index < dialogArray.length) {
                const { character, text, options } = dialogArray[index];
                index++;
                if (character!==this.character) {
                    this.setName(character);
                }
                this.run(text, options, (selectedOption)=>{
                    this.handleOption(selectedOption, playNext)
                });
            } else {
                onComplete();
            }
        };
        playNext();
    }
    handleOption(selectedOption, playNext) {
        if (!selectedOption || !selectedOption.after){
            playNext();
            return
        }
        switch (selectedOption.after) {
            case "continue":
                playNext();
                break;
            case "break":
                this.scene.scene.start(selectedOption.next);
                break;
            case "response-continue":
                this.run(selectedOption.response, [], playNext);
                break;
            case "response-break":
                this.run(selectedOption.response, [], ()=>{
                    this.scene.scene.start(selectedOption.next);
                });
                break;
            default:
                playNext();
                break;
        }
    }
    run(text, options=[], onComplete){
        this.clearOptions();
        this.setVisible(true);
        this.box.disableInteractive();
        this.textline.setText(""); 
        this.nextBtn.setVisible(false);
        let index = 0;
        let currentText = "";
        const typeWriter = () => {
            if (index < text.length) {
                currentText += text[index];
                this.textline.setText(currentText);
                index++;
                this.scene.time.delayedCall(this.typingSpeed, typeWriter);
            } else {
                if (options.length > 0) {
                    this.showOptions(options,onComplete);
                } else {
                    this.nextBtn.setVisible(true);
                    this.box.setInteractive({ cursor: "pointer" });
                    this.box.once("pointerdown", () => {
                        this.scene.sound.play("ui_click");
                        this.setVisible(false);
                        if (onComplete) onComplete();
                    });
                }
            }
        };
        typeWriter();
    }
    showOptions(options,optCallback) {
        let yOffset = 0;
        options.reverse().forEach(({ text, callback, ...rest }, index) => {
            const optionPanel = this.scene.add.panel(400, -40-yOffset, "sm", 10, 2, text);
            optionPanel.onClick(() => {
                this.scene.sound.play("ui_click");
                this.clearOptions(); 
                this.setVisible(false);
                if (callback) callback();
                if (optCallback) optCallback({text,...rest})
            });
            this.options.push(optionPanel);
            this.add(optionPanel);
            yOffset += 40;
        });
    }
    clearOptions(){
        this.options.forEach(option => option.destroy());
        this.options = [];
    }

}