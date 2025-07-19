import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";
import { ActorUtils } from "../../../../gameModel/actors/utils/ActorUtils.js"

class LavaDrawer {

  static type = "lava"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("lava");
    this.minimapSprite = SpriteUtils.createDefaultSprite("minimap_lava");
    this.spriteSpeed = 0.01
  }

  draw(state, views, actor, cw ) {
    this.sprite.rotateAngle += this.spriteSpeed;
    this.sprite.position = ActorUtils.getOriginActor( actor );
    this.minimapSprite.position = ActorUtils.getOriginActor( actor );
    cw.drawSprite( this.sprite, "main" )
    cw.drawSprite( this.minimapSprite, "minimap" )
  }
}
LavaDrawer.prototype.type = "lava"

export { LavaDrawer }