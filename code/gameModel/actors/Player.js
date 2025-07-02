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
  }

  static create(pos) {
    const startPos = VecUtils.plus(pos, this.startPosDeviation)
    const physic = new PhysicsOfPlayer();
    return new Player(startPos, this.startSpeed, physic);
  }

  update(time, state, keys) {
    const updatedPosAndSpeed = this.physics.getUpdatedPosAndSpeed( this.pos, this.speed, this.size, time, state, keys);
    return new Player( updatedPosAndSpeed.pos, updatedPosAndSpeed.speed, this.physics );
  };

  updateState( state ) {
    if ( StateUtils.touches( state, this.pos, this.size, "lava")) {
      return new State(state.level, state.actors, "lost");
    } else {
      return state;
    }
  }
}
Player.prototype.size = { x: 0.8, y: 1.5 }
Player.prototype.type = "player"

export { Player }