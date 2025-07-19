import { SpriteUtils } from "../../drawers/utils/SpriteUtils.js";

class BackgroundDrawer {
  constructor() {

  }

  draw( state, views, cw ) {
    const viewPort = views["main"];
    // let left = viewPort.left;
    // let top = viewPort.top;
    // let width = viewPort.width;
    // let height = viewPort.height;
    // let xStart = Math.floor(left);
    // let xEnd = Math.ceil(left + width);
    // let yStart = Math.floor(top);
    // let yEnd = Math.ceil(top + height);
  
    for (let y = 0; y < state.level.rows.length; y++) {
      for (let x = 0; x < state.level.rows[y].length; x++) {
        const tile = state.level.rows[y][x];
        if (tile == "empty") continue;
        const sprite = SpriteUtils.createDefaultSprite(tile);
        sprite.position.x = x
        sprite.position.y = y
        cw.drawSprite( sprite, views["main"] )
        cw.drawSprite( sprite, views[ "minimap" ] )
      }
    }
  } 
}

export { BackgroundDrawer }