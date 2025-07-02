class LevelParser {
    #staticSymbols = { 
      ".":"empty",
      "#":"wall",
      "+":"lava" 
    }
    #actorClasses = [ Player, Lava, Coin ]
    #actorSymbols = {}
  
    constructor(plan) {
      this.#generateActorSymbols()
      this.#initializateRows(plan)
    }
  
    #generateActorSymbols() {
      for ( const actorClass of this.#actorClasses ) {
        const symbols = actorClass.SYMBOLS;
        for ( const symbol of symbols ) {
          this.#actorSymbols[ symbol ] = actorClass;
        }
      }
    }
  
    #initializateRows(plan) {
      let rows = plan.trim().split("\n").map(l => [...l]);
      this.height = rows.length;
      this.width = rows[0].length;
      this.startActors = [];
  
      this.rows = rows.map((row, y) => {
        return row.map((ch, x) => {
          if ( this.#staticSymbols[ ch ] ) {
            return this.#staticSymbols[ ch ]
          } else if ( this.#actorSymbols[ ch ] ) {
            let pos = new Vec(x, y);
            this.startActors.push(this.#actorSymbols[ ch ].create(pos, ch));
            return "empty";
          }
        });
      });
    }
  
    touches(pos, size, type) {
      let xStart = Math.floor(pos.x);
      let xEnd = Math.ceil(pos.x + size.x);
      let yStart = Math.floor(pos.y);
      let yEnd = Math.ceil(pos.y + size.y);
    
      for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
          let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
          let here = isOutside ? "wall" : this.rows[y][x];
          if (here == type) return true;
        }
      }
      return false;
    };
  }
  