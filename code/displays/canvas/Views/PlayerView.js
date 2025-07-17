import { StateUtils } from "../../../gameModel/actors/utils/StateUtils.js"
import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js"

class PlayerView {
  constructor( cw ) {
    this.left = 0
    this.top = 0
    this.width = cw.width
    this.height = cw.height
    this.scaleWidth = 1;
    this.scaleHeight = 1;
  }

  update( state ) {
    const margin = this.width / 3;
    const player = StateUtils.player(state);
    const center = VecUtils.plus( player.pos, VecUtils.times(player.size, 0.5));
  
    if (center.x < this.left + margin) {
      this.left = Math.max(center.x - margin, 0);
    } else if (center.x > this.left + this.width - margin) {
      this.left = Math.min(center.x + margin - this.width, state.level.width - this.width);
    }
    if (center.y < this.top + margin) {
      this.top = Math.max(center.y - margin, 0);
    } else if (center.y > this.top + this.height - margin) {
      this.top = Math.min(center.y + margin - this.height, state.level.height - this.height);
    }
  }

  getViewStruct() {
    return { 
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height  
    }
  }
}

export { PlayerView } 