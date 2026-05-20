import { debugmenu } from "../globalfunctions/debugmode.js"
scene("start", () => {
    currentscene = "start"
    console.log("Done!")
    debugmenu()

    // WORLD

    const floor = add([
        rect(480, 30),
        pos(0, 210),
        area(),
        color(255, 255, 255),
        "floor",
    ])

    const chao = add([
        sprite("chaotitle"),
        pos(cw / 2, 240),
        anchor("bot"),
        "chaotitle",
    ])

    // HUD
    const p1pin = add([
        sprite("p1pin"),
        pos(cw / 2, ch / 2),
        anchor("bot"),
        "p1pin"
    ])

    const p2pin = add([
        sprite("p2pin"),
        pos(0, 0),
        anchor("bot"),
        "p2pin",
    ])

    onUpdate(() => {
        p1pin.pos.x = p1.pos.x
        p1pin.pos.y = p1.pos.y - 45
        p2pin.pos.x = (p2.pos.x)
        p2pin.pos.y = (p2.pos.y - 45)
    })
    


    // GLOBAL PLAYERS

    const x_players_spawnlocation = 65
    const y_players_spawnlocation = ch
    let default_gravity = 900
    let default_jump = 325

    // PLAYER 1

    const p1 = add([
        rect(20, 40),
        pos(x_players_spawnlocation, y_players_spawnlocation),
        color("#99e550"),
        anchor("bot"),
        area(),
        "player1",
        "player"
    ])

    p1.grounded = false
    p1.crouched = false
    p1.gravity = default_gravity
    p1.vel = 0
    p1.jump = default_jump
    p1.ready = false

    onCollide("player1", "floor", () => p1.grounded = true)
    onCollideEnd("player1", "floor", () => p1.grounded = false)

    onKeyDown("w", () => {
        if (p1.grounded && !p1.crouched) {
            p1.vel = -p1.jump
            if (!p1.ready) p1.ready = true
            p1.grounded = false
        }
    })

    onKeyDown("s", () => {
        p1.crouched = true
        if (p1.ready) p1.ready = false
    })

    onKeyRelease("s", () => {
        p1.crouched = false
    })

    onUpdate(() => {
        p1.vel += p1.gravity * dt()
        p1.pos.y += p1.vel * dt()

        if (p1.pos.y > ch - 30) {
            p1.pos.y = ch - 30
            p1.vel = 0
            p1.grounded = true
        }

        if (p1.crouched) {
            p1.scale = vec2(1, 0.5)
            p1.gravity = default_gravity * 8
            p1.jump = 0
        } else {
            p1.scale = vec2(1, 1)
            p1.gravity = default_gravity
            p1.jump = default_jump
        }

    })


    // PLAYER 2
    const p2 = add([
        rect(20, 40),
        pos(x_players_spawnlocation + 20, y_players_spawnlocation),
        color("#5b6ee1"),
        anchor("bot"),
        area(),
        "player2",
        "player"
    ])

    p2.grounded = false
    p2.crouched = false
    p2.gravity = default_gravity
    p2.vel = 0
    p2.jump = default_jump
    p2.ready = false

    onCollide("player2", "floor", () => p2.grounded = true)
    onCollideEnd("player2", "floor", () => p2.grounded = false)

    onKeyDown("up", () => {
        if (p2.grounded && !p2.crouched) {
            p2.vel = -p2.jump
            if (!p2.ready) p2.ready = true
        }
    })

    onKeyDown("down", () => {
        p2.crouched = true
        if (p2.ready) p2.ready = false
    })

    onKeyRelease("down", () => {
        p2.crouched = false
    })

    onUpdate(() => {
        p2.vel += p2.gravity * dt()
        p2.pos.y += p2.vel * dt()

        if (p2.pos.y > ch - 30) {
            p2.pos.y = ch - 30
            p2.vel = 0
            p2.grounded = true
        }

        if (p2.crouched) {
            p2.scale = vec2(1, 0.5)
            p2.gravity = default_gravity * 8
            p2.jump = 0
        } else {
            p2.scale = vec2(1, 1)
            p2.gravity = default_gravity
            p2.jump = default_jump
        }

    })
})