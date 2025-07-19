import { StateUtils } from "../../../gameModel/actors/utils/StateUtils.js"
import { ActorUtils } from "../../../gameModel/actors/utils/ActorUtils.js"

class PlayerView {
  constructor( cw ) {
    this.position = { x: 0, y: 0 }
    this.size = { x: cw.width, y: cw.height }
    this.scale = { x: 1, y: 1 }
    this.rotateAngle = 0;
  }

  update( state ) {
    const margin = this.size.x / 3;
    const player = StateUtils.player(state);
    const origin = ActorUtils.getOriginActor( player );
  
    if (origin.x < this.position.x + margin) {
      this.position.x = Math.max(origin.x - margin, 0);
    } else if (origin.x > this.position.x + this.size.x - margin) {
      this.position.x = Math.min(origin.x + margin - this.size.x, state.level.width - this.size.x);
    }
    if (origin.y < this.position.y + margin) {
      this.position.y = Math.max(origin.y - margin, 0);
    } else if (origin.y > this.position.y + this.size.y - margin) {
      this.position.y = Math.min(origin.y + margin - this.size.y, state.level.height - this.size.y);
    }
    //this.rotateAngle+=0.001
  }

  getStruct() {
    return { 
      position: this.position,
      size: this.size,
      scale: this.scale
    }
  }
}

export { PlayerView } 