import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";
import { ActorUtils } from "../../../../gameModel/actors/utils/ActorUtils.js"

class DefaultDrawer {

  static type = "_default"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("_default");
  }

  draw(state, views, actor, cw ) {
    this.sprite.position = ActorUtils.getOriginActor( actor );
    cw.drawSprite( this.sprite, "main" )
    cw.drawSprite( this.sprite, "minimap" )
  }
}
DefaultDrawer.prototype.type = "_default"

export { DefaultDrawer }