export default class SpeechBox extends UIComponentPrototype {
    constructor(parent, key, labelText) {
		super(parent, key);
		this._enable = true;
		this._isPressed = false;
		this._isOver = false;
		this._hitZone = null;
		if (labelText) {
			this.label = labelText;
		}
	}

}