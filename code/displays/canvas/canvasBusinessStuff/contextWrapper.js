import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js";
import { spriteImageStruct } from "../img/spritesImageStruct.js"

class ContextWrapper {
  constructor( parent, level ) {
    this.scale = 40;
    this.pixelsToOneMeter = 20;
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
    const spriteImageScaleOnScreen = VecUtils.times(spriteImageInfo.size, 1/this.pixelsToOneMeter)
    const spriteOnScreenInfo = this.#calculatePositionByView( sprite, view, spriteImageScaleOnScreen );
    this.cx.save();
    this.#flipAndRotate( sprite, spriteOnScreenInfo );
    this.cx.drawImage(
      spriteImageInfo.src, 
      spriteImageInfo.position.x, 
      spriteImageInfo.position.y, 
      spriteImageInfo.size.x, 
      spriteImageInfo.size.y, 
      spriteOnScreenInfo.position.x*this.scale, 
      spriteOnScreenInfo.position.y*this.scale, 
      spriteOnScreenInfo.size.x*this.scale, 
      spriteOnScreenInfo.size.y*this.scale
    );
    this.cx.restore();
  }
  #calculatePositionByView( sprite, view, spriteImageScaleOnScreen ) {
    const viewStruct = view.getStruct();
    const viewHalfSize = VecUtils.factor( VecUtils.times( viewStruct.size, 0.5 ), viewStruct.scale )
    const rotateAngle = sprite.rotateAngle + view.rotateAngle;
    const positionBeforeRotate = VecUtils.factor( VecUtils.minus( sprite.position, viewStruct.position ), viewStruct.scale)
    const position = VecUtils.plus( VecUtils.rotate( VecUtils.minus( positionBeforeRotate, viewHalfSize ), rotateAngle ), viewHalfSize )
    const size = VecUtils.factor(spriteImageScaleOnScreen, viewStruct.scale)
    const origin = VecUtils.plus( position, VecUtils.factor( VecUtils.times(spriteImageScaleOnScreen, 0.5), viewStruct.scale ) )
    return {
      position: position,
      size: size,
      origin: origin, 
      rotateAngle: rotateAngle
    }
  }
  #flipAndRotate( sprite, spriteOnScreenInfo ) {
    const x = (spriteOnScreenInfo.origin.x-spriteOnScreenInfo.position.x)*this.scale
    const y = (spriteOnScreenInfo.origin.y-spriteOnScreenInfo.position.y)*this.scale
    const x1 = spriteOnScreenInfo.position.x*this.scale
    const y1 = spriteOnScreenInfo.position.y*this.scale
    this.cx.translate( x1, y1 );
    this.cx.rotate(spriteOnScreenInfo.rotateAngle);
    if ( sprite.flip ) {
      this.cx.translate( x, y);
      this.cx.scale(-1, 1);
      this.cx.translate( -x, -y);
    }
    this.cx.translate( -x1, -y1);
  }

  get height() {
    return this.canvas.height/this.scale
  }
  get width() {
    return this.canvas.width/this.scale
  }
}

export { ContextWrapper }