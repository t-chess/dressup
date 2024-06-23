function preload() {
  // bg and bodies
  this.load.image("bg", "assets/bg.png");
  this.load.image("mother", "assets/mom.png");
  this.load.image("gail", "assets/gail.png");

  // interface
  this.load.image("hairbtn", "assets/interface/hairbtn.png");
  this.load.image("topsbtn", "assets/interface/topsbtn.png");
  this.load.image("bottomsbtn", "assets/interface/bottomsbtn.png");
  this.load.image("rightpanel", "assets/interface/rightpanel.png");
  this.load.image("arrow", "assets/interface/arrow.png");

  loadSet.call(this, "hand", 1, "gail");
  loadSet.call(this, "face", 1, "gail");
  loadSet.call(this, "hair", 5, "mom");
}

function loadSet(name, total, who) {
  for (var i = 1; i <= total; i++) {
    this.load.image(name + i, "assets/" + who + "/" + name + i + ".png");
  }
}

export default preload;
