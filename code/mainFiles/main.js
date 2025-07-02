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
  