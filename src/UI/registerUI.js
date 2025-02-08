import Button from "./Button";

const registerUI = () => {
    Phaser.GameObjects.GameObjectFactory.register('button', function (x, y, text, callback){
        return this.displayList.add(new Button(this.scene, x, y, text, callback));
    });
}
export default registerUI;