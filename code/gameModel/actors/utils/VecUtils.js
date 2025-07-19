class VecUtils {

    static plus( vec1, vec2 ) {
        const x = vec1.x + vec2.x;
        const y = vec1.y + vec2.y;
        return { x, y };
    }

    static minus( vec1, vec2 ) {
        const x = vec1.x - vec2.x
        const y = vec1.y - vec2.y
        return { x, y }
    }

    static times( vec, factor ) {
        const x = vec.x * factor;
        const y = vec.y * factor;
        return { x, y };
    }

    static factor( vec1, vec2 ) {
        const x = vec1.x*vec2.x;
        const y = vec1.y*vec2.y;
        return { x, y }
    }

    static rotate( vec, angle ) {
        const x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
        const y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
        return { x, y };
    }

    static copy( vec ) {
        return { x: vec.x, y: vec.y };
    }
}

export { VecUtils }