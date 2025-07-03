import { VecUtils } from "./utils/VecUtils.js"
import { State } from "../businessStuff/State.js";
import { StateUtils } from "./utils/StateUtils.js"

class Lava {
  static SYMBOLS = ["=","|","v"]

  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, { x:2, y:0 } );
    } else if (ch == "|") {
      return new Lava(pos, { x:0, y:2 } );
    } else if (ch == "v") {
      return new Lava(pos, { x:0, y:3 }, pos);
    }
  }

  update(time, state) {
    let newPos = VecUtils.plus( this.pos, VecUtils.times(this.speed, time));
    if ( !StateUtils.touches( state, newPos, this.size, "wall") ) {
      this.pos = newPos
    } else if (this.reset) {
      this.pos = this.reset;
    } else {
      this.speed = VecUtils.times( this.speed, -1 )
    }
    return this
  };

  updateState( state ) {
    return state
  }

  collide(state, actor) {
    if ( actor.type == "player" ) {
      const players = state.players
      if ( players.length == 1 ) {
        return new State(state.level, state.actors, "lost");
      } else {
        return new State(state.level, state.actors.filter(a => a != actor), state.status);
      }
    } else {
      return state
    }
  };
}
Lava.prototype.size = { x: 1, y: 1 }
Lava.prototype.type = "lava"

export { Lava }