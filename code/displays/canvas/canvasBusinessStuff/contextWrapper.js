import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js";
import { spriteImageStruct } from "../img/spritesImageStruct.js"

class ContextWrapper {
  constructor( parent, level ) {
    this.scale = 40;
    this.canvas = document.createElement("canvas");
    this.canvas.width = document.documentElement.scrollWidth
    this.canvas.height = document.documentElement.scrollHeight
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.drawedSprites;
  }

  clearByColor( color ) {
    this.cx.fillStyle = color
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  remove() {
    this.canvas.remove()
  }

  clear() {
    this.drawedSprites = {};
  }

  drawSprite( sprite, viewName ) {
    if (!this.drawedSprites[viewName]) {
      this.drawedSprites[viewName] = [];
    }
    this.drawedSprites[viewName].push(sprite);
  }
  
  display( views ) {
    for (const viewName in this.drawedSprites) {
      const view = views[viewName];
      if ( !view ) continue
      this.cx.save();
      this.cx.beginPath();
      const viewStruct = view.getStruct();
      const viewTotalSize = VecUtils.times(VecUtils.factor( viewStruct.size, viewStruct.scale ), this.scale);
      this.cx.rect(viewStruct.position.x, viewStruct.position.y, viewTotalSize.x, viewTotalSize.y);
      this.cx.clip();

      for (const sprite of this.drawedSprites[viewName]) {
        const spriteImageInfo = spriteImageStruct[sprite.name];
        const spriteOnScreenInfo = this.#calculatePositionByView( sprite, view, spriteImageInfo );
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
      this.cx.restore();
    }
  }
  #calculatePositionByView( sprite, view, spriteImageInfo ) {
    const spriteImageScaleOnScreen = VecUtils.factor(spriteImageInfo.size, spriteImageInfo.scale)
    const spriteImageOriginOnScreen = VecUtils.factor(spriteImageInfo.origin, spriteImageInfo.scale)

    const viewStruct = view.getStruct();
    const viewHalfSize = VecUtils.factor( VecUtils.times( viewStruct.size, 0.5 ), viewStruct.scale )

    const positionAfterScale = VecUtils.minus(sprite.position, VecUtils.factor( sprite.scale, spriteImageOriginOnScreen) );
    const viewPosition = VecUtils.minus( positionAfterScale, viewStruct.position );
    const positionBeforeRotate = VecUtils.factor( viewPosition, viewStruct.scale)
    const position = VecUtils.plus( VecUtils.rotate( VecUtils.minus( positionBeforeRotate, viewHalfSize ), view.rotateAngle ), viewHalfSize )


    const size = VecUtils.factor(VecUtils.factor(spriteImageScaleOnScreen, viewStruct.scale), sprite.scale)
    const origin = VecUtils.plus( position, VecUtils.factor( VecUtils.factor( spriteImageOriginOnScreen, viewStruct.scale ), sprite.scale ) )
    return {
      position: position,
      size: size,
      origin: origin, 
      rotateAngle: sprite.rotateAngle,
      rotateViewAngle: view.rotateAngle
    }
  }
  #flipAndRotate( sprite, spriteOnScreenInfo ) {
    const x = (spriteOnScreenInfo.origin.x-spriteOnScreenInfo.position.x)*this.scale
    const y = (spriteOnScreenInfo.origin.y-spriteOnScreenInfo.position.y)*this.scale
    const x1 = spriteOnScreenInfo.position.x*this.scale
    const y1 = spriteOnScreenInfo.position.y*this.scale
    this.cx.translate( x1, y1 );
    this.cx.rotate(spriteOnScreenInfo.rotateViewAngle);
    this.cx.translate( x, y);
    this.cx.rotate(spriteOnScreenInfo.rotateAngle);
    if ( sprite.flip ) {
      this.cx.scale(-1, 1);
    }
    this.cx.translate( -x, -y);
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