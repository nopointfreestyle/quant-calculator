import { InputBoxForm, ItemsGroupForm, BaseFormula } from "../../models";
import { Vector2d } from "../models";
import { GraphVector } from "../models/graph-vector";

export class CheckVectorCollinearityFormula extends BaseFormula {
    constructor() {
        super("check-vector-collinearity", "Проверка коллинеарности", "calculators/vector", [
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

    getSolution(answers: Record<string, any>): string | null {
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

        const determinant = vectorA.x * vectorB.y - vectorA.y * vectorB.x;
        const isCollinear = Math.abs(determinant) < 1e-10; 

        return isCollinear ? "Векторы коллинеарны" : "Векторы не коллинеарны"
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

        const vectors = [
            new GraphVector(0, 0, vectorA.x, vectorA.y, "#3b68fc"),
            new GraphVector(3, 0, vectorB.x + 3, vectorB.y, "#fc4b3b"),
        ]
        return vectors;
    } 
}