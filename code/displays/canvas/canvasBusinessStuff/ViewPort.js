class ViewPort {
    constructor() {
        left = 0
        top = 0
        width = this.cw.width
        height = this.cw.height
    }

    update( state ) {
        const view = this.viewport
        const margin = view.width / 3;
        const player = StateUtils.player(state);
        const center = VecUtils.plus( player.pos, VecUtils.times(player.size, 0.5));
      
        if (center.x < view.left + margin) {
          view.left = Math.max(center.x - margin, 0);
        } else if (center.x > view.left + view.width - margin) {
          view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
        }
        if (center.y < view.top + margin) {
          view.top = Math.max(center.y - margin, 0);
        } else if (center.y > view.top + view.height - margin) {
          view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
        }
    }
}

export { ViewPort } 