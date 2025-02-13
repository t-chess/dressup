import CutScene from "../UI/CutScene";

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
                            { text: "Flick aggressively", callback: () =>this.aggrolighter.play(), after: "response-continue", response: [{ text: "Still nothing. Stubborn piece of shit." }]},
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
                        character: "Smoker",
                        text: "...",
                        callback: ()=>this.zippo.play(), after: "response-continue",
                    },
                    {
                        character: "Smoker",
                        text: "Huh... You look really familiar. Do I know you?",
                        options: [
                            { text: "...", after: "response-continue", response: [{character: "Smoker",text:"Ah yes, XYZ's kiddie, right?"}] },
                            { text: "I don't think so.", after: "response-continue", response: [{character: "Smoker",text:"Nah, I recognize that face. XYZ's kiddie, right?"}] },
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
                    }
                ]
            }
        ])
        this.onEnd(()=>{
            this.scene.start("Main");
        })
        this.events.on("shutdown", () => this.sea.stop() );
    }
}
