class SkyDrawer {
  constructor() {

  }

  draw(state) {
    if (state.status == "won") {
      this.cw.clearByColor("rgb(68, 191, 255)")
    } else if (state.status == "lost") {
      this.cw.clearByColor("rgb(44, 136, 214)")
    } else {
      this.cw.clearByColor("rgb(52, 166, 251)")
    }
  }
}