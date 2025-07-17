import { SpriteUtil } from "../utils/SpriteUtils.js";

class DefaultDrawer {
  constructor() {
    this.sprite = SpriteUtil.createDefaultSprite("_default");
  }

  draw(state, view, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, view )
  }
}
DefaultDrawer.prototype.type = "_default"

export { DefaultDrawer }