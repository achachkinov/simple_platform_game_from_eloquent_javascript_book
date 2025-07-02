import { VecUtils } from "./VecUtils.js"
import { StateUtils } from "./StateUtils.js";


class PhysicsOfPlayer {

  #playerXSpeed = 7;
  #gravity = 30;
  #jumpSpeed = 17;

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
    return { pos: updatedPos, speed: { x: xSpeed, y: ySpeed} };
  }
}

export { PhysicsOfPlayer }