import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class CoinDrawer {

  static type = "coin"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("coin");
  }

  draw(state, views, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, views["main"] )
    cw.drawSprite( this.sprite, views[ "minimap" ] )
  }
}
CoinDrawer.prototype.type = "coin"

export { CoinDrawer }