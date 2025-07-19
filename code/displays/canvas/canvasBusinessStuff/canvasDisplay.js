import { ContextWrapper } from "./contextWrapper.js";

class CanvasDisplay {

  #cw
  #views
  #backgroundDrawers
  #actorDrawersClasses = {}
  #actorDrawers = new WeakMap();

  constructor(parent, level, views, backgroundDrawers, actorDrawers) {
    this.#cw = new ContextWrapper( parent, level )
    this.#initializateViews( views );
    this.#initializeBackgroundDrawers( backgroundDrawers );
    this.#initializeActorDrawers( actorDrawers );
  }
  #initializateViews(views) {
    this.#views = {};
    this.#views[ "main" ] = new views[0]( this.#cw );
    this.#views[ "minimap" ] = new views[1]( this.#cw );
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

  remove() {
    this.#cw.remove();
  }

  syncState(state) {
    this.#cw.clear();
    this.#updateViewport(state);
    this.#drawBackgroundDrawers(state);
    this.#drawActorsDrawers(state);
    this.#cw.display(  this.#views );
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
    for (const actor of state.actors) {
      let drawer = this.#actorDrawers.get(actor);
      if (!drawer) {
        let type = actor.type
        if (this.#actorDrawers[type]) {
          type = "_default";
        }
        let Drawer = this.#actorDrawersClasses[ type ]
        drawer = new Drawer( actor, state );
        this.#actorDrawers.set(actor, drawer);
      }
      drawer.draw(state, this.#views, actor, this.#cw);
    }
  };  
}

export { CanvasDisplay }