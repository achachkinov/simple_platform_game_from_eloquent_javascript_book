import { StateUpdater } from "./StateUpdater.js"

class LevelRunner {
  #display
  #state
  #ending
  //#lastTime
  #trackerKeys
  #resolve
  #stateUpdater

  constructor( level, trackerKeys, Display ) {
    this.#trackerKeys = trackerKeys
    this.lastTime = null;
    this.#initState( level, Display )
  }

  #initState( level, Display ) {
    this.#display = new Display(document.body, level);
    this.#stateUpdater = new StateUpdater();
    this.#state = this.#stateUpdater.createState(level);
    this.#ending = 1;
  }
  
  run() {
    return new Promise(resolve => {
      this.#resolve = resolve
      this.runAnimation();
    });
  }
  
  runAnimation(time) {
    if (this.lastTime != null) {
      let timeStep = Math.min(time - this.lastTime, 100) / 1000;
      if ( this.#frameFunct(timeStep) === false) return;
    }
    this.lastTime = time;
    requestAnimationFrame( time => {this.runAnimation(time)});
  }

  #frameFunct( time ) {
    this.#state = this.#stateUpdater.update(this.#state, time, this.#trackerKeys.currentlyPressedKeys);
    this.#display.syncState(this.#state);
    if (this.#state.status == "playing") {
      return true;
    } else if (this.#ending > 0) {
      this.#ending -= time;
      return true;
    } else {
      this.#display.clear();
      this.#resolve(this.#state.status);
      return false;
    }
  }
}

export { LevelRunner }