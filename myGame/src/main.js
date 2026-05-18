const cw = 480
const ch = 240
const x_spawnlocation = 50
const y_spawnlocation = ch


const default_gravity = 900
var default_jump = 325

var p1ground = false
var p2ground = false

kaplay({
  width: 480,
  height: 240,
  canvas: document.getElementById("game"),
  background: [34, 32, 52] ,
  scale: 2,
})

scene("main", () => {

const floor = add([
rect(480, 30),
pos(0, 210),
area(),
color(255, 215, 130),
"floor",
])

const p1 = add([
rect(20,40),
pos(x_spawnlocation,y_spawnlocation),
color(255,0,0),
anchor("bot"),
area(),
"player1",
"player"
])

const p2 = add([
    rect(20,40),
    pos(30 + x_spawnlocation,y_spawnlocation ),
    color(0,0,255),
    anchor("bot"),
    area(),
    "player2",
    "player"
])



//  Player 1 
    p1.grounded = false
    p1.crouched = false
    p1.gravity = default_gravity
    p1.vel = 0
    p1.jump = default_jump

    onCollide("player1", "floor", () => {
        p1.grounded = true
    })

    onCollideEnd("player1", "floor", () => {
        p1.grounded = false
    })

    onKeyDown("w", () => {
        if (p1.grounded) {
            p1.vel = -p1.jump
        p1.grounded = false
    }
    })

    onUpdate(() => {
        p1.vel += p1.gravity * dt()
        p1.pos.y += p1.vel * dt()

        if (p1.pos.y > ch-30) {
            p1.pos.y = ch-30
            p1.vel = 0
            p1.grounded = true
            }
    })

    onKeyDown("s", () => {
        p1.crouched = true
    })

    onKeyRelease("s", () => {
        p1.crouched = false
    })

    onUpdate(() => {
        if (p1.crouched){
            p1.scale = vec2(1, 0.5)
            p1.gravity = default_gravity*8
            p1.jump = 0
        }else{
            p1.scale = vec2(1, 1)
            p1.gravity = default_gravity
            p1.jump = default_jump
        }
    })


//  Player 2
    p2.grounded = false
    p2.crouched = false
    p2.gravity = default_gravity
    p2.vel = 0
    p2.jump = default_jump

    onCollide("player2", "floor", () => {
        p2.grounded = true
    })

    onCollideEnd("player2", "floor", () => {
        p2.grounded = false
    })

    onKeyDown("up", () => {
        if (p2.grounded) {
            p2.vel = -p2.jump
        p2.grounded = false
    }
    })

    onUpdate(() => {
        p2.vel += p2.gravity * dt()
        p2.pos.y += p2.vel * dt()

        if (p2.pos.y > ch-30) {
            p2.pos.y = ch-30
            p2.vel = 0
            p2.grounded = true
            }
    })

    onKeyDown("down", () => {
        p2.crouched = true
    })

    onKeyRelease("down", () => {
        p2.crouched = false
    })

    onUpdate(() => {
        if (p2.crouched){
            p2.scale = vec2(1, 0.5)
            p2.gravity = default_gravity*8
            p2.jump = 0
        }else{
            p2.scale = vec2(1, 1)
            p2.gravity = default_gravity
            p2.jump = default_jump
        }
    })

})
go("main")