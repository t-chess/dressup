export default class SpeechBox extends Phaser.GameObjects.Container {
    constructor(scene, typingSpeed=15) {
        super(scene, 20, 460);
        this.scene = scene;
        this.typingSpeed = typingSpeed;
        this.options = [];

        this.currentLines = 2;
        this.maxCharsPerLine = 63;

        this.init();
        this.setVisible(false);
        scene.add.existing(this);
    }
    init() {
        this.box = this.scene.add.panel(0, -this.currentLines * 20, "sm", 30,this.currentLines).setStatic(true);
        this.add(this.box);
        
        this.textline = this.scene.add.text(20, -this.currentLines * 20 + 12, "", {
            font: "16px monospace",
            color: "#ffffff",
            wordWrap: { width: 580, useAdvancedWrap: true },
            lineSpacing: 2,
        }).setOrigin(0,0);
        this.add(this.textline);

        this.nextBtn = this.scene.add.text(580, -18, "▶", {
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
            this.nameBox = this.scene.add.panel(0, -this.currentLines * 20-40, "sm", Math.ceil(w / 20) + 2, 2).setText(this.character);
            this.add(this.nameBox);
        }
    }
    updateBoxSize(text) {
        const lines = Math.ceil(text.length / this.maxCharsPerLine) + 1;
        if (lines !== this.currentLines) {
            this.currentLines = lines;
            this.box.destroy();
            this.box = this.scene.add.panel(0, -this.currentLines * 20, "sm", 30, this.currentLines).setStatic(true);
            this.add(this.box);

            this.textline.setY(-this.currentLines * 20  + 12);
            if (this.nameBox) {
                this.nameBox.setY(-this.currentLines * 20-40);
            }
            this.bringToTop(this.textline);
            this.bringToTop(this.nextBtn);
        }
    }
    playDialogSequence(dialogArray, onComplete=()=>{}) {
        let index = 0;
        const playNext = () => {
            if (index < dialogArray.length) {
                const { character, text, options,callback } = dialogArray[index];
                index++;
                if (character!==this.character) {
                    this.setName(character);
                }
                if (callback) {
                    callback();
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
                this.playDialogSequence(selectedOption.response, playNext);
                break;
            case "response-break":
                this.playDialogSequence(selectedOption.response, ()=>{
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
        this.box.onClick(null);
        this.textline.setText(""); 
        this.nextBtn.setVisible(false);
        this.updateBoxSize(text);
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
                    this.box.onClick(() => {
                        this.scene.sound.play("ui_click");
                        this.setVisible(false);
                        if (onComplete) onComplete();
                    }, true);
                }
            }
        };
        typeWriter();
    }
    showOptions(options,optCallback) {
        let yOffset = this.currentLines * 20;
        options.reverse().forEach(({ text, callback, ...rest }, index) => {
            const w = Math.max(3, Math.ceil(text.length/2)+2);
            const optionPanel = this.scene.add.panel(600-w*20, -40-yOffset, "sm", w, 2).setText(text);
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