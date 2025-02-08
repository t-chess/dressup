export default class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, callback) {
        super(scene, x, y);
        
        // Create background (rounded rectangle)
        this.bg = scene.add.graphics();
        this.bg.fillStyle(0x3498db, 1); // Blue color
        this.bg.fillRoundedRect(0, 0, 150, 50, 10);
        
        // Create text
        this.label = scene.add.text(75, 25, text, {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial',
        }).setOrigin(0.5);
        
        // Add elements to container
        this.add(this.bg);
        this.add(this.label);
        
        // Make interactive
        this.setSize(150, 50);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 150, 50), Phaser.Geom.Rectangle.Contains);
        
        // Add events
        this.on('pointerdown', () => {
            if (callback) callback();
            this.bg.clear();
            this.bg.fillStyle(0x2980b9, 1); // Darker blue on click
            this.bg.fillRoundedRect(0, 0, 150, 50, 10);
        });

        this.on('pointerover', () => {
            this.bg.clear();
            this.bg.fillStyle(0x5dade2, 1); // Lighter blue on hover
            this.bg.fillRoundedRect(0, 0, 150, 50, 10);
        });

        this.on('pointerout', () => {
            this.bg.clear();
            this.bg.fillStyle(0x3498db, 1); // Reset color
            this.bg.fillRoundedRect(0, 0, 150, 50, 10);
        });

        scene.add.existing(this);
    }
}
