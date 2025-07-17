class LavaDrawer {
    constructor() {

    }

    draw() {
        let width = actor.size.x;
        let height = actor.size.y;
        let x = (actor.pos.x - this.viewport.left);
        let y = (actor.pos.y - this.viewport.top);
        if (actor.type == "player") {
          this.drawPlayer(actor, x, y, width, height);
        } else {
          const sprite = spritesOnImage[ actor.type ]
          this.cw.drawSprite( otherSprites, sprite, x, y )
        }
    }
}