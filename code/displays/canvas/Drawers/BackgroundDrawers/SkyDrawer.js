class SkyDrawer {
  constructor() {

  }

  draw(state, views, cw) {
    if (state.status == "won") {
      cw.clearByColor("rgb(68, 191, 255)")
    } else if (state.status == "lost") {
      cw.clearByColor("rgb(44, 136, 214)")
    } else {
      cw.clearByColor("rgb(52, 166, 251)")
    }
  }
}

export { SkyDrawer }