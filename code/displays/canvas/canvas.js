import { VecUtils } from "../../gameModel/actors/utils/VecUtils.js";
import { StateUtils } from "../../gameModel/actors/utils/StateUtils.js"

const spritesOnImage = {
  "lava": {
    "x": 20,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "wall" : {
    "x": 0,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "coin" : {
    "x": 40,
    "y": 0,
    "width": 20,
    "height": 20
  }
}


const spritesOnImageOfPlayer = {
  "move0": {
    "x": 0,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move1" : {
    "x": 24,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move2" : {
    "x": 48,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move3" : {
    "x": 72,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move4" : {
    "x": 96,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move5" : {
    "x": 120,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move6" : {
    "x": 144,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move7" : {
    "x": 168,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "rest" : {
    "x": 192,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "jump" : {
    "x": 216,
    "y": 0,
    "width": 24,
    "height": 30
  }
}

const otherSprites = document.createElement("img");
otherSprites.src = "code/displays/canvas/img/sprites.png";

const playerSprites = document.createElement("img");
playerSprites.src = "code/displays/canvas/img/CJ.png";

const results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

class CanvasDisplay {
  constructor(parent, level) {
    this.cw = new ContextWrapper( parent, level )

    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.cw.width,
      height: this.cw.height
    };
  }

  clear() {
    this.cw.remove();
  }

  syncState(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
  }

  updateViewport(state) {
    const view = this.viewport
    const margin = view.width / 3;
    const player = StateUtils.player(state);
    const center = VecUtils.plus( player.pos, VecUtils.times(player.size, 0.5));
  
    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
    }
    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
    }
  };

  clearDisplay(status) {
    if (status == "won") {
      this.cw.clearByColor("rgb(68, 191, 255)")
    } else if (status == "lost") {
      this.cw.clearByColor("rgb(44, 136, 214)")
    } else {
      this.cw.clearByColor("rgb(52, 166, 251)")
    }
  };  

  drawBackground(level) {
    let {left, top, width, height} = this.viewport;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);
  
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = level.rows[y][x];
        if (tile == "empty") continue;
        let screenX = (x - left);
        let screenY = (y - top);
        const sprite = spritesOnImage[ tile ]
        this.cw.drawSprite( otherSprites, sprite, screenX, screenY )
      }
    }
  };

  drawActors(actors) {
    for (let actor of actors) {
      let width = actor.size.x;
      let height = actor.size.y;
      let x = (actor.pos.x - this.viewport.left);
      let y = (actor.pos.y - this.viewport.top);
      if (actor.type == "player") {
        this.drawPlayer(actor, x, y, width, height);
      } else {
        const sprite = spritesOnImage[ actor.type ]
        this.cw.drawSprite( otherSprites, sprite, x, y )
      }
    }
  };  

  drawPlayer(player, x, y) {
    const playerXOverlap = 0.2;
    x -= playerXOverlap;
    if (player.speed.x != 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    let tile = "rest";
    if (player.speed.y != 0) {
      tile = "jump";
    } else if (player.speed.x != 0) {
      tile = "move" + Math.floor(Date.now() / 60) % 8;
    }
    const sprite = spritesOnImageOfPlayer[ tile ]

    if ( this.flipPlayer ) {
      this.cw.drawFlipedSprite( playerSprites, sprite, x, y );
    } else {
      this.cw.drawSprite( playerSprites, sprite, x, y );
    }
  };
}


class ContextWrapper {
  constructor( parent, level ) {
    this.scale = 40;
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(1200, level.width * this.scale);
    this.canvas.height = Math.min(900, level.height * this.scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");
  }

  clearByColor( color ) {
    this.cx.fillStyle = color
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  remove() {
    this.canvas.remove()
  }

  drawSprite( img, sprite, screenX, screenY ) {
    this.cx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, screenX*this.scale, screenY*this.scale, sprite.width*this.scale/20, sprite.height*this.scale/20);
  }

  drawFlipedSprite( img, sprite, screenX, screenY ) {
    this.cx.save();
    this.#flipHorizontally( screenX*this.scale + sprite.width*(this.scale/20) / 2);
    this.drawSprite( img, sprite, screenX, screenY )
    this.cx.restore();
  }

  #flipHorizontally( around ) {
    this.cx.translate(around, 0);
    this.cx.scale(-1, 1);
    this.cx.translate(-around, 0);
  }

  get height() {
    return this.canvas.height/this.scale
  }
  get width() {
    return this.canvas.width/this.scale
  }
}

export { CanvasDisplay }