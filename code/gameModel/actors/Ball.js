// import { VecUtils } from "./utils/VecUtils.js"
// import { StateUtils } from "./utils/StateUtils.js"

// class Ball {
//   static SYMBOLS = ["B"]

//   #gravity = 30;

//   constructor(pos, speed) {
//     this.pos = pos;
//     this.speed = speed;
//   }

//   static create(pos, ch) {
//     return new Ball( pos, { x: 0, y: 0 } )
//   }

//   update(time, state) {
//     let newPos = VecUtils.plus( this.pos, VecUtils.times(this.speed, time));
//     if ( !StateUtils.touches( state, newPos, this.size, "wall") ) {
//       this.speed = VecUtils.times( this.speed, -1 )
//     }
//     return state
//   };
//   collide(state, actor) {
//     if ( actor.type == "player" ) {
//       const players = StateUtils.players( state )
//       if ( players.length == 1 ) {
//         state.status = "lost";
//       } else {
//         state.actors = state.actors.filter(a => a != actor);
//       }
//     }
//     return state
//   };
// }
// Ball.prototype.size = { x: 1, y: 1 }
// Ball.prototype.type = "ball"

// export { Ball }