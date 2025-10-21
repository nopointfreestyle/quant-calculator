export class GraphVector {
    public startX: number;
    public startY: number;
    public endX: number;
    public endY: number;
    public color: string;
    
    constructor(startX: number, startY: number, endX: number, endY: number, color: string) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }
}