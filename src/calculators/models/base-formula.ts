import type { ItemsGroupForm } from "./forms/items-group.form";

export abstract class BaseFormula {
    public type: string;
    public name: string;
    public icon: string;
    public forms: ItemsGroupForm[];

    constructor(type: string, name: string, icon: string, forms: ItemsGroupForm[]) {
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.forms = forms;
    }

    getSolution(_answers: Record<string, any>): any { }
    getSteps(): string { return "steps"; }

    getGraphVectors<T>(_answers: Record<string, any>): T[] { return [] }

    getValue<T>(answers: Record<string, any>, type: string): T {
        return answers[type] as T;
    }
}