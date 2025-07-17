class PlayerDrawer {
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

    drawPlayer(player, x, y) {
        const playerXOverlap = 0.2;
        x -= playerXOverlap;
        if (player.speed.x != 0) {
          this.flipPlayer = player.speed.x < 0;
        }
    
        let tile = "rest";
        if (player.speed.y != 0) {
          tile = "jump";
        } else if (player.speed.x != 0) {
          tile = "move" + Math.floor(Date.now() / 60) % 8;
        }
        const sprite = spritesOnImageOfPlayer[ tile ]
    
        if ( this.flipPlayer ) {
          this.cw.drawFlipedSprite( playerSprites, sprite, x, y );
        } else {
          this.cw.drawSprite( playerSprites, sprite, x, y );
        }
      };
}