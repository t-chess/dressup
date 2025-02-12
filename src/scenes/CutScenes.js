import CutScene from "../UI/CutScene";

export class Intro extends CutScene {
    constructor() {
        super("Intro", "Main");
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
                            { text: "Flick aggressively", callback: () =>this.aggrolighter.play(), after: "response-continue", response: "Still nothing. Stubborn piece of shit." },
                            { text: "Flick dramatically", after: "response-continue", response: "Still nothing. What a tragic failure." }
                        ]
                    }
                ]
            },
            {
                bgKey: "cut3", 
                dialog: [
                    { character: "Gail", text: "Oh, fucking wonderful." },
                    {
                        text: "Try asking someone for a lighter?",
                        options: [
                            { text: "Ask a nearby smoker", callback: ()=>this.zippo.play(), after: "response-continue", response: "The smoker reaches into his pocket, flips open his lighter, and holds it out." },
                            { text: "Avoid unnecessary interaction", after: "response-continue", response: "Gail stays quiet and avoids eye contact. A smoker nearby sighs and passes her his lighter." }
                        ]
                    },
                ]
            },
            {
                bgKey: "loadingBg", 
                dialog: [
                    {
                        character: "Smoker",
                        text: "Huh... You look really familiar. Do I know you?",
                        options: [
                            { text: "...", after: "response-continue", response: "Ah yes, XYZ's kiddie, right?" },
                            { text: "I don't think so.", after: "response-continue", response: "Nah, I recognize that face. XYZ's offspring, right?" },
                            { text: "Maybe. I grew up here.", after: "response-continue", response: "Thought so. You look just like her." }
                        ]
                    },
                ]
            },
            {
                bgKey: "cut2",
                dialog: [
                    {
                        character: "Smoker",
                        text: "Damn. Bet she's just dying to see you."
                    },
                    {
                        character: "Gail",
                        text: "...",
                        options: [
                            {text: "..."}, 
                            {text: "Yeah. Finally."},
                            {text: "Mhm. She'll be speechless."},
                        ]
                    }
                ]
            }
        ])
        this.events.on("shutdown", () => this.sea.stop() );
    }
}
