// fonts
loadFont("pixel", "/fonts/Minecraft.ttf")
loadFont("bigpixel", "/fonts/upheavtt.ttf")

// fx
loadSprite("fade", "/sprites/fx/fade.png")

// misc
loadSprite("chaotitle", "/sprites/misc/ground.png")
loadSprite("p1statue", "/sprites/players/p1statue.png")
loadSprite("p2statue", "/sprites/players/p2statue.png")


//keys
loadSprite("keys", "/sprites/hud/keys/W/w1.png", {
    sliceX: 2,
    sliceY: 8,

    anims: {
        w: { from: 0, to: 0 },
        wP: { from: 1, to: 1 },

        a: { from: 2, to: 2 },
        aP: { from: 3, to: 3 },

        s: { from: 4, to: 4 },
        sP: { from: 5, to: 5 },

        d: { from: 6, to: 6 },
        dP: { from: 7, to: 7 },

        up: { from: 8, to: 8 },
        upP: { from: 9, to: 9 },

        down: { from: 10, to: 10 },
        downP: { from: 11, to: 11 },

        left: { from: 12, to: 12 },
        leftP: { from: 13, to: 13 },

        right: { from: 14, to: 14 },
        rightP: { from: 15, to: 15 },
    },
})

loadSprite("p1", "/sprites/players/P1/p1.png", {
    sliceX: 18,
    sliceY: 1,

    anims: {

        running: {
            from: 0,
            to: 9,
            loop: true,
        },


        idle: {
            from: 0,
            to: 0,
            loop: true,
        },

        jump: {
            from: 4,
            to: 1,
        },

        crouchedrun: {
            from: 10,
            to: 17,
            loop: true,
        },

        crouchedidle: {
            from: 10,
            to: 10,
            loop: true,
        },
    }
})

loadSprite("p2", "/sprites/players/P2/p2.png", {
    sliceX: 18,
    sliceY: 1,

    anims: {

        running: {
            from: 0,
            to: 9,
            loop: true,
        },


        idle: {
            from: 0,
            to: 0,
            loop: true,
        },

        jump: {
            from: 4,
            to: 1,
        },

        crouchedrun: {
            from: 10,
            to: 17,
            loop: true,
        },

        crouchedidle: {
            from: 10,
            to: 10,
            loop: true,
        },
    }
})

// hud
loadSprite("check", "/sprites/hud/checkready.png", {
    sliceX: 2,
    sliceY: 1,

    anims: {
        off: {
            from: 0,
            to: 0,
        },

        on: {
            from: 1,
            to: 1,
        },
    },
})

loadSprite("logo", "/sprites/hud/logo.png")
// loadSprite("p1pin", "/sprites/hud/p1pin.png")
// loadSprite("p2pin", "/sprites/hud/p2pin.png")
loadSprite("p1picker", "/sprites/player/p1picker.png")
loadSprite("p2picker", "/sprites/player/p2picker.png")

// Sounds
loadSound("jump", "/sounds/jump.wav")

//BG
loadSprite("cactus1", "/sprites/world/cactus1.png")
loadSprite("cactus2", "/sprites/world/cactus2.png")
loadSprite("bg1", "/sprites/world/bg1.png")
loadSprite("bg2", "/sprites/world/bg2.png")
