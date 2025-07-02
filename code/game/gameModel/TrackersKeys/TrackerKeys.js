const TRACK_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp"]

class TrackerKeys {
  #downKeys = new Set();
  #trackedKeys = new Set();

  constructor() {
    window.addEventListener('keydown', (e) => this.#handleKeyEvent(e));
    window.addEventListener('keyup', (e) => this.#handleKeyEvent(e));
  }

  #handleKeyEvent(event) {
    if (this.#trackedKeys.has(event.key)) {
      if (event.type === 'keydown') {
        this.#downKeys.add(event.key);
      } else {
        this.#downKeys.delete(event.key);
      }
      event.preventDefault();
    }
  }

  addKeysToTrack(keys) {
    keys.forEach(key => this.#trackedKeys.add(key));
  }

  removeKeysToTrack(keys) {
    keys.forEach(key => this.#trackedKeys.delete(key));
  }

  isKeyDown(key) {
    return this.#downKeys.has(key);
  }

  get currentlyPressedKeys() {
    return Array.from(this.#downKeys);
  }

  close() {

  }
}
  