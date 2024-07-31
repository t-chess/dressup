import{P as t}from"./phaser-CmFXOKba.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const e={currentChar:"mom",currentSection:"",bg:1,bgtotal:4,mom:{hair:1,hairPreview:1,hairtotal:10,top:1,toptotal:6,bottom:1,bottomtotal:6},gail:{hair:1,hairtotal:4,top:1,toptotal:6,bottom:1,bottomtotal:2},btnChangeChar:!1,btnDone:!1};class i extends Phaser.Scene{constructor(){super({key:"Loading"})}preload(){Array.from({length:e.bgtotal-1},((t,e)=>e+2)).forEach((t=>{this.load.image("bg"+t,"assets/bg"+t+".png")})),this.add.sprite(640,480,"bg1").setPosition(320,240),this.add.graphics().fillStyle(16777215,1).fillRect(50,190,540,180),this.add.text(320,150,"Abigail's sweet homecoming",{font:"36px monospace",fill:"black",backgroundColor:"white"}).setOrigin(.5,.5).setInteractive({cursor:"pointer"}),this.add.text(70,200,"After spending a few years away from her hometown, 19-year-old Abigail is finally visiting to reunite with her beloved mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special. Let the dress-up fun begin and create unforgettable memories for this heartwarming homecoming!",{font:"18px monospace",fill:"black",lineSpacing:2,align:"center",wordWrap:{width:540,useAdvancedWrap:!0}});let t=this.add.graphics().fillStyle(2236962,1).fillRect(210,395,220,30),i=this.add.graphics(),o=this.add.text(320,400,"Play",{font:"36px monospace",fill:"#fff",backgroundColor:"black"}).setOrigin(.5,.5).setInteractive({cursor:"pointer"});o.on("pointerdown",(()=>this.scene.start("Game"))),o.setVisible(!1),this.load.on("progress",(function(t){i.clear().fillStyle(16777215,1).fillRect(215,400,210*t,20)})),this.load.on("complete",(function(){i.destroy(),t.destroy(),o.setVisible(!0)})),this.load.image("mother","assets/mom.png"),this.load.image("abigail","assets/gail.png"),this.load.image("hairbtn","assets/interface/hairbtn.png"),this.load.image("topsbtn","assets/interface/topsbtn.png"),this.load.image("bottomsbtn","assets/interface/bottomsbtn.png"),this.load.image("rightpanel","assets/interface/rightpanel.png"),this.load.image("arrow","assets/interface/arrow.png"),this.load.image("arrowgail","assets/interface/arrowgail.png"),this.load.image("arrowmom","assets/interface/arrowmom.png"),this.load.image("btndone","assets/interface/btndone.png"),this.load.image("bgbtn","assets/interface/bgbtn.png"),this.load.image("musicon","assets/interface/musicon.png"),this.load.image("musicoff","assets/interface/musicoff.png"),this.load.audio("music","assets/interface/LastWaltz.mp3"),this.loadSet("hair","mom"),this.loadSet("top","mom"),this.loadSet("bottom","mom"),this.loadSet("hair","gail"),this.loadSet("top","gail"),this.loadSet("bottom","gail"),this.load.image("hand","assets/hand.png"),this.load.image("eyes","assets/mom/eyes.png")}loadSet(t,i){let o=e[i][t+"total"];for(var s=1;s<=o;s++)this.load.image(i+t+s,"assets/"+i+"/"+t+s+".png"),this.load.image(i+t+"preview"+s,"assets/"+i+"/"+t+"preview"+s+".png")}}const o={preview:[{condition:"hairpreview1",who:"mom",text:["Home sweet home"],qty:1},{condition:"hairpreview6",who:"mom",text:["Ah i wish i had curly hair","ah i wish i had curly hair"],qty:1},{condition:"toppreview3",who:"mom",text:["Do you have any idea what it's like to see your dreams die","because of a single mistake?","because of a single mistake?","because of a single mistake?"],qty:1},{condition:"toppreview5",who:"gail",text:["You won't mind if I borrow something from your closet, right?"],qty:1}],click:[{on:"hair2",who:"mom",text:["Welcome home, Abigail","How was your time away?","Your return marks a significant moment for us"],qty:1},{on:"hair3",who:"mom",text:["Isn't it a wonderful, bittersweet feeling","when people say we look so much alike?"]},{on:"hair9",who:"mom",text:["This is where I feel closest to my old dreams","singing here in church.","It's not the stage I imagined but it's a stage nonetheless"]},{on:"top2",who:"mom",text:["Did you miss our little shop, Abigail?","I remember you helping me stock shelves","and chatting with the regulars.","(And the scent of fresh tobacco.)"],qty:1},{on:"top6",who:"mom",text:["O Lord hear the cry of a girl","for years of silence and fear have birthed within her a fury","vast and ancient like the storms of old","grant her solace for her anger is now a tempest beyond words","a grief that knows no comfort","may she find peace in Your embrace and let her soul be healed","amen","amen","amen"]},{on:"bottom2",who:"mom",text:["I tried to love you, I really did."],qty:6},{on:"bottom4",who:"mom",text:["Yet the cruel, inevitable, and irredeemable truth","is that a mistake is exactly what you are."],qty:2},{on:"hair3",who:"gail",text:["I'm so afraid of looking at myself in the mirror someday","and seeing your face staring back at me."],qty:1},{on:"top4",who:"gail",text:["My old school uniform. It doesn't fit anymore."],qty:1},{on:"top5",who:"gail",text:["I would gladly give you back my life","so you could have yours","But we don't always get what we want, do we?"],qty:1},{on:"bottom2",who:"gail",text:["Please stop yelling","Please stop yelling"],qty:8}]};class s extends Phaser.Scene{constructor(){super({key:"Game"})}create(){Array.from({length:e.bgtotal},((t,e)=>e+1)).forEach((t=>{this["bg"+t]=this.add.sprite(640,480,"bg"+t).setVisible(!(t>1)).setPosition(320,240)})),this.hairbtn=this.add.sprite(640,480,"hairbtn").setPosition(80,130).setInteractive({cursor:"pointer"}),this.hairbtn.on("pointerdown",(()=>{this.onNavClicked("hair")})),this.topsbtn=this.add.sprite(640,480,"topsbtn").setPosition(80,230).setInteractive({cursor:"pointer"}),this.topsbtn.on("pointerdown",(()=>{this.onNavClicked("top")})),this.bottomsbtn=this.add.sprite(640,480,"bottomsbtn").setPosition(80,330).setInteractive({cursor:"pointer"}),this.bottomsbtn.on("pointerdown",(()=>{this.onNavClicked("bottom")})),this.rightPanel1=this.add.sprite(640,480,"rightpanel").setPosition(560,150),this.rightPanel2=this.add.sprite(640,480,"rightpanel").setPosition(560,310),this.arrowPrev=this.add.sprite(640,480,"arrow").setPosition(530,410).setFlipX(!0).setInteractive({cursor:"pointer"}),this.arrowNext=this.add.sprite(640,480,"arrow").setPosition(590,410).setInteractive({cursor:"pointer"}),this.bgbtn=this.add.sprite(640,480,"bgbtn").setPosition(530,50).setInteractive({cursor:"pointer"}),this.musicon=this.add.sprite(640,480,"musicon").setPosition(590,50).setInteractive({cursor:"pointer"}),this.musicoff=this.add.sprite(640,480,"musicoff").setVisible(!1).setPosition(590,50).setInteractive({cursor:"pointer"}),this.arrowgail=this.add.sprite(640,480,"arrowgail").setPosition(80,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.arrowmom=this.add.sprite(640,480,"arrowmom").setPosition(80,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.music=this.sound.add("music"),this.music.loop=!0,this.music.play(),this.sound.pauseOnBlur=!1,this.musicoff.on("pointerdown",(()=>{this.music.play(),this.musicoff.visible=!1,this.musicon.visible=!0})),this.musicon.on("pointerdown",(()=>{this.music.stop(),this.musicoff.visible=!0,this.musicon.visible=!1})),this.bgbtn.on("pointerdown",(()=>{let t=e.bg+1>e.bgtotal?1:e.bg+1;this["bg"+e.bg].visible=!1,this["bg"+t].visible=!0,e.bg=t})),this.arrowNext.on("pointerdown",(()=>{let t=e.currentChar,i=e.currentSection,o=e[t][i];e[t+i+"preview"+o].visible=!1,e[t+i+"preview"+(o+1)].visible=!1;let s=o+2<e[t][i+"total"]?o+2:1;e[t+i+"preview"+s].visible=!0,e[t+i+"preview"+(s+1)].visible=!0,e[t][i]=s,e.btnChangeChar||"bottom"!==i||1!=o||(e.btnChangeChar=!0,this.arrowgail.visible=!0),this.checkChange("preview")})),this.arrowPrev.on("pointerdown",(()=>{let t=e.currentChar,i=e.currentSection,o=e[t][i];e[t+i+"preview"+o].visible=!1,e[t+i+"preview"+(o+1)].visible=!1;let s=1===o?e[t][i+"total"]-1:o-2;e[t+i+"preview"+s].visible=!0,e[t+i+"preview"+(s+1)].visible=!0,e[t][i]=s,e.btnChangeChar||"bottom"!==i||1!=o||(e.btnChangeChar=!0,this.arrowgail.visible=!0),this.checkChange("preview")}));const t=()=>{Object.keys(e).filter((t=>t.includes(e.currentChar+e.currentSection+"preview"))).forEach((t=>e[t].visible=!1)),e.currentSection=null,this["arrow"+e.currentChar].visible=!0,e.currentChar="mom"==e.currentChar?"gail":"mom",this["arrow"+e.currentChar].visible=!1,this.onNavClicked("hair"),this.checkChange("preview")};this.arrowgail.on("pointerdown",t),this.arrowmom.on("pointerdown",t),this.mother=this.add.sprite(640,480,"mother").setPosition(250,248),this.eyes=this.add.sprite(640,480,"eyes").setPosition(261,73).setVisible(!1),this.addSet("mom","bottom",248,345),this.addSet("mom","top",238,285),this.addSet("mom","hair",238,99),this.abigail=this.add.sprite(640,480,"abigail").setPosition(383,258),this.addSet("gail","bottom",371,309),this.addSet("gail","top",389,261),this.addSet("gail","hair",346,112),this.btndone=this.add.sprite(640,480,"btndone").setPosition(320,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.btndone.on("pointerdown",(()=>{e.gailtop1._visible?this.addText(["This sweater doesn't feel appropriate for the occasion"],0):e.gailtop4._visible?this.addText(["Who the hell wears an old school uniform to a funeral?"],0):(Object.keys(e).filter((t=>t.includes("preview"))).forEach((t=>{e[t].destroy(),delete e[t]})),e.chosenItems=Object.keys(e).filter((t=>t.includes("gail")||t.includes("mom"))).filter((t=>!0===e[t]._visible)),[this.rightPanel1,this.rightPanel2,this.hairbtn,this.topsbtn,this.bottomsbtn,this.arrowNext,this.arrowPrev,this.arrowgail,this.arrowmom,this.btndone,this.musicon,this.musicoff,this.bgbtn].forEach((t=>t.destroy())),setTimeout((()=>{this.addText(["It seems we're ready","just one last thing to do"],0),setTimeout((()=>{this.abigail.destroy(),Object.keys(e).filter((t=>t.includes("gail")&&"Sprite"===e[t].type)).forEach((t=>{e[t].destroy(),delete e[t]})),setTimeout((()=>{this.initHand()}),500)}),7e3)}),2e3))})),this.onNavClicked("hair")}addSet(t,i,o,s){let r=t+i,a=e[t][i+"total"];for(let n=1;n<=a;n++)e[r+n]=this.add.sprite(o,s,r+n),1!==n&&(e[r+n].visible=!1),e[r+"preview"+n]=this.add.sprite(560,n%2==0?310:150,r+"preview"+n).setInteractive({cursor:"pointer"}),(n>2||"hair"!==i||"mom"!==t)&&(e[r+"preview"+n].visible=!1),e[r+"preview"+n].on("pointerdown",(()=>{for(let o=1;o<=a;o++)e[t+i+o].visible=o===n,e[t+i+o].chosen=o===n;this.checkChange("click")}))}checkChange(t){o[t].forEach((i=>{let o;if("preview"===t?e[i.who+i.condition]._visible&&(o=!0):i.who===e.currentChar&&i.on.replace(/[0-9]/g,"")===e.currentSection&&e[i.who+i.on]._visible&&(o=!0),o){let t=i.qty?i.qty:1;for(let e=0;e<t;e++)this.addText(i.text,0)}}))}addText(t,e){if(e>=t.length)return;let i={backgroundColor:"black",color:"white"},o=this.add.text(0,0,t[e],i),s=o.width,r=o.height;o.destroy();let a=Phaser.Math.Between(0,640-s),n=Phaser.Math.Between(0,480-r),h=this.add.text(a,n,t[e],i);setTimeout((()=>{h.destroy()}),8e3),setTimeout((()=>{this.addText(t,e+1)}),3e3)}onNavClicked(t){const i={hair:this.hairbtn,top:this.topsbtn,bottom:this.bottomsbtn};if(e.currentSection!==t){let i=e.currentChar;Object.keys(e).filter((t=>t.includes(e.currentChar+e.currentSection+"preview"))).forEach((t=>e[t].visible=!1)),e.currentSection=t;let o=e[i][t];e[i+t+"preview"+o].visible=!0,e[i+t+"preview"+(o+1)].visible=!0}Object.keys(i).forEach((t=>{i[t].preFX.clear(),e.currentSection!==t&&i[t].preFX.addColorMatrix().negative()})),e.btnDone||"gail"!==e.currentChar||"bottom"!==e.currentSection||(e.btnDone=!0,this.btndone.visible=!0),this.checkChange("preview")}initHand(){this.hand=this.add.sprite(640,480,"hand").setPosition(330,65).setInteractive({cursor:"pointer"}),this.hand.on("pointerdown",(()=>{this.music.stop(),this.tweens.add({targets:this.hand,x:this.hand.x-50,duration:600}),setTimeout((()=>{this.tweens.add({targets:this.hand,y:this.hand.y+20,duration:400}),this.eyes.visible=!0}),1e3),setTimeout((()=>{this.tweens.add({targets:this.hand,x:this.hand.x+50,duration:1e3,onComplete:()=>{this.scene.start("Ending")}})}),2e3)}))}}class r extends Phaser.Scene{constructor(){super({key:"PreLoading"})}preload(){this.load.image("bg1","assets/bg1.png"),this.load.on("complete",(()=>{this.scene.start("Loading")}))}}class a extends Phaser.Scene{constructor(){super({key:"Ending"})}preload(){console.log("yaaaay")}}new t.Game({type:t.AUTO,width:640,height:480,parent:"container",scene:[r,i,s,a]});