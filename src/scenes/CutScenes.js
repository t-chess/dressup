import CutScene from "../UI/CutScene";
import phrases from "../phrases.json";

export class Intro extends CutScene {
    constructor() {
        super("Intro");
    }
    create() {
        this.aggrolighter = this.sound.add("aggrolighter");
        this.zippo = this.sound.add("zippo");
        this.sea = this.sound.add("sea",{volume: 0.75});
        this.sea.loop = true;
        this.sea.play();
        this.setScenes([
            {
                bgKey: "loadingBg"
            },
            {
                bgKey: "cut2", 
                dialog: [
                    { text: "The sea breeze is sharp, and the lighter won't catch." }, 
                    {
                        text: "Try flicking it again?",
                        options: [
                            { text: "Flick aggressively", callback: () => this.time.delayedCall(500, () => this.aggrolighter.play()), after: "response-continue", response: [{ text: "Still nothing. Stubborn piece of shit." }]},
                            { text: "Flick dramatically", after: "response-continue", response: [{ text: "Still nothing. What a tragic failure." }] }
                        ]
                    }
                ]
            },
            {
                bgKey: "cut3", 
                dialog: [
                    { character: "Gail", text: "Oh, fucking wonderful." },
                    {
                        text: "See if someone on the ferry has a lighter?",
                        options: [
                            { text: "Ask a nearby smoker", after: "response-continue", response: [{text:"Gail approaches a smoker."},{text:"The lighter is in her hand before she can ask."}] },
                            { text: "Avoid unnecessary interaction", after: "response-continue", response: [{text:"Gail stays quiet and avoids eye contact."},{text:"A smoker nearby sighs and passes her his lighter."}] }
                        ]
                    },
                ]
            },
            {
                bgKey: "cut4", 
                dialog: [
                    {
                        character: "Gail",
                        text: "...",
                        options: [{text: "Thanks."},{text: "..."}],
                        callback: ()=>this.zippo.play(), after: "continue",
                    },
                    {
                        character: "Smoker",
                        text: "...",
                    },
                    {
                        character: "Smoker",
                        text: "Huh... You look really familiar. Do I know you?",
                        options: [
                            { text: "...", after: "response-continue", response: [{character: "Smoker",text:"Ah yes, AAA's kiddie, right?"}] },
                            { text: "I don't think so.", after: "response-continue", response: [{character: "Smoker",text:"Nah, I recognize that face. AAA's kiddie, right?"}] },
                            { text: "Maybe. I grew up here.", after: "response-continue", response: [{character: "Smoker",text:"Thought so. You look just like her."}] }
                        ]
                    },
                ]
            },
            {
                bgKey: "cut5",
                dialog: [
                    {
                        character: "Gail",
                        text: "..."
                    },
                    {
                        character: "Smoker",
                        text: "Damn. Bet she's just dying to see you."
                    },
                    {
                        character: "Gail",
                        text: "...",
                        options: [
                            {text: "..."}, 
                            {text: "Yeah, she'd love that."},
                            {text: "Mhm. She'll be speechless."},
                        ]
                    },
                    {text: "..."}
                ]
            },
            {
                delay: 2000,
                dialog: [
                    {text:"Fifteen minutes from the dock, and here she is."},
                    {character: "Gail", text: "Alright, I'm here! God, that was a long trip."},
                    {character: "Gail", text: "Just need a minute to rest."},
                    {text: "No resting, Gail. We need to get ready!", options: [ 
                        {text: "Alright, let's begin."}, 
                        {text: 'Ugh. Fine.'} 
                    ]}
                ]
            }
        ])
        this.onEnd(()=>{
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start("Main");
            });
        })
        this.events.on("shutdown", () => this.sea.stop() );
    }
}

export class Ending extends CutScene {
    constructor() {
        super("Ending");
    }
    init({ending,seek}) {
        const dialog = phrases["end"+ending].map(string=>({text:string}));
        this.setScenes([
            {
                dialog:[{text:`While Abigaïl was sorting through old things and getting ready for the ceremony, she found ${this.ending === 1 ? "a" : "an old"} photograph with a handwritten note on the back.`}]
            },
            {
                bgKey: "end"+ending,
                dialog
            },
            {
                delay:2000,
                dialog: [{character:'Morry',text:"Thanks for playing <3"},{text:'credits credits credits'}]
            }
        ])
        this.music = this.sound.add("music");
        this.music.loop = true;
        this.music.play({seek});
    }
    create() {
        this.add.soundbutton();
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.onEnd(()=>{
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.music.stop();
                this.scene.start("Loading");
            });
        })
    }
}
