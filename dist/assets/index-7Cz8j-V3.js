import{P as e}from"./phaser-CmFXOKba.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t={currentChar:"mom",currentSection:"",bg:1,bgtotal:4,mom:{hair:1,hairPreview:1,hairtotal:10,top:1,toptotal:6,bottom:1,bottomtotal:6},gail:{hair:1,hairtotal:4,top:1,toptotal:6,bottom:1,bottomtotal:2},btnChangeChar:!1,btnDone:!1};class i extends Phaser.Scene{constructor(){super({key:"Loading"})}preload(){Array.from({length:t.bgtotal-1},((e,t)=>t+2)).forEach((e=>{this.load.image("bg"+e,"assets/bg"+e+".png")})),this.add.sprite(640,480,"bg1").setPosition(320,240),this.add.graphics().fillStyle(16777215,1).fillRect(50,190,540,180),this.add.text(320,150,"Abigail's sweet homecoming",{font:"36px monospace",fill:"black",backgroundColor:"white"}).setOrigin(.5,.5).setInteractive({cursor:"pointer"}),this.add.text(70,200,"After spending a few years away from her hometown, 19-year-old Abigail is finally visiting to reunite with her beloved mother. As they prepare for a memorable evening together, help them choose the perfect outfits to make this reunion even more special. Let the dress-up fun begin and create unforgettable memories for this heartwarming homecoming!",{font:"18px monospace",fill:"black",lineSpacing:2,align:"center",wordWrap:{width:540,useAdvancedWrap:!0}});let e=this.add.graphics().fillStyle(2236962,1).fillRect(210,395,220,30),i=this.add.graphics(),s=this.add.text(320,400,"Play",{font:"36px monospace",fill:"#fff",backgroundColor:"black"}).setOrigin(.5,.5).setInteractive({cursor:"pointer"});s.on("pointerdown",(()=>this.scene.start("Game"))),s.setVisible(!1),this.load.on("progress",(function(e){i.clear().fillStyle(16777215,1).fillRect(215,400,210*e,20)})),this.load.on("complete",(function(){i.destroy(),e.destroy(),s.setVisible(!0)})),this.load.image("mother","assets/mom.png"),this.load.image("abigail","assets/gail.png"),this.load.image("hairbtn","assets/interface/hairbtn.png"),this.load.image("topsbtn","assets/interface/topsbtn.png"),this.load.image("bottomsbtn","assets/interface/bottomsbtn.png"),this.load.image("rightpanel","assets/interface/rightpanel.png"),this.load.image("arrow","assets/interface/arrow.png"),this.load.image("arrowgail","assets/interface/arrowgail.png"),this.load.image("arrowmom","assets/interface/arrowmom.png"),this.load.image("btndone","assets/interface/btndone.png"),this.load.image("bgbtn","assets/interface/bgbtn.png"),this.load.image("musicon","assets/interface/musicon.png"),this.load.image("musicoff","assets/interface/musicoff.png"),this.load.audio("music","assets/interface/LastWaltz.mp3"),this.loadSet("hair","mom"),this.loadSet("top","mom"),this.loadSet("bottom","mom"),this.loadSet("hair","gail"),this.loadSet("top","gail"),this.loadSet("bottom","gail"),this.load.image("hand","assets/hand.png"),this.load.image("eyes","assets/mom/eyes.png")}loadSet(e,i){let s=t[i][e+"total"];for(var o=1;o<=s;o++)this.load.image(i+e+o,"assets/"+i+"/"+e+o+".png"),this.load.image(i+e+"preview"+o,"assets/"+i+"/"+e+"preview"+o+".png")}}const s={preview:[{condition:"hairpreview1",who:"mom",text:["Home sweet home"],qty:1},{condition:"hairpreview6",who:"mom",text:["Ah i wish i had curly hair","Ah i wish i had curly hair"],qty:1},{condition:"toppreview3",who:"mom",text:["Do you have any idea what it's like to see your dreams die","because of a single mistake?"],qty:1},{condition:"toppreview5",who:"gail",text:["You won't mind if I borrow something from your closet, right?"],qty:1}],click:[{on:"hair2",who:"mom",text:["Welcome home, Abigail.","How was your time away?"],qty:1},{on:"hair3",who:"mom",text:["Isn't it a wonderful, bittersweet feeling","when people say we look so much alike?"]},{on:"hair9",who:"mom",text:["This is where I feel closest to my old dreams","singing here in church.","It's not the stage I imagined but it's a stage nonetheless."]},{on:"top2",who:"mom",text:["I gave up my entire future because of you, and look what I got in return."],qty:1},{on:"top5",who:"mom",text:["Meanwhile, think about your behavior in the basement."]},{on:"top6",who:"mom",text:["O Lord hear the cry of a girl","for years of silence and fear have birthed within her a fury","vast and ancient like the storms of old.","Grant her solace for her anger is now a tempest beyond words,","a grief that knows no comfort.","May she find peace in Your embrace and let her soul be healed.","Amen"]},{on:"bottom2",who:"mom",text:["I tried to love you, I really did."],qty:6},{on:"bottom4",who:"mom",text:["Yet the cruel, inevitable, and irredeemable truth","is that a mistake is exactly what you are."],qty:2},{on:"hair3",who:"gail",text:["I'm so afraid of looking at myself in the mirror someday","and seeing your face staring back at me."],qty:1},{on:"top4",who:"gail",text:["My old school uniform. It doesn't fit anymore."],qty:1},{on:"top5",who:"gail",text:["I would gladly give you back my life","so you could have yours","But we don't always get what we want, do we?"],qty:1},{on:"bottom2",who:"gail",text:["Please stop yelling","Please stop yelling"],qty:8}],end1:['"Dear Abigail,',"I know these words will never reach you, and it's far too late to offer any apology, but I write them nonetheless, as a final confession.","The devil took hold of me, and I became everything a mother shouldn't be — a vessel of cruelty and bitterness, chained to the bottle and lost to my own despair.","From the day you were born, my hands, which should have offered comfort, instead brought pain, and for long years, that pain was all I gave you.","You were right to leave, and in truth, I never wanted you to stay.","I have confessed my sins and sought refuge in the Lord, though I fear His mercy is beyond my reach.","May God grant you the peace I never could.",'Mother"'],end2:['"Once upon a time, there lived a young maiden with a heart full of dreams, a voice more charming than the morning birds, and a spirit that radiated joy.',"Her melodies flowed like rivers, filling the air with vibrant energy and uplifting everyone who listened. Her voice was her treasure and the source of her greatest hopes.","One fateful day, a mysterious circus, with tents of deep crimson and gold, and performers who seemed to dance on the edge of reality itself, arrived at the town.","Among them was a dashing young man, a circus artist with eyes as sharp as a hawk's and a smile as fleeting as the wind.","He whispered promises of a shared future, bright, wild and free like the circus itself, of a life where her voice would be heard across the world.","But soon, the young maiden discovered she was with child, and the warmth in his eyes turned to ice. ","The once-charming whispers became distant echoes of lies, and as the season ended, the circus packed up and vanished into the mist,","leaving her behind without a word, like a fading dream. Her once-bright dreams crumbled into dust. ","As the life inside her grew, her voice dimmed, faltering until it became nothing more than a faint echo of what it once had been—a ghost haunting her from within.",'In the end, her voice was gone, and all that was left was a child born into the quiet void of her shattered dreams."']};class o extends Phaser.Scene{constructor(){super({key:"Game"})}create(){Array.from({length:t.bgtotal},((e,t)=>t+1)).forEach((e=>{this["bg"+e]=this.add.sprite(640,480,"bg"+e).setVisible(!(e>1)).setPosition(320,240)})),this.hairbtn=this.add.sprite(640,480,"hairbtn").setPosition(80,130).setInteractive({cursor:"pointer"}),this.hairbtn.on("pointerdown",(()=>{this.onNavClicked("hair")})),this.topsbtn=this.add.sprite(640,480,"topsbtn").setPosition(80,230).setInteractive({cursor:"pointer"}),this.topsbtn.on("pointerdown",(()=>{this.onNavClicked("top")})),this.bottomsbtn=this.add.sprite(640,480,"bottomsbtn").setPosition(80,330).setInteractive({cursor:"pointer"}),this.bottomsbtn.on("pointerdown",(()=>{this.onNavClicked("bottom")})),this.rightPanel1=this.add.sprite(640,480,"rightpanel").setPosition(560,150),this.rightPanel2=this.add.sprite(640,480,"rightpanel").setPosition(560,310),this.arrowPrev=this.add.sprite(640,480,"arrow").setPosition(530,410).setFlipX(!0).setInteractive({cursor:"pointer"}),this.arrowNext=this.add.sprite(640,480,"arrow").setPosition(590,410).setInteractive({cursor:"pointer"}),this.bgbtn=this.add.sprite(640,480,"bgbtn").setPosition(530,50).setInteractive({cursor:"pointer"}),this.musicon=this.add.sprite(640,480,"musicon").setPosition(590,50).setInteractive({cursor:"pointer"}),this.musicoff=this.add.sprite(640,480,"musicoff").setVisible(!1).setPosition(590,50).setInteractive({cursor:"pointer"}),this.arrowgail=this.add.sprite(640,480,"arrowgail").setPosition(80,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.arrowmom=this.add.sprite(640,480,"arrowmom").setPosition(80,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.music=this.sound.add("music"),this.music.loop=!0,this.music.play(),this.sound.pauseOnBlur=!1,this.musicoff.on("pointerdown",(()=>{this.music.resume(),this.musicoff.visible=!1,this.musicon.visible=!0})),this.musicon.on("pointerdown",(()=>{this.music.pause(),this.musicoff.visible=!0,this.musicon.visible=!1})),this.bgbtn.on("pointerdown",(()=>{let e=t.bg+1>t.bgtotal?1:t.bg+1;this["bg"+t.bg].visible=!1,this["bg"+e].visible=!0,t.bg=e})),this.arrowNext.on("pointerdown",(()=>{let e=t.currentChar,i=t.currentSection,s=t[e][i];t[e+i+"preview"+s].visible=!1,t[e+i+"preview"+(s+1)].visible=!1;let o=s+2<t[e][i+"total"]?s+2:1;t[e+i+"preview"+o].visible=!0,t[e+i+"preview"+(o+1)].visible=!0,t[e][i]=o,t.btnChangeChar||"bottom"!==i||1!=s||(t.btnChangeChar=!0,this.arrowgail.visible=!0),this.checkChange("preview")})),this.arrowPrev.on("pointerdown",(()=>{let e=t.currentChar,i=t.currentSection,s=t[e][i];t[e+i+"preview"+s].visible=!1,t[e+i+"preview"+(s+1)].visible=!1;let o=1===s?t[e][i+"total"]-1:s-2;t[e+i+"preview"+o].visible=!0,t[e+i+"preview"+(o+1)].visible=!0,t[e][i]=o,t.btnChangeChar||"bottom"!==i||1!=s||(t.btnChangeChar=!0,this.arrowgail.visible=!0),this.checkChange("preview")}));const e=()=>{Object.keys(t).filter((e=>e.includes(t.currentChar+t.currentSection+"preview"))).forEach((e=>t[e].visible=!1)),t.currentSection=null,this["arrow"+t.currentChar].visible=!0,t.currentChar="mom"==t.currentChar?"gail":"mom",this["arrow"+t.currentChar].visible=!1,this.onNavClicked("hair"),this.checkChange("preview")};this.arrowgail.on("pointerdown",e),this.arrowmom.on("pointerdown",e),this.mother=this.add.sprite(640,480,"mother").setPosition(250,248),this.eyes=this.add.sprite(640,480,"eyes").setPosition(261,73).setVisible(!1),this.addSet("mom","bottom",248,345),this.addSet("mom","top",238,285),this.addSet("mom","hair",238,99),this.abigail=this.add.sprite(640,480,"abigail").setPosition(383,258),this.addSet("gail","bottom",371,309),this.addSet("gail","top",389,261),this.addSet("gail","hair",346,112),this.btndone=this.add.sprite(640,480,"btndone").setPosition(320,410).setVisible(!1).setInteractive({cursor:"pointer"}),this.btndone.on("pointerdown",(()=>{t.gailtop1._visible?this.addText(["This sweater doesn't feel appropriate for the occasion"],0):t.gailtop4._visible?this.addText(["Who the hell wears an old school uniform to a funeral?"],0):t.momtop5._visible&&t.mombottom3._visible?this.addText(["I don't think mom would have understood this joke."],0):(Object.keys(t).filter((e=>e.includes("preview"))).forEach((e=>{t[e].destroy(),delete t[e]})),t.chosenItems=Object.keys(t).filter((e=>e.includes("gail")||e.includes("mom"))).filter((e=>!0===t[e]._visible)),[this.rightPanel1,this.rightPanel2,this.hairbtn,this.topsbtn,this.bottomsbtn,this.arrowNext,this.arrowPrev,this.arrowgail,this.arrowmom,this.btndone,this.musicon,this.musicoff,this.bgbtn].forEach((e=>e.destroy())),setTimeout((()=>{this.addText(["It seems we're ready","just one last thing to do"],0),setTimeout((()=>{this.abigail.destroy(),Object.keys(t).filter((e=>e.includes("gail")&&"Sprite"===t[e].type)).forEach((e=>{t[e].destroy(),delete t[e]})),setTimeout((()=>{this.initHand()}),500)}),7e3)}),2e3))})),this.onNavClicked("hair")}addSet(e,i,s,o){let r=e+i,a=t[e][i+"total"];for(let n=1;n<=a;n++)t[r+n]=this.add.sprite(s,o,r+n),1!==n&&(t[r+n].visible=!1),t[r+"preview"+n]=this.add.sprite(560,n%2==0?310:150,r+"preview"+n).setInteractive({cursor:"pointer"}),(n>2||"hair"!==i||"mom"!==e)&&(t[r+"preview"+n].visible=!1),t[r+"preview"+n].on("pointerdown",(()=>{for(let s=1;s<=a;s++)t[e+i+s].visible=s===n,t[e+i+s].chosen=s===n;this.checkChange("click")}))}checkChange(e){s[e].forEach((i=>{let s;if("preview"===e?t[i.who+i.condition]._visible&&(s=!0):i.who===t.currentChar&&i.on.replace(/[0-9]/g,"")===t.currentSection&&t[i.who+i.on]._visible&&(s=!0),s){let e=i.qty?i.qty:1;for(let t=0;t<e;t++)this.addText(i.text,0)}}))}addText(e,t){if(t>=e.length)return;let i={backgroundColor:"black",color:"white"},s=this.add.text(0,0,e[t],i),o=s.width,r=s.height;s.destroy();let a=Phaser.Math.Between(0,640-o),n=Phaser.Math.Between(0,480-r),h=this.add.text(a,n,e[t],i);setTimeout((()=>{h.destroy()}),8e3),setTimeout((()=>{this.addText(e,t+1)}),3e3)}onNavClicked(e){const i={hair:this.hairbtn,top:this.topsbtn,bottom:this.bottomsbtn};if(t.currentSection!==e){let i=t.currentChar;Object.keys(t).filter((e=>e.includes(t.currentChar+t.currentSection+"preview"))).forEach((e=>t[e].visible=!1)),t.currentSection=e;let s=t[i][e];t[i+e+"preview"+s].visible=!0,t[i+e+"preview"+(s+1)].visible=!0}Object.keys(i).forEach((e=>{i[e].preFX.clear(),t.currentSection!==e&&i[e].preFX.addColorMatrix().negative()})),t.btnDone||"gail"!==t.currentChar||"bottom"!==t.currentSection||(t.btnDone=!0,this.btndone.visible=!0),this.checkChange("preview")}initHand(){this.hand=this.add.sprite(640,480,"hand").setPosition(330,65).setInteractive({cursor:"pointer"}),this.hand.on("pointerdown",(()=>{this.hand.setInteractive(!1),this.music.stop(),this.tweens.add({targets:this.hand,x:this.hand.x-50,duration:600}),setTimeout((()=>{this.tweens.add({targets:this.hand,y:this.hand.y+20,duration:400}),this.eyes.visible=!0}),1e3),setTimeout((()=>{this.tweens.add({targets:this.hand,x:this.hand.x+50,duration:1e3,onComplete:()=>{setTimeout((()=>{this.scene.start("Ending")}),1e3)}})}),2e3)}))}}class r extends Phaser.Scene{constructor(){super({key:"PreLoading"})}preload(){this.load.image("bg1","assets/bg1.png"),this.load.on("complete",(()=>{this.scene.start("Loading")}))}}class a extends Phaser.Scene{constructor(){super({key:"Ending"})}preload(){this.load.image("end1","assets/end1.png"),this.load.image("end2","assets/end2.png"),this.load.image("bigpanel","assets/interface/bigpanel.png")}create(){let e=(e=>{let i=t.chosenItems.filter((e=>e.includes("mom"))).map((e=>e.replace("mom",""))),s={};return i.forEach((e=>{let t=e.replace(/[a-zA-Z]/g,""),i=e.replace(t,"");s[i]=Number(t)})),s})();[9].includes(e.hair)||[3,6].includes(e.top)?this.ending=1:[5,10].includes(e.hair)||[4].includes(e.top)||[[1,2,6].includes(e.hair),[2,5].includes(e.top),[1,2,5].includes(e.bottom)].filter(Boolean).length>1?this.ending=2:this.ending=1,this.phrases=s["end"+this.ending],this.bg=this.add.sprite(640,480,1===this.ending?"end1":"end2").setPosition(0,0).setOrigin(0).setVisible(!1),this.musicon=this.add.sprite(640,480,"musicon").setPosition(590,50).setInteractive({cursor:"pointer"}),this.musicoff=this.add.sprite(640,480,"musicoff").setVisible(!1).setPosition(590,50).setInteractive({cursor:"pointer"}),this.next=this.add.sprite(640,480,"arrow").setVisible(!1).setPosition(1===this.ending?300:550,330).setInteractive({cursor:"pointer"}),this.next.on("pointerdown",(()=>{this.next.setVisible(!1),this.printText()})),this.music=this.sound.add("music"),this.music.loop=!0,this.music.play(),this.sound.pauseOnBlur=!1,this.musicoff.on("pointerdown",(()=>{this.music.resume(),this.musicoff.visible=!1,this.musicon.visible=!0})),this.musicon.on("pointerdown",(()=>{this.music.pause(),this.musicoff.visible=!0,this.musicon.visible=!1})),setTimeout((()=>{this.msg=this.add.group();let e=this.add.sprite(640,480,"bigpanel").setPosition(320,240),t=this.add.text(320,220,`While Abigail was sorting through old things and getting ready for the ceremony, she found ${1===this.ending?"a":"an old"} photograph with a handwritten note on the back.`,{font:"18px monospace",fill:"black",lineSpacing:2,align:"center",wordWrap:{width:320,useAdvancedWrap:!0}}).setOrigin(.5,.5);setTimeout((()=>{let i=this.add.text(320,300,"Look",{font:"22px monospace",fill:"black"}).setOrigin(.5,.5).setInteractive({cursor:"pointer"});this.msg.add(e),this.msg.add(t),this.msg.add(i),i.on("pointerdown",(()=>{this.textIndex=0,this.msg.setVisible(!1),this.bg.setVisible(!0),setTimeout((()=>{this.printText()}),1e3)}))}),2e3)}),2e3)}printText(){var e;let t={font:"16px monospace",backgroundColor:"white",lineSpacing:2,color:"black",wordWrap:{width:280,useAdvancedWrap:!0}};null==(e=this.textik)||e.destroy(),this.phrases[this.textIndex]?(this.textik=this.add.text(1===this.ending?30:330,240,this.phrases[this.textIndex],t).setOrigin(0,.5),this.textIndex+=1,setTimeout((()=>{this.next.setVisible(!0)}),2e3)):(this.musicoff.setVisible(!1),this.musicon.setVisible(!1),setTimeout((()=>{this.add.text(620,460,"Thanks for playing <3\nMorry",{...t,align:"right"}).setOrigin(1,1)}),5e3))}}new e.Game({type:e.AUTO,width:640,height:480,parent:"container",backgroundColor:"0xFFFFFF",scene:[r,i,o,a]});