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

  collide(state) {
    return new State(state.level, state.actors, "lost");
  };

  update(time, state) {
    let newPos = VecUtils.plus( this.pos, VecUtils.times(this.speed, time));
    if ( StateUtils.touches( state, newPos, this.size, "wall") ) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, VecUtils.times( this.speed, -1 ));
    }
  };
}
Lava.prototype.size = { x: 1, y: 1 }
Lava.prototype.type = "lava"

export { Lava }