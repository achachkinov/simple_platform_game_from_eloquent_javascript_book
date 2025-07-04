class DOMDisplay {
  #scale = 20

  constructor(parent, level) {
    this.dom = DOMDisplay.elt("div", {class: "game"}, this.drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { 
    this.dom.remove(); 
  }

  syncState(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = this.drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  };

  scrollPlayerIntoView(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;
  
    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
  
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);
  
    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  };

  drawGrid(level) {
    return DOMDisplay.elt("table", {
      class: "background",
      style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
      DOMDisplay.elt("tr", {style: `height: ${scale}px`},
          ...row.map(type => elt("td", {class: type})))
    ));
  }

  drawActors(actors) {
    return DOMDisplay.elt("div", {}, ...actors.map(actor => {
      let rect = DOMDisplay.elt("div", {class: `actor ${actor.type}`});
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    }));
  }

  static elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
      dom.appendChild(child);
    }
    return dom;
  }
}