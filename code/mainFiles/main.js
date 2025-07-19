import { TrackerKeys } from "../gameModel/trackersKeys/TrackerKeys.js";
import { LevelParser } from "../gameModel/businessStuff/LevelParser.js";
import { LevelRunner } from "../gameModel/businessStuff/LevelRunner.js";
import { CanvasDisplay } from "../displays/canvas/canvasBusinessStuff/canvasDisplay.js";
import { Player } from "../gameModel/actors/Player.js";
import { Lava } from "../gameModel/actors/Lava.js";
import { Coin } from "../gameModel/actors/Coin.js";
import { GAME_LEVELS } from "../levels/levels.js";
import { OUR_GAME_LEVELS } from "../levels/ourLevels.js";
import { SkyDrawer } from "../displays/canvas/drawers/backgroundDrawers/SkyDrawer.js";
import { BackgroundDrawer } from "../displays/canvas/drawers/backgroundDrawers/BackgroundDrawer.js";
import { LavaDrawer } from "../displays/canvas/drawers/actorDrawers/LavaDrawer.js";
import { CoinDrawer } from "../displays/canvas/drawers/actorDrawers/CoinDrawer.js";
import { PlayerDrawer } from "../displays/canvas/drawers/actorDrawers/PlayerDrawer.js";
import { DefaultDrawer } from "../displays/canvas/drawers/actorDrawers/DefaultDrawer.js";
import { PlayerView } from "../displays/canvas/views/PlayerView.js"
import { MinimapView } from "../displays/canvas/views/MinimapView.js"
import { SkyImageDrawer } from "../displays/canvas/drawers/backgroundDrawers/SkyImageDrawer.js"

 
const TRACK_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp"]
const ACTOR_CLASSES = [ Player, Lava, Coin ]

const BACKGROUND_DRAWERS = [ SkyDrawer, SkyImageDrawer, BackgroundDrawer ]
const ACTOR_DRAWERS = [ PlayerDrawer, LavaDrawer, CoinDrawer, DefaultDrawer ]
const VIEWS = [ PlayerView, MinimapView ]

async function runGame(plans, Display) {
  const tracerkKeys = new TrackerKeys( TRACK_KEYS );
  const levelParser = new LevelParser( ACTOR_CLASSES )
  let display 
  for (let level = 0; level < plans.length;) {
    const parseLevel = levelParser.parse(plans[level])
    display = new Display( document.body, parseLevel, VIEWS, BACKGROUND_DRAWERS, ACTOR_DRAWERS);
    const levelRunner = new LevelRunner( parseLevel, tracerkKeys, display);
    let status = await levelRunner.run()
    if (status == "won") level++;
  }
  console.log("You've won!");
}

runGame(OUR_GAME_LEVELS, CanvasDisplay);
  