import { SpriteUtil } from "../utils/SpriteUtils.js";

class PlayerDrawer {
  constructor() {
    this.flipPlayer = false;
    this.status
    this.#initializeSprites();
  }

  #initializeSprites() {
    this.sprite = SpriteUtil.createDefaultSprite("");
  }

  draw(state, view, actor, cw) {
    let x = actor.pos.x;
    let y = actor.pos.y;
    const playerXOverlap = 0.2;
    x -= playerXOverlap;
    if (actor.speed.x != 0) {
      this.flipPlayer = actor.speed.x < 0;
    }

    let tile = "rest";
    if (actor.speed.y != 0) {
      tile = "jump";
    } else if (actor.speed.x != 0) {
      tile = "move" + Math.floor(Date.now() / 60) % 8;
    }
    const sprite = this.#getSprite()
    cw.drawSprite( this.sprite, view )
  }
  #getSprite() {

  }
}
PlayerDrawer.prototype.type = "player"

export { PlayerDrawer }