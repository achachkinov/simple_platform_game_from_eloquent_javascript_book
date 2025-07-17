import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js";
import { ContextWrapper } from "./contextWrapper.js";




class CanvasDisplay {

  #cw
  #viewPort
  #backgroundDrawers
  #actorDrawersClasses = {}
  #actorDrawers = new WeakMap();

  constructor(parent, level, viewport, backgroundDrawers, actorDrawers) {
    this.#cw = new ContextWrapper( parent, level )
    this.#viewPort = viewport
    this.#initializeBackgroundDrawers( backgroundDrawers );
    this.#initializeActorDrawers( actorDrawers );
  }
  #initializeBackgroundDrawers( backgroundDrawers ) {
    this.#backgroundDrawers = []
    for (let Drawer of backgroundDrawers) {
      this.#backgroundDrawers.push(new Drawer());
    }
  }
  #initializeActorDrawers( actorDrawers ) {
    this.#actorDrawersClasses 
    for (let Drawer of actorDrawers) {
      this.#actorDrawersClasses[Drawer.type] = Drawer;
    }
  }

  clear() {
    this.#cw.remove();
  }

  syncState(state) {
    this.#updateViewport(state);
    this.#drawBackgroundDrawers(state);
    this.#drawActorsDrawers(state);
  }

  #updateViewport(state) {
    this.#viewPort.update( state );
  };

  #drawBackgroundDrawers( state ) {
    for (let drawer of this.#backgroundDrawers) {
      drawer.draw( state, this.#viewPort );
    }
  }

  #drawActorsDrawers(state) {
    for (let actor of state.actors) {
      let drawer = this.#actorDrawers.get(actor);
      if (!drawer) {
        let type = actor.type
        if (!(type in this.actorDrawers)) {
          type = "_default";
        }
        let Drawer = this.#actorDrawersClasses[ type ]
        drawer = new Drawer( actor, state );
      }
      drawer.draw(state, this.#viewPort, actor, this.#cw);
    }
  };  
}

export { CanvasDisplay }