class LevelParser {
  #staticSymbols = { 
    ".":"empty",
    "#":"wall",
    "+":"lava" 
  }
  #actorSymbols = {}

  constructor() {
    this.#generateActorSymbols()
  }

  #generateActorSymbols( actorClasses ) {
    for ( const actorClass of actorClasses) {
      const symbols = actorClass.SYMBOLS;
      for ( const symbol of symbols ) {
        this.#actorSymbols[ symbol ] = actorClass;
      }
    }
  }

  parse(plan) {
    const rowsWitchActors = plan.trim().split("\n").map(l => [...l]);
    const height = rowsWitchActors.length;
    const width = rowsWitchActors[0].length;
    const startActors = [];

    const rows = rowsWitchActors.map((row, y) => {
      return row.map((ch, x) => {
        if ( this.#staticSymbols[ ch ] ) {
          return this.#staticSymbols[ ch ]
        } else if ( this.#actorSymbols[ ch ] ) {
          let pos = new Vec(x, y);
          startActors.push(this.#actorSymbols[ ch ].create(pos, ch));
          return "empty";
        }
      });
    });

    return { height, width, startActors, rows}
  }
}
  