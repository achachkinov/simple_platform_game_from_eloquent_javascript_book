import { VecUtils } from "./utils/VecUtils.js"
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
    const newPos = this.#calculateNewPosition( time )
    if ( this.#isNotTouchWall( state, newPos ) ) {
      this.pos = newPos
    } else if (this.reset) {
      this.pos = this.reset;
    } else {
      this.speed = VecUtils.times( this.speed, -1 )
    }
    return state
  };
  #calculateNewPosition( time ) {
    return VecUtils.plus( this.pos, VecUtils.times(this.speed, time));
  }
  #isNotTouchWall( state, newPos ) {
    return !StateUtils.touches( state, newPos, this.size, "wall")
  }

  collide(state, actor) {
    if ( actor.type == "player" ) {
      this.#collideWithPlayer( state, actor )
    }
    return state
  };
  #collideWithPlayer( state, player ) {
    const players = StateUtils.players( state )
    if ( players.length == 1 ) {
      state.status = "lost";
    } else {
      state.actors = state.actors.filter(a => a != player);
    }
  }
}
Lava.prototype.size = { x: 1, y: 1 }
Lava.prototype.type = "lava"

export { Lava }