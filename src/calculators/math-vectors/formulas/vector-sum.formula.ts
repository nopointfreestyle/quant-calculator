import { InputBoxForm, ItemsGroupForm, BaseFormula } from "../../models";
import { Vector2d } from "../models";
import { GraphVector } from "../models/graph-vector";

export class VectorSumFormula extends BaseFormula {
    constructor() {
        super("vector-sum", "Сумма векторов", "calculators/vector", [
            new ItemsGroupForm("Вектор А", [
                new InputBoxForm("vectorA:X", "X", "Ваше число", "number"),
                new InputBoxForm("vectorA:Y", "Y", "Ваше число", "number"),
            ]),
            new ItemsGroupForm("Вектор B", [
                new InputBoxForm("vectorB:X", "X", "Ваше число", "number"),
                new InputBoxForm("vectorB:Y", "Y", "Ваше число", "number"),
            ])
        ])
    }

    getSolution(answers: Record<string, any>): Vector2d | null {
        const vectorA = new Vector2d(
            this.getValue<number>(answers, "vectorA:X"),
            this.getValue<number>(answers, "vectorA:Y")
        );

        const vectorB = new Vector2d(
            this.getValue<number>(answers, "vectorB:X"),
            this.getValue<number>(answers, "vectorB:Y")
        );

        if (!vectorA.isValid() || !vectorB.isValid())
            return null;

        return new Vector2d(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    getSteps(): string {
        return ``;
    }

    getGraphVectors(answers: Record<string, any>): any {
        const vectorA = new Vector2d(
            this.getValue<number>(answers, "vectorA:X"),
            this.getValue<number>(answers, "vectorA:Y")
        );

        const vectorB = new Vector2d(
            this.getValue<number>(answers, "vectorB:X"),
            this.getValue<number>(answers, "vectorB:Y")
        );

        if (!vectorA.isValid() || !vectorB.isValid())
            return [];

        const solution = this.getSolution(answers);
        if (!solution) return [];

        const vectors = [
            new GraphVector(0, 0, vectorA.x, vectorA.y, "#3b68fc"),
            new GraphVector(0, 0, vectorB.x, vectorB.y, "#fc4b3b"),
            new GraphVector(0, 0, solution.x, solution.y, "#FCCF3B"),
        ]
        return vectors;
    } 
}