import { VecUtils } from "./utils/VecUtils.js"

class Coin {
  static SYMBOLS = ["o"]
  static WOBBLE_SPEED = 8;
  static WOBBLE_DIST = 0.07;

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
    const wobble = this.wobble + time * Coin.WOBBLE_SPEED;
    const wobblePos = Math.sin(wobble) * Coin.WOBBLE_DIST;
    const pos = VecUtils.plus( this.basePos, { x: 0, y: wobblePos } )
    this.pos = pos;
    this.wobble = wobble;
    return state
  };

  collide(state, actor) {
    if ( actor.type == "player" ) {
      const filtered = state.actors.filter(a => a != this);
      let status = state.status;
      if (!filtered.some(a => a.type == "coin")) status = "won";
      state.actors = filtered;
      state.status = status;
    }
    return state
  };
}
Coin.prototype.size = { x: 0.6, y: 0.6 }
Coin.prototype.type = "coin";

export { Coin }