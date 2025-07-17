import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class BackgroundDrawer {
  constructor() {

  }

  draw( state, views, cw ) {
    const viewPort = views["main"];
    let left = viewPort.left;
    let top = viewPort.top;
    let width = viewPort.width;
    let height = viewPort.height;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);
  
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = state.level.rows[y][x];
        if (tile == "empty") continue;
        const sprite = SpriteUtils.createDefaultSprite(tile);
        sprite.position.x = x
        sprite.position.y = y
        cw.drawSprite( sprite, viewPort )
        cw.drawSprite( sprite, views[ "minimap" ] )
      }
    }
  } 
}

export { BackgroundDrawer }