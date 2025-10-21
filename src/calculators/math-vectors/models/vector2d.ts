export class Vector2d {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isValid(): boolean {
        return this.x != null && this.y != null;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}