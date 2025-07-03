class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }

  get players() {
    return this.actors.filter(a => a.type == "player");
  }

  update(time, keys) {
    let actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);
  
    if (newState.status != "playing") return newState;
  
    for ( let actor1 of newState.actors ) {
      newState = actor1.updateState( newState )
      for (let actor2 of actors) {
        if ( actor1 != actor2 && this.#overlap(actor1, actor2)) {
          newState = actor2.collide(newState, actor1);
        }
      }
    }
    return newState;
  };

  #overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
          actor1.pos.x < actor2.pos.x + actor2.size.x &&
          actor1.pos.y + actor1.size.y > actor2.pos.y &&
          actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
}

export { State }
  