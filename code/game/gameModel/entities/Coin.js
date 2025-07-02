class Coin {
  static SYMBOLS = ["o"]
  static WOBBLE_SPEED = 8;
  static WOBBLE_DIST = 0.07;

  static POS_DEVIATION = new Vec(0.2, 0.1);
  static START_WOOBLE = Math.random() * Math.PI * 2

  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  static create(pos) {
    const basePos = pos.plus(Coin.POS_DEVIATION);
    return new Coin(basePos, basePos, Coin.START_WOOBLE);
  }

  collide(state) {
    const filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
  };

  update(time) {
    const wobble = this.wobble + time * Coin.WOBBLE_SPEED;
    const wobblePos = Math.sin(wobble) * Coin.WOBBLE_DIST;
    const pos = this.basePos.plus(new Vec(0, wobblePos))
    return new Coin(pos, this.basePos, wobble);
  };
}
Coin.prototype.size = new Vec(0.6, 0.6);
Coin.prototype.type = "coin";