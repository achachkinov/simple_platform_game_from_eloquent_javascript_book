const otherSprites = document.createElement("img");
const playerSprites = document.createElement("img");
const defaultSprites = document.createElement("img");
const backgroundSprite = document.createElement("img");
const minimapSprites = document.createElement("img");


otherSprites.src = "code/displays/canvas/img/sprites.png";
playerSprites.src = "code/displays/canvas/img/CJ.png";
defaultSprites.src = "code/displays/canvas/img/default.png";
backgroundSprite.src = "code/displays/canvas/img/background.jpg";
minimapSprites.src = "code/displays/canvas/img/minimapSprites.png";


const spriteImageStruct = {
  "_default": {
    "src": defaultSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "lava": {
    "src": otherSprites,
    "position": { x: 20, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "wall": {
    "src": otherSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "coin": {
    "src": otherSprites,
    "position": { x: 40, y: 0 },
    "size": { x: 20, y: 20 },
    "origin": { x: 10, y: 10 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move0": {
    "src": playerSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move1": {
    "src": playerSprites,
    "position": { x: 24, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move2": {
    "src": playerSprites,
    "position": { x: 48, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move3": {
    "src": playerSprites,
    "position": { x: 72, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move4": {
    "src": playerSprites,
    "position": { x: 96, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move5": {
    "src": playerSprites,
    "position": { x: 120, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move6": {
    "src": playerSprites,
    "position": { x: 144, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "move7": {
    "src": playerSprites,
    "position": { x: 168, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "rest": {
    "src": playerSprites,
    "position": { x: 192, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "jump": {
    "src": playerSprites,
    "position": { x: 216, y: 0 },
    "size": { x: 24, y: 30 },
    "origin": { x: 12, y: 15 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "background": {
    "src": backgroundSprite,
    "position": { x: 0, y: 0 },
    "size": { x: backgroundSprite.naturalWidth, y: backgroundSprite.naturalHeight },
    "origin": { x: backgroundSprite.naturalWidth/2, y: backgroundSprite.naturalHeight/2 },
    "scale": { x: 0.05, y: 0.05 }
  },
  "minimap_lava": {
    "src": minimapSprites,
    "position": { x: 5, y: 0 },
    "size": { x: 5, y: 5 },
    "origin": { x: 3, y: 3 },
    "scale": { x: 0.2, y: 0.2 }
  },
  "minimap_wall": {
    "src": minimapSprites,
    "position": { x: 0, y: 0 },
    "size": { x: 5, y: 5 },
    "origin": { x: 3, y: 3 },
    "scale": { x: 0.2, y: 0.2 }
  },
  "minimap_coin": {
    "src": minimapSprites,
    "position": { x: 10, y: 0 },
    "size": { x: 5, y: 5 },
    "origin": { x: 3, y: 3 },
    "scale": { x: 0.2, y: 0.2 }
  },
  "minimap_player": {
    "src": minimapSprites,
    "position": { x: 15, y: 0 },
    "size": { x: 5, y: 5 },
    "origin": { x: 3, y: 3 },
    "scale": { x: 0.2, y: 0.2 }
  }
};
    
export { spriteImageStruct }
      