class SkyDrawer {
  constructor() {
    this.wonColor = "rgb(68, 191, 255)";
    this.lostColor = "rgb(44, 136, 214)";
    this.defaultColor = "rgb(52, 166, 251)";
  }

  draw(state, views, cw) {
    if (state.status == "won") {
      cw.clearByColor(this.wonColor)
    } else if (state.status == "lost") {
      cw.clearByColor(this.lostColor)
    } else {
      cw.clearByColor(this.defaultColor)
    }
  }
}

export { SkyDrawer }