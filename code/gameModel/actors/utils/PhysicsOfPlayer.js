import { VecUtils } from "./VecUtils.js"
import { StateUtils } from "./StateUtils.js";


class PhysicsOfPlayer {

  #playerXSpeed = 7;
  #gravity = 30;
  #jumpSpeed = 17;

  #oldPos
  #oldSpeed


  getUpdatedPosAndSpeed( playerStruct, time, state, keys, player ) {
    let xSpeed = 0;
    if (keys.includes("ArrowLeft")) { 
      xSpeed -= this.#playerXSpeed
    };
    if (keys.includes("ArrowRight")) {
      xSpeed += this.#playerXSpeed
    };

    let updatedPos = VecUtils.copy(playerStruct.pos)
    const movedX = VecUtils.plus( updatedPos, { x: xSpeed * time, y: 0 });
    if ( !StateUtils.touches( state, movedX, playerStruct.size, "wall") ) {
      updatedPos = movedX;
    }
  
    let ySpeed = playerStruct.speed.y + time * this.#gravity;
    const movedY = VecUtils.plus( updatedPos, { x: 0, y: ySpeed * time } );
    if ( !StateUtils.touches( state, movedY, playerStruct.size, "wall") ) {
      updatedPos = movedY;
    } else if (keys.includes("ArrowUp") && ySpeed > 0) {
      ySpeed = -this.#jumpSpeed;
    } else {
      ySpeed = 0;
    }

    if ( StateUtils.touches( state, playerStruct.pos, playerStruct.size, "lava")) {
      if ( StateUtils.players(state).length == 1 ) {
        state.status = "lost";
      } else {
        state.actors = state.actors.filter(a => a != player);
      }
    }
    
    this.#oldPos = playerStruct.pos
    this.#oldSpeed = playerStruct.speed

    return { pos: updatedPos, speed: { x: xSpeed, y: ySpeed}, state: state };
  }

  getCollidedPosAndSpeed( playerStruct, actorSctruct, state ) {
    const collidedPos = VecUtils.copy( playerStruct.pos )
    const collidedSpeed = VecUtils.copy( playerStruct.speed )
    if ( ( (playerStruct.pos.x + playerStruct.size.x) > (actorSctruct.pos.x + actorSctruct.size.x)) & ( playerStruct.speed.x < 0) ) {
      collidedPos.x = this.#oldPos.x
      collidedSpeed.x = 0
    } else if ( (playerStruct.pos.x < actorSctruct.pos.x) & ( playerStruct.speed.x > 0)) {
      collidedPos.x = this.#oldPos.x
      collidedSpeed.x = 0
    }

    if ( (( playerStruct.pos.y + playerStruct.size.y ) <= (actorSctruct.pos.y + actorSctruct.size.y)) & ( playerStruct.speed.y > 0)) {
      collidedPos.y = this.#oldPos.y
      collidedSpeed.y = 0
    } else if ( (playerStruct.pos.y > actorSctruct.pos.y) & ( playerStruct.speed.y < 0)) {
      collidedPos.y = this.#oldPos.y
      collidedSpeed.y = 0
    }
    return { pos: collidedPos, speed: collidedSpeed, state: state }
  }

  #leftCollide(pos1, size1, pos2, size2) {
    return (pos1 + size1) > pos2
  }

  #rightCollide(pos1, size1, pos2, size2) {
    return pos1 < (pos2 + size2)
  
  }
}

export { PhysicsOfPlayer }