import { spriteImageStruct } from "../img/spritesImageStruct.js"

class ContextWrapper {
  constructor( parent, level ) {
    this.scale = 40;
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(1200, level.width * this.scale);
    this.canvas.height = Math.min(900, level.height * this.scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");
  }

  clearByColor( color ) {
    this.cx.fillStyle = color
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  remove() {
    this.canvas.remove()
  }

  drawSprite( sprite, view ) {
    const spriteImageInfo = spriteImageStruct[sprite.name];
    const totalPosition = this.#calculatePositionByView( sprite, view );
    if ( sprite.flip ) {
      this.cx.save();
      this.#flipHorizontally( totalPosition.x*this.scale + spriteImageInfo.width*view.scaleWidth*(this.scale/20) / 2);
    }
    this.cx.drawImage(
      spriteImageInfo.src, 
      spriteImageInfo.x, 
      spriteImageInfo.y, 
      spriteImageInfo.width, 
      spriteImageInfo.height, 
      totalPosition.x*this.scale, 
      totalPosition.y*this.scale, 
      spriteImageInfo.width*totalPosition.width*this.scale/20, 
      spriteImageInfo.height*totalPosition.height*this.scale/20);

    if ( sprite.flip ) {
      this.cx.restore();
    }
  }
  #calculatePositionByView( sprite, view ) {
    return { 
      x: (sprite.position.x - view.left)*view.scaleWidth,
      y: (sprite.position.y - view.top)*view.scaleHeight,
      width: view.scaleWidth,
      height: view.scaleHeight
    }
  }
  #flipHorizontally( around ) {
    this.cx.translate(around, 0);
    this.cx.scale(-1, 1);
    this.cx.translate(-around, 0);
  }

  get height() {
    return this.canvas.height/this.scale
  }
  get width() {
    return this.canvas.width/this.scale
  }
}

export { ContextWrapper }