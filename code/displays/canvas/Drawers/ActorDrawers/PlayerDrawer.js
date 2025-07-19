import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";
import { ActorUtils } from "../../../../gameModel/actors/utils/ActorUtils.js"

class PlayerDrawer {

  static type = "player"

  constructor() {
    this.flipPlayer = false;
    this.status
    this.#initializeSprites();
  }

  #initializeSprites() {
    this.sprite = SpriteUtils.createDefaultSprite("rest");
    this.minimapSprite = SpriteUtils.createDefaultSprite("minimap_player");
  }

  draw(state, views, actor, cw) {
    this.sprite.position = ActorUtils.getOriginActor( actor );
    this.sprite.name = this.#getStatus( actor );
    this.sprite.flip = this.#getFlipPlayer( actor )
    this.minimapSprite.position = ActorUtils.getOriginActor( actor );
    cw.drawSprite( this.sprite, "main" )
    cw.drawSprite( this.minimapSprite, "minimap" )
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