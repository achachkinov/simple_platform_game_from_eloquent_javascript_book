import { spriteStruct } from "../img/spritesImageStruct"

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

  drawSprite( sprite ) {
    const spriteImageInfo = spriteStruct[sprite.name];
    if ( sprite.flip ) {
        this.#flipHorizontally( screenX*this.scale + sprite.width*(this.scale/20) / 2);
    }
    this.cx.drawImage(spriteImageInfo.src, spriteImageInfo.x, spriteImageInfo.y, spriteImageInfo.width, spriteImageInfo.height, sprite.position.x*this.scale, sprite.position.y*this.scale, spriteImageInfo.width*this.scale/20, spriteImageInfo.height*this.scale/20);
    if ( sprite.flip ) {
        this.cx.restore();
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