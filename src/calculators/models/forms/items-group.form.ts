import type { BaseBoxForm } from "./base-box";

export class ItemsGroupForm {
    public title: string;
    public boxes: BaseBoxForm[];
    
    constructor(title: string, boxes: BaseBoxForm[]) {
        this.title = title;
        this.boxes = boxes;
    }
}