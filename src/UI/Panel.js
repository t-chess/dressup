export default class Panel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, type='md', width, height, text, fontSize=16) {
        super(scene, x, y);
        this.scene = scene;
        this.type = type;
        this.tileSize = type==="sm"?20:40;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.inverted = false;

        this.init();
        if (text) this.addText();
        scene.add.existing(this);
    }
    init() {
        const addTile = (x, y, frame) => this.add(this.scene.add.image(x, y, "ui_atlas", frame).setOrigin(0));

        let bg = this.scene.add.rectangle(
            this.tileSize, this.tileSize, 
            (this.width - 2) * this.tileSize, (this.height - 2) * this.tileSize, 
            0x000000
        ).setOrigin(0);
        this.add(bg);
        this.background = bg;

        // Top 
        addTile(0, 0, `${this.type}-lt`);
        for (let i = 1; i < this.width - 1; i++) {
            addTile(i * this.tileSize, 0, `${this.type}-t`);
        }
        addTile((this.width - 1) * this.tileSize, 0, `${this.type}-rt`);

        // Middle 
        for (let j = 1; j < this.height - 1; j++) {
            addTile(0, j * this.tileSize, `${this.type}-l`);
            addTile((this.width - 1) * this.tileSize, j * this.tileSize, `${this.type}-r`);
        }

        // Bottom
        addTile(0, (this.height - 1) * this.tileSize, `${this.type}-lb`);
        for (let i = 1; i < this.width - 1; i++) {
            addTile(i * this.tileSize, (this.height - 1) * this.tileSize, `${this.type}-b`);
        }
        addTile((this.width - 1) * this.tileSize, (this.height - 1) * this.tileSize, `${this.type}-rb`);
    }

    addText() {
        this.add(this.scene.add.text(
            (this.width * this.tileSize) / 2,
            (this.height * this.tileSize) / 2,
            this.text,
            {
                fontSize: `${this.fontSize}px`,
                color: "#ffffff",
                align: "center",
                lineSpacing: 2,
                wordWrap: { width: (this.width-1) * this.tileSize, useAdvancedWrap: true },
            }
        ).setOrigin(0.5)); 
    }
    onClick(callback) {
        if (!callback) {
            this.disableInteractive();
            return
        }
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width * this.tileSize, this.height * this.tileSize), Phaser.Geom.Rectangle.Contains);
        this.on("pointerover", () => {
            this.scene.input.setDefaultCursor("pointer");
            this.setPosition(this.x, this.y - 2);
        });
        this.on("pointerout", () => {
            this.scene.input.setDefaultCursor("default"); 
            this.setPosition(this.x, this.y + 2);
        });
        this.on("pointerdown", () => {
            this.scene.sound.play("ui_click");
            this.scene.input.setDefaultCursor("default"); 
            callback();
        });
    }
    invertColors(mode='toggle') {
        if ((mode === 'on' && this.inverted) || (mode === 'off' && !this.inverted)) return;
        this.list.forEach(child => {
            if (child.preFX) {
                child.preFX.addColorMatrix().negative();           
            }
        });
        this.background.setFillStyle(this.background.fillColor === 0x000000 ? 0xffffff : 0x000000);
        this.inverted = !this.inverted; 
    }
    

}
