async function runGame(plans, Display) {
  const tracerkKeys = new TrackerKeys();
  for (let level = 0; level < plans.length;) {
    const levelRunner = new LevelRunner( new Level(plans[level]), tracerkKeys, Display);
    let status = await levelRunner.run()
    if (status == "won") level++;
  }
  console.log("You've won!");
}
  