import { VecUtils } from "./VecUtils.js"


class ActorUtils {
    constructor() {}


    static getOriginActor( actor ) {
      return VecUtils.plus( actor.pos, VecUtils.times(actor.size, 0.5));
    }
  }
  
  export { ActorUtils }