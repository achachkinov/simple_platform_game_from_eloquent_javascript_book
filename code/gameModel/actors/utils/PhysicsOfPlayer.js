import { VecUtils } from "./VecUtils.js"
import { StateUtils } from "./StateUtils.js";


class PhysicsOfPlayer {

  #playerXSpeed = 7;
  #gravity = 30;
  #jumpSpeed = 17;

  #isJump = false
  #oldPos
  #oldSpeed


  getUpdatedPosAndSpeed( player, time, state, keys ) {
    const playerStruct = player.getStruct()
    let updatedPos = VecUtils.copy(playerStruct.pos)
    this.#oldPos = playerStruct.pos
    this.#oldSpeed = playerStruct.speed

    if ( keys.includes("ArrowUp") ) {
      this.#isJump = true
    } else {
      this.#isJump = false
    }

    const xSpeed = this.#calculateXSpeed( keys )
    const movedX = VecUtils.plus( updatedPos, { x: xSpeed*time, y: 0 });
    if ( this.#isNotTocuhWall(state, movedX, playerStruct )  ) {
      updatedPos = movedX;
    }
  
    let ySpeed = this.#calculateYSpeed( playerStruct, time);
    const movedY = VecUtils.plus( updatedPos, { x: 0, y: ySpeed*time } );
    if ( this.#isNotTocuhWall(state, movedY, playerStruct ) ) {
      updatedPos = movedY;
    } else if (keys.includes("ArrowUp") && ySpeed > 0) {
      ySpeed = -this.#jumpSpeed;
    } else {
      ySpeed = 0;
    }

    this.#touchLavaPhysics( state, playerStruct, player );

    return { pos: updatedPos, speed: { x: xSpeed, y: ySpeed}, state: state };
  }
  #calculateXSpeed( keys ) {
    let xSpeed = 0;
    if (keys.includes("ArrowLeft")) { 
      xSpeed -= this.#playerXSpeed
    };
    if (keys.includes("ArrowRight")) {
      xSpeed += this.#playerXSpeed
    };
    return xSpeed;
  }
  #calculateYSpeed( playerStruct, time ) {
    const ySpeed = playerStruct.speed.y + this.#gravity * time;
    return ySpeed;
  }
  #isNotTocuhWall( state, movedX, playerStruct ) {
    return !StateUtils.touches( state, movedX, playerStruct.size, "wall")
  }
  #touchLavaPhysics( state, playerStruct, player ) {
    if ( StateUtils.touches( state, playerStruct.pos, playerStruct.size, "lava")) {
      if ( StateUtils.players(state).length == 1 ) {
        state.status = "lost";
      } else {
        state.actors = state.actors.filter(a => a != player);
      }
    }
  }

  getCollidedPosAndSpeed( player, actor, state ) {
    const playerStruct = player.getStruct()
    if ( actor.type == "player") {
      return this.#getCollidedPosAndSpeedWithPlayer( player, actor, state )
    } else {
      return { pos: playerStruct.pos, speed: playerStruct.speed, state: state  }
    }
  }
  #getCollidedPosAndSpeedWithPlayer( player, actor, state ) {
    const playerStruct = player.getStruct()
    const actorSctruct = actor.getStruct()
    const collidedPos = VecUtils.copy( playerStruct.pos )
    const collidedSpeed = VecUtils.copy( playerStruct.speed )
    if ( this.#isLeftCollide( playerStruct, actorSctruct ) || this.#isRightCollide( playerStruct, actorSctruct ) ) {
      collidedPos.x = this.#oldPos.x
      collidedSpeed.x = 0
    }

    if ( this.#isBottomCollide(playerStruct, actorSctruct) || this.#isTopCollide(playerStruct, actorSctruct)) {
      collidedPos.y = this.#oldPos.y
      collidedSpeed.y = 0
      if ( this.#isJump && this.#isBottomCollide(playerStruct, actorSctruct) ) {
        collidedSpeed.y = -this.#jumpSpeed;
      }
    }
    return { pos: collidedPos, speed: collidedSpeed, state: state }
  }

  #isLeftCollide( playerStruct, actorSctruct ) {
    return ( (playerStruct.pos.x + playerStruct.size.x) > (actorSctruct.pos.x + actorSctruct.size.x)) & ( playerStruct.speed.x < 0)
  }
  #isRightCollide(playerStruct, actorSctruct) {
    return (playerStruct.pos.x < actorSctruct.pos.x) & ( playerStruct.speed.x > 0)
  }
  #isTopCollide(playerStruct, actorSctruct) {
    return (playerStruct.pos.y > actorSctruct.pos.y) & ( playerStruct.speed.y < 0)
  }
  #isBottomCollide(playerStruct, actorSctruct) {
    return (( playerStruct.pos.y + playerStruct.size.y ) <= (actorSctruct.pos.y + actorSctruct.size.y)) & ( playerStruct.speed.y > 0)
  }
}

export { PhysicsOfPlayer }