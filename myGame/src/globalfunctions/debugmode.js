export function debugmenu() {
    if (debugmode) {
        let paused = false;

        onKeyPress("l", () => {
            paused = !paused;
        });

        onUpdate(() => {
            if (paused) {
                destroyAll();
                debug.paused = true
                destroyAll();
            }

        });

        function updatedebugvisibility() {

            get("debug").forEach((obj) => {
                if (debugboxshow) {
                    // Show & Hide
                    obj.hidden = false
                    console.log("debug menu open")
                } else {
                    obj.hidden = true
                    console.log("debug menu closed")
                }
            }) //obj naming

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
            text(`Debug Menu - \\[P\\] TO HIDE`, {
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
            if (debugboxshow == debugmenubox.hidden) {
                updatedebugvisibility()
            }
        })

        updatedebugvisibility()
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
            debugmenuheadertxt.pos.x = debugmenuheader.pos.x - 47
            debugmenuheadertxt.pos.y = debugmenuheader.pos.y + 2

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

        let dragOffsetX = 0
        let dragOffsetY = 0

        debugmenubox.onClick(() => {

            dragOffsetX = mousePos().x - debugmenubox.pos.x
            dragOffsetY = mousePos().y - debugmenubox.pos.y

            dragging = true
        })

        onMouseRelease(() => {
            dragging = false
        })

        onUpdate(() => {
            if (dragging) {

                debugmenubox.pos.x = mousePos().x - dragOffsetX
                debugmenubox.pos.y = mousePos().y - dragOffsetY

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