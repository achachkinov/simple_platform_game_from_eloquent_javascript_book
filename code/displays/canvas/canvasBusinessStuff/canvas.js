import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js";
import { StateUtils } from "../../../gameModel/actors/utils/StateUtils.js"
import { ContextWrapper } from "./contextWrapper.js";
import { ViewPort } from "./ViewPort.js";

class CanvasDisplay {
  constructor(parent, level) {
    this.cw = new ContextWrapper( parent, level )
    this.flipPlayer = false;
    this.viewPort = new ViewPort();
  }

  clear() {
    this.cw.remove();
  }

  syncState(state) {
    this.#updateViewport(state);
    this.#drawBackgroundDrawers(state);
    this.#drawActorsDrawers(state);
  }

  #updateViewport(state) {
    this.viewPort.update( state );
  };

  #drawBackgroundDrawers( state ) {

  }

  #drawActorsDrawers(state) {
  }

  #drawActors(state) {
    for (let actor of state.actors) {
    }
  };  
}

export { CanvasDisplay }