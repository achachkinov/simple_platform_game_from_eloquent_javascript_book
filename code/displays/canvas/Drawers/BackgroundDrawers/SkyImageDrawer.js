import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";
import { VecUtils } from "../../../../gameModel/actors/utils/VecUtils.js";

class SkyImageDrawer {
  constructor() {
    this.sprite = SpriteUtils.createDefaultSprite("background");
    this.minimapSprtie = SpriteUtils.createDefaultSprite("background");
    this.sprite.scale = { x: 0.7, y: 0.7}
    this.minimapSprtie.scale = { x:1.5, y:1.5 }
    this.parallaxScale = 0.7
  }

  draw( state, views, cw ) {
    const viewPort = views["main"];
    const origin = { x: state.level.width/2, y: state.level.height/2 }
    const viewOrigin = VecUtils.plus(viewPort.position, VecUtils.times(viewPort.size, 0.5 ))
    const dif =  VecUtils.times(VecUtils.minus( origin, viewOrigin ), this.parallaxScale)
    this.sprite.position = VecUtils.minus( origin, dif )
    this.minimapSprtie.position = VecUtils.minus( origin, dif )
    cw.drawSprite( this.sprite, "main" )
    cw.drawSprite( this.minimapSprtie, "minimap" )
  } 
}

export { SkyImageDrawer }