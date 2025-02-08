import Panel from "./Panel";
import ProgressBar from "./ProgressBar";

export default class BootScene extends Phaser.Scene {
    constructor(bg, next="Loading" ) {
        super({ key:"Boot" });
        this.loadingBg = bg;
        this.afterBootScene = next;
    }
    init() {
        Phaser.GameObjects.GameObjectFactory.register('panel', function (...args){
            const obj = new Panel(this.scene, ...args)
            this.displayList.add(obj);
            return obj;
        });
        Phaser.GameObjects.GameObjectFactory.register('progressbar', function (...args){
            const obj = new ProgressBar(this.scene, ...args)
            this.displayList.add(obj);
            return obj;
        });
    }
    preload() {
        this.load.atlas("ui_atlas","assets/interface/ui.png","assets/interface/ui.json");
        this.load.audio("ui_click", "assets/interface/lighter.mp3");
        
        if (this.loadingBg) {
            this.load.image("loadingBg", this.loadingBg);
        }
    }
    create() {
        const uiFrames = this.textures.get('ui_atlas').getFrameNames();

        // console.log(uiFrames)
        // const img = this.add.image(20, 460, 'ui_atlas', uiFrames[0]).setOrigin(0,1);


        this.time.delayedCall(100, () => {
            this.scene.start(this.afterBootScene);
        });

    }
}
