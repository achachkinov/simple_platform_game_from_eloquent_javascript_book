import { PhysicsOfPlayer } from "./utils/PhysicsOfPlayer.js";
import { VecUtils } from "./utils/VecUtils.js"
import { StateUtils } from "./utils/StateUtils.js"
import { State } from "../businessStuff/State.js"


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
    const updatedPosAndSpeed = this.physics.getUpdatedPosAndSpeed( this.pos, this.speed, this.size, time, state, keys);
    this.pos = updatedPosAndSpeed.pos;
    this.speed = updatedPosAndSpeed.speed;
    return this
  };

  updateState( state ) {
    if ( StateUtils.touches( state, this.pos, this.size, "lava")) {
      if ( state.players.length == 1 ) {
        return new State(state.level, state.actors, "lost");
      } else {
        return new State(state.level, state.actors.filter(a => a != this), state.status);
      }
    } else {
      return state;
    }
  }

  collide(state, actor ) {
    if ( actor.type == "player") {
      const collidedPosAndSpeed = this.physics.getCollidedPosAndSpeed( this.pos, this.speed, this.size, state, actor.pos, actor.speed, actor.size );
      this.pos = collidedPosAndSpeed.pos;
      this.speed = collidedPosAndSpeed.speed;
      return state
    } else {
      return state
    }
  };
}
Player.prototype.size = { x: 0.8, y: 1.5 }
Player.prototype.type = "player"

export { Player }