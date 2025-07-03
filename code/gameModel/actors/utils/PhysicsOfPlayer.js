import { VecUtils } from "./VecUtils.js"
import { StateUtils } from "./StateUtils.js";


class PhysicsOfPlayer {

  #playerXSpeed = 7;
  #gravity = 30;
  #jumpSpeed = 17;

  #oldPos
  #oldSpeed


  getUpdatedPosAndSpeed( pos, speed, size, time, state, keys ) {
    let xSpeed = 0;
    if (keys.includes("ArrowLeft")) { 
      xSpeed -= this.#playerXSpeed
    };
    if (keys.includes("ArrowRight")) {
      xSpeed += this.#playerXSpeed
    };

    let updatedPos = VecUtils.copy(pos)
    const movedX = VecUtils.plus( updatedPos, { x: xSpeed * time, y: 0 });
    if ( !StateUtils.touches( state, movedX, size, "wall") ) {
      updatedPos = movedX;
    }
  
    let ySpeed = speed.y + time * this.#gravity;
    const movedY = VecUtils.plus( updatedPos, { x: 0, y: ySpeed * time } );
    if ( !StateUtils.touches( state, movedY, size, "wall") ) {
      updatedPos = movedY;
    } else if (keys.includes("ArrowUp") && ySpeed > 0) {
      ySpeed = -this.#jumpSpeed;
    } else {
      ySpeed = 0;
    }
    
    this.#oldPos = pos
    this.#oldSpeed = speed

    return { pos: updatedPos, speed: { x: xSpeed, y: ySpeed} };
  }

  getCollidedPosAndSpeed( pos, speed, size, state, posActor, speedActor, sizeActor ) {
    const collidedPos = VecUtils.copy( pos )
    const collidedSpeed = VecUtils.copy( speed )
    if ( ( (pos.x + size.x) > (posActor.x + sizeActor.x)) & ( speed.x < 0) ) {
      collidedPos.x = this.#oldPos.x
      collidedSpeed.x = 0
    } else if ( (pos.x < posActor.x) & ( speed.x > 0)) {
      collidedPos.x = this.#oldPos.x
      collidedSpeed.x = 0
    }

    if ( (( pos.y + size.y ) <= (posActor.y + sizeActor.y)) & ( speed.y > 0)) {
      collidedPos.y = this.#oldPos.y
      collidedSpeed.y = 0
    } else if ( (pos.y > posActor.y) & ( speed.y < 0)) {
      collidedPos.y = this.#oldPos.y
      collidedSpeed.y = 0
    }
    return { pos: collidedPos, speed: collidedSpeed }
  }

  #leftCollide(pos1, size1, pos2, size2) {
    return (pos1 + size1) > pos2
  }

  #rightCollide(pos1, size1, pos2, size2) {
    return pos1 < (pos2 + size2)
  
  }
}

export { PhysicsOfPlayer }