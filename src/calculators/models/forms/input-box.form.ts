import { BaseBoxForm } from "./base-box";

export class InputBoxForm extends BaseBoxForm {
    public icon: string;
    public placeholder: string;
    public inputType: string;
    public value?: number;

    constructor(type: string, icon: string, placeholder: string, inputType: string, value?: number) {
        super(type);

        this.icon = icon;
        this.placeholder = placeholder;
        this.value = value;
        this.inputType = inputType;
    }
}