import { SpriteUtil } from "../utils/SpriteUtils.js";

class CoinDrawer {
  constructor() {
    this.sprite = SpriteUtil.createDefaultSprite("coin");
  }

  draw(state, viewport, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, view )
  }
}
CoinDrawer.prototype.type = "coin"

export { CoinDrawer }