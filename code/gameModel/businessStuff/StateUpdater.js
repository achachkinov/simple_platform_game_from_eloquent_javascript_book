import { StateUtils } from "../actors/utils/StateUtils.js";

class StateUpdater {
    createState(level) {
        return { 
            level: level, 
            actors: level.startActors, 
            status: "playing" 
        }
    }

    update(state, time, keys) {
        const actors = [...state.actors];
        for (const actor of actors) {
            if (!state.actors.includes(actor)) continue;

            state = actor.update(time, state, keys);
            state = this.#collideWithOtherActors(actor, state);
        }
        return state;
    };

    #collideWithOtherActors(actor1, state) {
        if (state.status === "playing") {
            for (const actor2 of [...state.actors]) {
                if (actor1 !== actor2 && StateUtils.isOverlapActors(actor1, actor2)) {
                    state = actor2.collide(state, actor1);
                }
            }
        }
        return state;
    }
}

export { StateUpdater }
