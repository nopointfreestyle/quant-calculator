import type { CalculatorType } from "../types";
import type { BaseFormula } from "./base-formula";

export abstract class BaseCalculator {
    public type: string
    public title: string
    public icon: string
    public formulas: BaseFormula[]
    
    constructor(type: CalculatorType, title: string, icon: string, formulas: BaseFormula[]) {
        this.type = type;
        this.title = title;
        this.icon = icon;
        this.formulas = formulas;
    }
}