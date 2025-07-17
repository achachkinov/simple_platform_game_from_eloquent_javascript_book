import { VecUtils } from "./utils/VecUtils.js"

class Coin {
  static SYMBOLS = ["o"]
  static WOBBLE_SPEED = 8;
  static WOBBLE_DIST = 0.7;

  static POS_DEVIATION = { x: 0.2, y: 0.1 };
  static START_WOOBLE = Math.random() * Math.PI * 2

  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  static create(pos) {
    const basePos = VecUtils.plus(pos, Coin.POS_DEVIATION);
    return new Coin(basePos, basePos, Coin.START_WOOBLE);
  }

  update(time, state) {
    this.#updateWobble(time)
    this.#updatepos()
    return state
  };
  #updateWobble(time) {
    this.wobble += time * Coin.WOBBLE_SPEED;
  }
  #updatepos() {
    const wobblePos = Math.sin(this.wobble)*Coin.WOBBLE_DIST;
    const posDiff = { x: 0, y: wobblePos }
    this.pos = VecUtils.plus( this.basePos, posDiff )
  }

  collide(state, actor) {
    if ( actor.type == "player" ) {
      this.#collideWithPlayer( state )
    }
    return state
  };
  #collideWithPlayer( state ) {
    state.actors = state.actors.filter(a => a != this);
    state.status = this.#calculateStatus( state )
  }
  #calculateStatus( state ) {
    if (!state.actors.some(a => a.type == "coin")) {
      return "won"
    }
    return state.status
  }
}
Coin.prototype.size = { x: 0.6, y: 0.6 }
Coin.prototype.type = "coin";

export { Coin }