import { PhysicsOfPlayer } from "./utils/PhysicsOfPlayer.js";
import { VecUtils } from "./utils/VecUtils.js"
import { StateUtils } from "./utils/StateUtils.js"


class Player {
  static SYMBOLS = ["@"]
  static startPosDeviation = { x: 0, y: -0.5 };
  static startSpeed = { x: 0, y: 0 };

  constructor(pos, speed, physics) {
    this.pos = pos;
    this.speed = speed;
    this.physics = physics
    this.oldPos
    this.oldSpeed
  }

  static create(pos) {
    const startPos = VecUtils.plus(pos, this.startPosDeviation)
    const physic = new PhysicsOfPlayer();
    return new Player(startPos, this.startSpeed, physic);
  }

  update(time, state, keys) {
    const playerStruct = this.getStruct()
    const updatedPosAndSpeed = this.physics.getUpdatedPosAndSpeed( playerStruct, time, state, keys, this);
    this.pos = updatedPosAndSpeed.pos;
    this.speed = updatedPosAndSpeed.speed;
    return state
  };

  collide( state, actor ) {
    if ( actor.type == "player") {
      const playerStruct = this.getStruct()
      const actorStruct = actor.getStruct()
      const collidedPosAndSpeed = this.physics.getCollidedPosAndSpeed( playerStruct, actorStruct, state )
      this.pos = collidedPosAndSpeed.pos;
      this.speed = collidedPosAndSpeed.speed;
    }
    return state
  };

  getStruct() {
    const struct = { 
      pos: this.pos, 
      speed: this.speed, 
      size: this.size 
    }
    return struct
  }
}
Player.prototype.size = { x: 0.8, y: 1.5 }
Player.prototype.type = "player"

export { Player }