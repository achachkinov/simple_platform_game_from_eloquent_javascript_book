class VecUtils {

    static plus( vec1, vec2 ) {
        const x = vec1.x + vec2.x;
        const y = vec1.y + vec2.y;
        return { x, y };
    }

    static times( vec, factor ) {
        const x = vec.x * factor;
        const y = vec.y * factor;
        return { x, y };
    }

    static copy( vec ) {
        return { x: vec.x, y: vec.y };
    }
}

export { VecUtils }