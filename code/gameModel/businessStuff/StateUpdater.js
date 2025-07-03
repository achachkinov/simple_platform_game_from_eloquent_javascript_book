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
        const actors = state.actors.map(actor => actor.update(time, state, keys));
        let newState = { level: state.level, actors, status: state.status }

        if (newState.status != "playing") return newState;

        for ( let actor1 of newState.actors ) {
        newState = actor1.updateState( newState )
        for (let actor2 of actors) {
            if ( actor1 != actor2 && StateUtils.isOverlapActors(actor1, actor2)) {
            newState = actor2.collide(newState, actor1);
            }
        }
        }
        return newState;
    };
}

export { StateUpdater }
