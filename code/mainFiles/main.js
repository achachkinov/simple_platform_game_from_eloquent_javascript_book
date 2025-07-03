import { TrackerKeys } from "../gameModel/trackersKeys/TrackerKeys.js";
import { LevelParser } from "../gameModel/businessStuff/LevelParser.js";
import { LevelRunner } from "../gameModel/businessStuff/LevelRunner.js";
import { CanvasDisplay } from "../displays/canvas/canvas.js";
import { Player } from "../gameModel/actors/Player.js";
import { Lava } from "../gameModel/actors/Lava.js";
import { Coin } from "../gameModel/actors/Coin.js";
import { GAME_LEVELS } from "../levels/levels.js";
import { OUR_GAME_LEVELS } from "../levels/ourLevels.js";
 
const TRACK_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp"]
const ACTOR_CLASSES = [ Player, Lava, Coin ]

async function runGame(plans, Display) {
  const tracerkKeys = new TrackerKeys( TRACK_KEYS );
  const levelParser = new LevelParser( ACTOR_CLASSES )
  for (let level = 0; level < plans.length;) {
    const levelRunner = new LevelRunner( levelParser.parse(plans[level]), tracerkKeys, Display);
    let status = await levelRunner.run()
    if (status == "won") level++;
  }
  console.log("You've won!");
}

runGame(OUR_GAME_LEVELS, CanvasDisplay);
  