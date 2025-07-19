import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";
import { ActorUtils } from "../../../../gameModel/actors/utils/ActorUtils.js"

class CoinDrawer {

  static type = "coin"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("coin");
    this.minimapSprite = SpriteUtils.createDefaultSprite("minimap_coin");
  }

  draw(state, views, actor, cw ) {
    this.sprite.position = ActorUtils.getOriginActor( actor );
    this.minimapSprite.position = ActorUtils.getOriginActor( actor );
    cw.drawSprite( this.sprite, "main" )
    cw.drawSprite( this.minimapSprite, "minimap" )
  }
}
CoinDrawer.prototype.type = "coin"

export { CoinDrawer }