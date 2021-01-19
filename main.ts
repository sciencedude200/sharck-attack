enum ActionKind {
    Walking,
    Idle,
    Jumping,
    eat
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.startEffect(effects.bubbles, 100)
    if (otherSprite == _2) {
        info.changeLifeBy(-1)
        pause(1000)
    } else {
        info.changeScoreBy(1)
    }
})
let projectile: Sprite = null
let _2: Sprite = null
storyboard.loaderBootSequence.register()
let mySprite = sprites.create(img`
    .............ccfff..............
    ...........ccddbcf..............
    ..........ccddbbf...............
    ..........fccbbcf...............
    .....fffffccccccff.........ccc..
    ...ffbbbbbbbcbbbbcfff....ccbbc..
    ..fbbbbbbbbcbcbbbbcccff.cdbbc...
    ffbbbbbbffbbcbcbbbcccccfcdbbf...
    fbcbbb11ff1bcbbbbbcccccffbbf....
    fbbb11111111bbbbbcccccccbbcf....
    .fb11133cc11bbbbcccccccccccf....
    ..fccc31c111bbbcccccbdbffbbcf...
    ...fc13c111cbbbfcddddcc..fbbf...
    ....fccc111fbdbbccdcc.....fbbf..
    ........ccccfcdbbcc........fff..
    .............fffff..............
    `, SpriteKind.Player)
scene.setBackgroundColor(9)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
game.showLongText("eat the ducks", DialogLayout.Bottom)
game.showLongText("not bombs", DialogLayout.Bottom)
game.onUpdateInterval(5000, function () {
    _2 = sprites.createProjectileFromSide(img`
        . . . . . . . . 
        . . . 4 . . . . 
        . . . b . . . . 
        . f f b f f . . 
        . f f f f f . . 
        . f f f f f . . 
        . . . . . . . . 
        . . . . . . . . 
        `, randint(0, 50), randint(0, 50))
})
game.onUpdateInterval(1000, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . b 5 5 b . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . b b b b b 5 5 5 5 5 5 5 b . . 
        . b d 5 b 5 5 5 5 5 5 5 5 b . . 
        . . b 5 5 b 5 d 1 f 5 d 4 f . . 
        . . b d 5 5 b 1 f f 5 4 4 c . . 
        b b d b 5 5 5 d f b 4 4 4 4 b . 
        b d d c d 5 5 b 5 4 4 4 4 4 4 b 
        c d d d c c b 5 5 5 5 5 5 5 b . 
        c b d d d d d 5 5 5 5 5 5 5 b . 
        . c d d d d d d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        `, randint(0, 50), randint(0, 50))
})
forever(function () {
    if (info.life() == 0) {
        game.over(false, effects.melt)
    }
})
forever(function () {
    if (1000 < info.score()) {
        game.over(true, effects.bubbles)
    }
})
forever(function () {
    music.playMelody("D C D - C D C - ", 120)
})
