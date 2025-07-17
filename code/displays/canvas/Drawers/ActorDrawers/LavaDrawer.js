import { SpriteUtil } from "../utils/SpriteUtils.js";

class LavaDrawer {
  constructor() {
    this.sprite = SpriteUtil.createDefaultSprite("lava");
  }

  draw(state, view, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, view )
  }
}
LavaDrawer.prototype.type = "lava"

export { LavaDrawer }