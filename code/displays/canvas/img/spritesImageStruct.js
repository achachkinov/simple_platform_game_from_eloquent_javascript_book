const otherSprites = document.createElement("img");
const playerSprites = document.createElement("img");

otherSprites.src = "code/displays/canvas/img/sprites.png";
playerSprites.src = "code/displays/canvas/img/CJ.png";

const spriteImageStruct = {
  "_default": {
    "src": otherSprites,
    "x": 30,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "lava": {
    "src": otherSprites,
    "x": 20,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "wall" : {
    "src": otherSprites,
    "x": 0,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "coin" : {
    "src": otherSprites,
    "x": 40,
    "y": 0,
    "width": 20,
    "height": 20
  },
  "move0": {
    "src": playerSprites,
    "x": 0,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move1" : {
    "src": playerSprites,
    "x": 24,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move2" : {
    "src": playerSprites,
    "x": 48,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move3" : {
    "src": playerSprites,
    "x": 72,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move4" : {
    "src": playerSprites,
    "x": 96,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move5" : {
    "src": playerSprites,
    "x": 120,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move6" : {
    "src": playerSprites,
    "x": 144,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "move7" : {
    "src": playerSprites,
    "x": 168,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "rest" : {
    "src": playerSprites,
    "x": 192,
    "y": 0,
    "width": 24,
    "height": 30
  },
  "jump" : {
    "src": playerSprites,
    "x": 216,
    "y": 0,
    "width": 24,
    "height": 30
  }
}
    
export { spriteImageStruct }
      