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

    const p1lifesHUD = add([
        text("3", {
            font: "pixel",
            size: 16,
            align: "center"
        }),
        color("#00ff00"),
        pos(10, 10),
    ])

    const p2lifesHUD = add([
        text("3", {
            font: "pixel",
            size: 16,
            align: "center"
        }),
        color("#0000ff"),
        pos(30, 10),
    ])

    const difficultytxt = add([
        text("0", {
            font: "pixel",
            size: 16,
            align: "center"
        }),
        color("#ff0000"),
        pos(cw - 40, 10),
    ])

    onUpdate(() => {
        difficultytxt.text = difficulty
    })

    const p1pin = add([
        sprite("p1pin"),
        pos(cw / 2, ch / 2),
        anchor("bot"),
        "p1pin",

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

    const x_players_spawnlocation = 40
    const y_players_spawnlocation = ch
    let default_gravity = 850
    let default_jump = 350

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

    p1.alive = true
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
            p1.gravity = default_gravity * 50
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
        pos(x_players_spawnlocation + 30, y_players_spawnlocation),
        color("#5b6ee1"),
        anchor("bot"),
        area(),
        "player2",
        "player"
    ])

    p2.alive = true
    p2.grounded = false
    p2.crouched = false
    p2.gravity = default_gravity + 10
    p2.vel = 0
    p2.jump = default_jump
    p2.ready = false

    onCollide("player2", "floor", () => p2.grounded = true)
    onCollideEnd("player2", "floor", () => p2.grounded = false)

    onKeyDown("up", () => {
        if (p2.grounded && !p2.crouched) {
            p2.vel = -p2.jump
            if (!p2.ready) p2.ready = true
            p2.grounded = false
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
            p2.gravity = default_gravity * 50
            p2.jump = 0
        } else {
            p2.scale = vec2(1, 1)
            p2.gravity = default_gravity
            p2.jump = default_jump
        }

    })

    //Lifes

    function p1die(obj) {
        obj.destroy()
        p1.destroy()
        p1pin.destroy()
    }

    function p2die(obj) {
        obj.destroy()
        p2.destroy()
        p2pin.destroy()
    }

    function p1damage(obj) {
        if (p1.lifes <= 1 && p1.alive) {
            p1die(obj)
            p1.alive = false
        }
        p1.lifes -= 1
        p1.opacity = 0.5
        wait(0.5, () => {
            p1.opacity = 1
        })
    }

    function p2damage(obj) {
        if (p2.lifes <= 1 && p2.alive) {
            p2die(obj)
            p2.alive = false
        }
        p2.lifes -= 1
        p2.opacity = 0.5
        wait(0.5, () => {
            p2.opacity = 1
        })
    }


    p1.lifes = 3
    p2.lifes = 3

    onUpdate(() => {
        p1lifesHUD.text = p1.lifes
        p2lifesHUD.text = p2.lifes
    })

    //CACTUS


    let longenemychance = 0;
    let obstaclewait_min = 100;
    let obstaclewait_max = 100;
    let dinospeed = 1000
    let pterochance = 1


    let difficulty = 0
    wait(3, () => {
        loop(15, () => {
            if (difficulty < 5) {
                difficulty += 1
            }
        })
    })
    function checkdifficulty() {
        switch (difficulty) {

            case 0:
                longenemychance = 0;
                obstaclewait_min = 1
                obstaclewait_max = 1
                pterochance = 0
                dinospeed = 0
                break
            case 1:
                longenemychance = 0;
                obstaclewait_min = 1
                obstaclewait_max = 5
                pterochance = 0
                dinospeed = 200
                break
            case 2:
                longenemychance = 0;
                obstaclewait_min = 1
                obstaclewait_max = 3
                pterochance = 0.1
                dinospeed = 300
                break
            case 3:
                longenemychance = 0;
                obstaclewait_min = 0.5
                obstaclewait_max = 2.5
                pterochance = 0.15
                dinospeed = 400
                break

            case 4:
                longenemychance = 0.025;
                obstaclewait_min = 0.2
                obstaclewait_max = 3
                pterochance = 0.2
                dinospeed = 600
                break

            case 5:
                longenemychance = 0.05;
                obstaclewait_min = 0.3;
                obstaclewait_max = 2;
                pterochance = 0.3
                dinospeed = 700
                break

            case 67:
                longenemychance = 0;
                obstaclewait_min = 0.05;
                obstaclewait_max = 0.05;
                pterochance = 0.5
                dinospeed = 1000
                console.log("haha 67")
                p1.grounded = true
                p2.grounded = true
                break

            default:
                console.log("INVALID DIFFICULTY")
        }
    }
    //Hardest wait 0.4 to 2, dinospeed -800

    checkdifficulty()
    loop(0.5, () => {
        checkdifficulty()
    })




    const cactus = [];
    const ptero = [];

    function SpawnEnemies() {

        if (chance(1 - pterochance)) {

            const cac = add([
                pos(cw + 20, 170),
                rect(20, 40),
                area(),
                opacity(1),
                "cactus",
                "obstacle"
            ]);

            cac.name = `cactus-${cactus.length + 1}`;

            cactus.push(cac);

            //console.log("Cactus criado.");
            //console.log("Inimigos na tela: " + cactus.length + ptero.length)
        } else {

            const pte = add([
                pos(cw + 20, 130),
                rect(20, 20),
                color(255, 0, 0),
                area(),
                opacity(1),
                "ptero",
                "obstacle"
            ]);

            pte.name = `ptero-${ptero.length + 1}`;

            ptero.push(pte);

            //console.log("Ptero criado.");
            //console.log("Inimigos na tela: " + cactus.length + ptero.length);

        }

        if (chance(longenemychance)) {

            console.log("long enemy wait");

            wait(rand(2, 4), SpawnEnemies);

        } else {

            wait(rand(obstaclewait_min, obstaclewait_max), SpawnEnemies);

        }
    }

    SpawnEnemies();
obstaclesspawncount +=
    onUpdate(() => {

        for (const pte of get("ptero")) {
            pte.move(dinospeed * -1, 0);
            if (pte.pos.x < -50) {
                destroy(pte);
                ptero.splice(ptero.indexOf(pte), 1);
            }
        }

        for (const cac of get("cactus")) {

            cac.move(dinospeed * -1, 0);
            if (cac.pos.x < -50) {
                destroy(cac);
                cactus.splice(cactus.indexOf(cac), 1);
            }
        }
    });


    onCollide("player1", "obstacle", (player, obstacle) => {
        console.log("player 1 has hit: " + obstacle.name)
        p1damage(obstacle)
        obstacle.destroy()
    })


    onCollide("player2", "obstacle", (player, obstacle) => {
        console.log("player 2 has hit: " + obstacle.name)
        p2damage(obstacle)
        obstacle.destroy()
    })
})