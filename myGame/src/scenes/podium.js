import { debugmenu } from "../globalfunctions/debugmode.js"

scene("podium", () => {
    console.log("podium!")
    debugmenu()

    const wintext = add([
        text(`${winnerplayername} GANHOU!`, {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(cw / 4 + 30, ch / 2 - 20),
        area(),
        opacity(1),
        z(9),
        fixed(),
    ])

    onKeyPress((key) => {
        go("title")
    })

})