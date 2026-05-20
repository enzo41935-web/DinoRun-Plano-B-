export function debugmenu() {
    if (debugmode) {

        function updatedebugvisibility() {
            get("debug").forEach((obj) => {
                if (debugboxshow) {
                    // Show & Hide
                    obj.hidden = false
                } else {
                    obj.hidden = true
                }
            }) //obj naming
        }

        if (debugboxshowonstart) {
            debugboxshow = true
            updatedebugvisibility()
        } else {
            debugboxshow = false
            updatedebugvisibility()
        }

        const debugmenubox = add([
            rect(120, 140),
            color(0, 0, 0),
            anchor("top"),
            opacity(0.75),
            pos(globaldebugboxposx, globaldebugboxposy),
            area(),
            z(100),
            "debug",
        ])
        const debugmenuheader = add([
            rect(120, 10),
            color(0, 255, 0),
            anchor("top"),
            opacity(0.2),
            pos(0, 0),
            area(),
            z(101),
            "debug",
        ])

        const debugmenuheadertxt = add([
            text("debugmenu", {
                font: "pixel",
                align: "right",
                size: 8,
            }),
            color("#ffffff"),
            pos(100, 0),
            z(102),
            "debug",
        ])

        const tptotitlebutton = add([
            circle(5),
            color(0, 0, 0),
            anchor("top"),
            opacity(1),
            pos(100, 0),
            area(),
            outline(1, rgb(255, 255, 255)),
            z(102),
            "debug",
        ])

        const tptotitletxt = add([
            text("scenes/title.js", {
                font: "pixel",
                align: "left",
                size: 8,
            }),
            color("#ffffff"),
            pos(100, 0),
            z(102),
            "debug",
        ])

        const tptostartbutton = add([
            circle(5),
            color(0, 0, 0),
            anchor("top"),
            opacity(1),
            pos(0, 0),
            area(),
            outline(1, rgb(255, 255, 255)),
            z(102),
            "debug",
        ])

        const tptostarttxt = add([
            text("scenes/start.js", {
                font: "pixel",
                align: "left",
                size: 8,
            }),
            color("#ffffff"),
            pos(0, 0),
            z(102),
            "debug",
        ])
        onKeyPress("p", () => {
            debugboxshow = !debugboxshow
            updatedebugvisibility()
            if (!debugboxshow) {
                console.log("debug menu open")
            } else {
                console.log("debug menu closed")
            }
        })


        let dragging = false
        let buttons_x = debugmenubox.pos.x - 50
        let buttons_y = debugmenubox.pos.y + 20

        //Positions
        onUpdate(() => {
            globaldebugboxposx = debugmenubox.pos.x
            globaldebugboxposy = debugmenubox.pos.y

            buttons_x = debugmenubox.pos.x - 50
            buttons_y = debugmenubox.pos.y + 20

            debugmenuheader.pos = debugmenubox.pos
            debugmenuheadertxt.pos = debugmenuheader.pos

            tptotitlebutton.pos.x = buttons_x
            tptotitlebutton.pos.y = buttons_y
            tptotitletxt.pos.x = buttons_x + 10
            tptotitletxt.pos.y = buttons_y

            tptostartbutton.pos.x = buttons_x
            tptostartbutton.pos.y = buttons_y + 25
            tptostarttxt.pos.x = buttons_x + 10
            tptostarttxt.pos.y = buttons_y + 25
        })
        // Mouse Drag
        debugmenuheader.onClick(() => {
            dragging = true
        })

        onMouseRelease(() => {
            dragging = false
        })


        onUpdate(() => {
            if (dragging) {
                debugmenubox.pos = mousePos()
            }
        })

        //Teleport Button

        tptotitlebutton.onClick(() => {
            console.log("TP to title")
            go("title")
        })
        tptostartbutton.onClick(() => {
            console.log("TP to start")
            go("start")
        })


        onUpdate(() => { // Hover Light up
            //tp title
            if (currentscene != "title") {
                if (tptotitlebutton.isHovering()) {
                    tptotitlebutton.color = rgb(134, 134, 134)
                } else {
                    tptotitlebutton.color = rgb(0, 0, 0)
                }
            } else { tptotitlebutton.color = rgb(255, 255, 255) }

            //tp start
            if (currentscene != "start") {
                if (tptostartbutton.isHovering()) {
                    tptostartbutton.color = rgb(134, 134, 134)
                } else {
                    tptostartbutton.color = rgb(0, 0, 0)
                }
            } else { tptostartbutton.color = rgb(255, 255, 255) }
        })  //on Update
    }   //If debug is activated
} //function