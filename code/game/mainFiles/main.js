async function runGame(plans, Display) {
  const tracerkKeys = new TrackerKeys();
  const actorClasses = [ Player, Lava, Coin ]
  const levelParser = new LevelParser( actorClasses )
  for (let level = 0; level < plans.length;) {
    const levelRunner = new LevelRunner( levelParser.parse(plans[level]), tracerkKeys, Display);
    let status = await levelRunner.run()
    if (status == "won") level++;
  }
  console.log("You've won!");
}
  