import { InputBoxForm, ItemsGroupForm, BaseFormula } from "../../models";
import { Vector2d } from "../models";
import { GraphVector } from "../models/graph-vector";

export class VectorMultiplyScalarFormula extends BaseFormula {
    constructor() {
        super("vector-multiply-scalar", "Умножение на число", "calculators/vector", [
            new ItemsGroupForm("Вектор А", [
                new InputBoxForm("vectorA:X", "X", "Ваше число", "number"),
                new InputBoxForm("vectorA:Y", "Y", "Ваше число", "number"),
            ]),
            new ItemsGroupForm("Коэффициент (k)", [
                new InputBoxForm("k", "k", "Ваше число", "number"),
            ])
        ])
    }

    getSolution(answers: Record<string, any>): Vector2d | null {
        const vectorA = new Vector2d(
            this.getValue<number>(answers, "vectorA:X"),
            this.getValue<number>(answers, "vectorA:Y")
        );

        const k = this.getValue<number>(answers, "k")

        if (!vectorA.isValid() || !k)
            return null;

        return new Vector2d(vectorA.x * k, vectorA.y * k);
    }

    getSteps(): string {
        return ``;
    }

    getGraphVectors(answers: Record<string, any>): any {
        const vectorA = new Vector2d(
            this.getValue<number>(answers, "vectorA:X"),
            this.getValue<number>(answers, "vectorA:Y")
        );

        const vectorB = this.getSolution(answers);
        if (!vectorA.isValid() || !vectorB?.isValid())
            return [];

        const vectors = [
            new GraphVector(0, 0, vectorB.x, vectorB.y, "#fc4b3b"),
            new GraphVector(0, 0, vectorA.x, vectorA.y, "#3b68fc"),
        ]
        return vectors;
    } 
}