class SpriteUtils {
    
    #name
    #flipped = false
    #postiton
    #rotateAngle = 0

    static createDefaultSprite( name ) {
        const sprite = {
            name: name,
            flipped: false,
            position: { x: 0, y: 0 },
            rotateAngle: 0,
            scale: { x: 1, y: 1 }
        }
        return sprite
    }
}

export { SpriteUtils }