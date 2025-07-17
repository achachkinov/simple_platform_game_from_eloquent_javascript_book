import { TrackerKeys } from "../gameModel/trackersKeys/TrackerKeys.js";
import { LevelParser } from "../gameModel/businessStuff/LevelParser.js";
import { LevelRunner } from "../gameModel/businessStuff/LevelRunner.js";
import { CanvasDisplay } from "../displays/canvas/canvas.js";
import { Player } from "../gameModel/actors/Player.js";
import { Lava } from "../gameModel/actors/Lava.js";
import { Coin } from "../gameModel/actors/Coin.js";
import { GAME_LEVELS } from "../levels/levels.js";
import { OUR_GAME_LEVELS } from "../levels/ourLevels.js";
import { ViewPort } from "./ViewPort.js";
import { SkyDrawer } from "./SkyDrawer.js";
import { BackgroundDrawer } from "./BackgroundDrawer.js";
import { LavaDrawer } from "./LavaDrawer.js";
import { CoinDrawer } from "./CoinDrawer.js";
import { PlayerDrawer } from "./PlayerDrawer.js";
import { DefaultDrawer } from "./DefaultDrawer.js";
 
const TRACK_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp"]
const ACTOR_CLASSES = [ Player, Lava, Coin ]

const viewport = new ViewPort();
const BACKGROUND_DRAWERS = [ SkyDrawer, BackgroundDrawer ]
const ACTOR_DRAWERS = [ PlayerDrawer, LavaDrawer, CoinDrawer, DefaultDrawer ]

async function runGame(plans, Display) {
  const tracerkKeys = new TrackerKeys( TRACK_KEYS );
  const levelParser = new LevelParser( ACTOR_CLASSES )
  let display 
  for (let level = 0; level < plans.length;) {
    display = new Display( document.body, level, viewport, backgroundDrawers, actorDrawers);
    const levelRunner = new LevelRunner( levelParser.parse(plans[level]), tracerkKeys, display);
    let status = await levelRunner.run()
    if (status == "won") level++;
  }
  console.log("You've won!");
}

runGame(OUR_GAME_LEVELS, CanvasDisplay);
  