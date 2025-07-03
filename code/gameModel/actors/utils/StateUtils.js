class StateUtils {
  constructor() {}

  static touches(state, pos, size, type) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);
  
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= state.level.width || y < 0 || y >= state.level.height;
        let here = isOutside ? "wall" : state.level.rows[y][x];
        if (here == type) return true;
      }
    }
    return false;
  };

  static player( state ) {
    return state.actors.find(a => a.type == "player");
  }

  static players( state ) {
    return state.actors.filter(a => a.type == "player");
  }

  static isOverlapActors( actor1, actor2 ) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
          actor1.pos.x < actor2.pos.x + actor2.size.x &&
          actor1.pos.y + actor1.size.y > actor2.pos.y &&
          actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
}

export { StateUtils }