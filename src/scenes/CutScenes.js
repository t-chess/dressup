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
                    { text: "The sea breeze is cold and the lighter won't light." },
                    {
                        text: "Try again?",
                        options: [
                            { text: "Try aggressively.", callback: () =>this.aggrolighter.play(), after: "response-continue", response: "Sparkles and no fire." },
                            { text: "Kinda give up.", after: "continue" }
                        ]
                    }
                ]
            },
            {
                bgKey: "cut3",
                dialog: [
                    { character: "Gail", text: "GRRRRRR fucking zazhigalka whyy" },
                    {
                        text: "Ask a stranger for a lighter?",
                        options: [
                            { text: "Yes", callback: ()=>this.zippo.play(), after: "response-continue", response: "Some stary perdun gave Gail his fancy zippo zapalovac." },
                            { text: "No", after: "response-continue", response: "Lack of nicotine made you veri nervous." }
                        ]
                    },
                    { character: "ТАНЯ", text: "ОК ЭТО ВСЕ THE END" }
                ]
            }
        ])
        this.events.on("shutdown", () => this.sea.stop() );
    }
}
