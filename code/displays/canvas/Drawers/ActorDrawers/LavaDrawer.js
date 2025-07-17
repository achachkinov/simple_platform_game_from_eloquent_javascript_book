import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class LavaDrawer {

  static type = "lava"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("lava");
  }

  draw(state, views, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, views["main"] )
    cw.drawSprite( this.sprite, views[ "minimap" ] )
  }
}
LavaDrawer.prototype.type = "lava"

export { LavaDrawer }