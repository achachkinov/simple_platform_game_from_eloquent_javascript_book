import { VecUtils } from "../../../gameModel/actors/utils/VecUtils.js";
import { ContextWrapper } from "./contextWrapper.js";
import { PlayerView } from "../Views/PlayerView.js"
import { MinimapView } from "../Views/MinimapView.js"



class CanvasDisplay {

  #cw
  #views
  #backgroundDrawers
  #actorDrawersClasses = {}
  #actorDrawers = new WeakMap();

  constructor(parent, level, backgroundDrawers, actorDrawers) {
    this.#cw = new ContextWrapper( parent, level )
    this.#initializateViews();
    this.#initializeBackgroundDrawers( backgroundDrawers );
    this.#initializeActorDrawers( actorDrawers );
  }
  #initializateViews() {
    this.#views = {};
    this.#views[ "main" ] = new PlayerView( this.#cw );
    this.#views[ "minimap" ] = new MinimapView( this.#cw );
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
    for ( let view of Object.values( this.#views )) {
      view.update( state );
    }
  };

  #drawBackgroundDrawers( state ) {
    for (let drawer of this.#backgroundDrawers) {
      drawer.draw( state, this.#views, this.#cw );
    }
  }

  #drawActorsDrawers(state) {
    for (let actor of state.actors) {
      let drawer = this.#actorDrawers.get(actor);
      if (!drawer) {
        let type = actor.type
        if (this.#actorDrawers[type]) {
          type = "_default";
        }
        let Drawer = this.#actorDrawersClasses[ type ]
        drawer = new Drawer( actor, state );
      }
      drawer.draw(state, this.#views, actor, this.#cw);
    }
  };  
}

export { CanvasDisplay }