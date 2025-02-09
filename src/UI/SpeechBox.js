export default class SpeechBox extends Phaser.GameObjects.Container {
    constructor(scene, typingSpeed=15) {
        super(scene, 20, 420);
        this.scene = scene;
        this.typingSpeed = typingSpeed;

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
    run(text, onComplete){
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
                this.nextBtn.setVisible(true);
                this.box.setInteractive();
                this.box.once("pointerdown", () => {
                    this.scene.sound.play("ui_click");
                    this.setVisible(false);
                    if (onComplete) onComplete();
                });
            }
        };
        typeWriter();
    }
}