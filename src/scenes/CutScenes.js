import CutScene from "../UI/CutScene";

export const Intro = new CutScene("Intro", [
    {bgKey:'loadingBg'},
    {bgKey:'cut2', dialog: [
        { character: "King", text: "Welcome to my castle!" },
        {character: "King", text:"We are in grave danger."},
        { character: "Knight", text: "We must defend the kingdom!" }
    ]},
    {bgKey:'cut3', dialog: [
        { character: "Villager", text: "Our crops are dying..." },
        {text:"Can you help us?"}
    ]}
], "Main")



