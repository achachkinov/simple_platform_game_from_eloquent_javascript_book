class ContextWrapper {
    constructor( parent, level ) {
        this.scale = 40;
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.min(1200, level.width * this.scale);
        this.canvas.height = Math.min(900, level.height * this.scale);
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");
    }

    clearByColor( color ) {
        this.cx.fillStyle = color
        this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    remove() {
        this.canvas.remove()
    }

    drawSprite( img, sprite, screenX, screenY ) {
        this.cx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, screenX*this.scale, screenY*this.scale, sprite.width*this.scale/20, sprite.height*this.scale/20);
    }

    drawFlipedSprite( img, sprite, screenX, screenY ) {
        this.cx.save();
        this.#flipHorizontally( screenX*this.scale + sprite.width*(this.scale/20) / 2);
        this.drawSprite( img, sprite, screenX, screenY )
        this.cx.restore();
    }

    #flipHorizontally( around ) {
        this.cx.translate(around, 0);
        this.cx.scale(-1, 1);
        this.cx.translate(-around, 0);
    }

    get height() {
        return this.canvas.height/this.scale
    }
    get width() {
        return this.canvas.width/this.scale
    }
}

export { ContextWrapper }