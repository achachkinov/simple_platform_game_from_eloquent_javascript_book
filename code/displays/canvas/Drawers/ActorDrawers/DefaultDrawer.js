import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class DefaultDrawer {

  static type = "_default"

  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("_default");
  }

  draw(state, views, actor, cw ) {
    this.sprite.position.x = actor.pos.x;
    this.sprite.position.y = actor.pos.y;
    cw.drawSprite( this.sprite, views["main"] )
    cw.drawSprite( this.sprite, views[ "minimap" ] )
  }
}

export { DefaultDrawer }