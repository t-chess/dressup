import gameState from "./gameState";

function preload() {
  // bg and bodies
  this.load.image("bg", "assets/bg.png");
  this.load.image("mother", "assets/mom.png");
  this.load.image("abigail", "assets/gail.png");

  // interface
  this.load.image("hairbtn", "assets/interface/hairbtn.png");
  this.load.image("topsbtn", "assets/interface/topsbtn.png");
  this.load.image("bottomsbtn", "assets/interface/bottomsbtn.png");
  this.load.image("rightpanel", "assets/interface/rightpanel.png");
  this.load.image("arrow", "assets/interface/arrow.png");
  this.load.image("arrowgail", "assets/interface/arrowgail.png");

  loadSet.call(this, "hand", "gail");
  loadSet.call(this, "face", "gail");

  loadSet.call(this, "hair", "mom", true);
  loadSet.call(this, "top", "mom", true);
  loadSet.call(this, "bottom", "mom", true);
}

function loadSet(name, who, withPreview) {
  let total = gameState[who][name + "total"];
  for (var i = 1; i <= total; i++) {
    this.load.image(who + name + i, "assets/" + who + "/" + name + i + ".png");
    if (withPreview) {
      this.load.image(
        who + name + "preview" + i,
        "assets/" + who + "/" + name + "preview" + i + ".png"
      );
    }
  }
}

export default preload;
