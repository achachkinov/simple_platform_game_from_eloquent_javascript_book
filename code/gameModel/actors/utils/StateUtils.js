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
}

export { StateUtils }