const TRACK_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp"]

class LevelRunner {
  #display
  #state
  #ending
  //#lastTime
  #trackerKeys
  #resolve

  constructor( level, trackerKeys, Display ) {
    this.#trackerKeys = trackerKeys
    this.lastTime = null;
    this.#trackKeysInit();
    this.#initState( level, Display )
  }

  #trackKeysInit() {
    this.#trackerKeys.addKeysToTrack(TRACK_KEYS)
  }
  #initState( level, Display ) {
    this.#display = new Display(document.body, level);
    this.#state = State.start(level);
    this.#ending = 1;
  }
  
  run() {
    return new Promise(resolve => {
      this.#resolve = resolve
      this.runAnimation();
    });
  }
  
  runAnimation(time) {
    if (this.lastTime != null) {
      let timeStep = Math.min(time - this.lastTime, 100) / 1000;
      if ( this.#frameFunct(timeStep) === false) return;
    }
    this.lastTime = time;
    requestAnimationFrame( time => {this.runAnimation(time)});
  }

  #frameFunct( time ) {
    this.#state = this.#state.update(time, this.#trackerKeys.currentlyPressedKeys);
    this.#display.syncState(this.#state);
    if (this.#state.status == "playing") {
      return true;
    } else if (this.#ending > 0) {
      this.#ending -= time;
      return true;
    } else {
      this.#display.clear();
      this.#resolve(this.#state.status);
      return false;
    }
  }
}


class TrackerKeys {
  #downKeys = new Set();
  #trackedKeys = new Set();

  constructor() {
    window.addEventListener('keydown', (e) => this.#handleKeyEvent(e));
    window.addEventListener('keyup', (e) => this.#handleKeyEvent(e));
  }

  #handleKeyEvent(event) {
    if (this.#trackedKeys.has(event.key)) {
      if (event.type === 'keydown') {
        this.#downKeys.add(event.key);
      } else {
        this.#downKeys.delete(event.key);
      }
      event.preventDefault();
    }
  }

  addKeysToTrack(keys) {
    keys.forEach(key => this.#trackedKeys.add(key));
  }

  removeKeysToTrack(keys) {
    keys.forEach(key => this.#trackedKeys.delete(key));
  }

  isKeyDown(key) {
    return this.#downKeys.has(key);
  }

  get currentlyPressedKeys() {
    return Array.from(this.#downKeys);
  }

  close() {

  }
}



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

  update(time, keys) {
    let actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);
  
    if (newState.status != "playing") return newState;
  
    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }
  
    for (let actor of actors) {
      if (actor != player && this.#overlap(actor, player)) {
        newState = actor.collide(newState);
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



class Level {
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


class Vec {
  constructor(x, y) {
    this.x = x; this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
  copy() {
    return new Vec(this.x, this.y)
  }
}


class Player {
  static SYMBOLS = ["@"]
  static startPosDeviation = new Vec(0, -0.5);
  static startSpeed = new Vec(0, 0);

  constructor(pos, speed, physics) {
    this.pos = pos;
    this.speed = speed;
    this.physics = physics
  }

  static create(pos) {
    const startPos = pos.plus(this.startPosDeviation)
    const physic = new PhysicsOfPlayer();
    return new Player(startPos, this.startSpeed, physic);
  }

  update(time, state, keys) {
    const updatedPosAndSpeed = this.physics.getUpdatedPosAndSpeed( this.pos, this.speed, this.size, time, state, keys);
    return new Player( updatedPosAndSpeed.pos, updatedPosAndSpeed.speed, this.physics );
  };
}
Player.prototype.size = new Vec(0.8, 1.5);
Player.prototype.type = "player"


class PhysicsOfPlayer {

  #playerXSpeed = 7;
  #gravity = 30;
  #jumpSpeed = 17;

  getUpdatedPosAndSpeed( pos, speed, size, time, state, keys ) {
    let xSpeed = 0;
    if (keys.includes("ArrowLeft")) { 
      xSpeed -= this.#playerXSpeed
    };
    if (keys.includes("ArrowRight")) {
      xSpeed += this.#playerXSpeed
    };

    let updatedPos = pos.copy()
    const movedX = updatedPos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, size, "wall")) {
      updatedPos = movedX;
    }
  
    let ySpeed = speed.y + time * this.#gravity;
    const movedY = updatedPos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, size, "wall")) {
      updatedPos = movedY;
    } else if (keys.includes("ArrowUp") && ySpeed > 0) {
      ySpeed = -this.#jumpSpeed;
    } else {
      ySpeed = 0;
    }
    return { pos: updatedPos, speed: new Vec(xSpeed, ySpeed)};
  }
}


class Lava {
  static SYMBOLS = ["=","|","v"]

  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }

  collide(state) {
    return new State(state.level, state.actors, "lost");
  };

  update(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  };
}
Lava.prototype.size = new Vec(1, 1);
Lava.prototype.type = "lava"


class Coin {
  static SYMBOLS = ["o"]
  static WOBBLE_SPEED = 8;
  static WOBBLE_DIST = 0.07;

  static POS_DEVIATION = new Vec(0.2, 0.1);
  static START_WOOBLE = Math.random() * Math.PI * 2

  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  static create(pos) {
    const basePos = pos.plus(Coin.POS_DEVIATION);
    return new Coin(basePos, basePos, Coin.START_WOOBLE);
  }

  collide(state) {
    const filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
  };

  update(time) {
    const wobble = this.wobble + time * Coin.WOBBLE_SPEED;
    const wobblePos = Math.sin(wobble) * Coin.WOBBLE_DIST;
    const pos = this.basePos.plus(new Vec(0, wobblePos))
    return new Coin(pos, this.basePos, wobble);
  };
}
Coin.prototype.size = new Vec(0.6, 0.6);
Coin.prototype.type = "coin";









