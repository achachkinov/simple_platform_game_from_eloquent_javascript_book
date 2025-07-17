class BackgroundDrawer {
    constructor() {

    }

    draw( state, viewPort ) {
        let {left, top, width, height} = viewPort;
        let xStart = Math.floor(left);
        let xEnd = Math.ceil(left + width);
        let yStart = Math.floor(top);
        let yEnd = Math.ceil(top + height);
      
        for (let y = yStart; y < yEnd; y++) {
          for (let x = xStart; x < xEnd; x++) {
            let tile = state.level.rows[y][x];
            if (tile == "empty") continue;
            let screenX = (x - left);
            let screenY = (y - top);
            const sprite = spritesOnImage[ tile ]
            this.cw.drawSprite( otherSprites, sprite, screenX, screenY )
          }
        }
    } 
}