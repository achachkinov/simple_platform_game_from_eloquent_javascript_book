const otherSprites = document.createElement("img");
const playerSprites = document.createElement("img");
const defaultSprites = document.createElement("img");

otherSprites.src = "code/displays/canvas/img/sprites.png";
playerSprites.src = "code/displays/canvas/img/CJ.png";
defaultSprites.src = "code/displays/canvas/img/default.png";

const spriteImageStruct = {
  "_default": {
    "src": defaultSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 }
  },
  "lava": {
    "src": otherSprites,
    "position": { x: 20, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 }
  },
  "wall": {
    "src": otherSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 }
  },
  "coin": {
    "src": otherSprites,
    "position": { x: 40, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 }
  },
  "move0": {
    "src": playerSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move1": {
    "src": playerSprites,
    "position": { x: 24, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move2": {
    "src": playerSprites,
    "position": { x: 48, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move3": {
    "src": playerSprites,
    "position": { x: 72, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move4": {
    "src": playerSprites,
    "position": { x: 96, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move5": {
    "src": playerSprites,
    "position": { x: 120, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move6": {
    "src": playerSprites,
    "position": { x: 144, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "move7": {
    "src": playerSprites,
    "position": { x: 168, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "rest": {
    "src": playerSprites,
    "position": { x: 192, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  },
  "jump": {
    "src": playerSprites,
    "position": { x: 216, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 }
  }
};
    
export { spriteImageStruct }
      