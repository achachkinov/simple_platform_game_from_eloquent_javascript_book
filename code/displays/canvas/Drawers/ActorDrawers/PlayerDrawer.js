import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class PlayerDrawer {

  static type = "player"

  constructor() {
    this.flipPlayer = false;
    this.status
    this.playerXOverlap = 0.2
    this.#initializeSprites();
  }

  #initializeSprites() {
    this.sprite = SpriteUtils.createDefaultSprite("rest");
  }

  draw(state, views, actor, cw) {
    this.sprite.position.x = actor.pos.x - this.playerXOverlap;
    this.sprite.position.y = actor.pos.y;
    this.sprite.name = this.#getStatus( actor );
    this.sprite.flip = this.#getFlipPlayer( actor )
    cw.drawSprite( this.sprite, views["main"] )
    cw.drawSprite( this.sprite, views[ "minimap" ] )
  }
  #getFlipPlayer( actor ) {
    if (actor.speed.x != 0) {
      this.flipPlayer = actor.speed.x < 0;
    }
    return this.flipPlayer
  }
  #getStatus( actor ) {
    this.status = "rest";
    if (actor.speed.y != 0) {
        this.status = "jump";
    } else if (actor.speed.x != 0) {
        this.status = "move" + Math.floor(Date.now() / 60) % 8;
    }
    return this.status
  }
}
PlayerDrawer.prototype.type = "player"

export { PlayerDrawer }