import { InputBoxForm, ItemsGroupForm, BaseFormula } from "../../models";
import { Vector2d } from "../models";
import { GraphVector } from "../models/graph-vector";

export class CheckVectorPerpendicularityFormula extends BaseFormula {
    constructor() {
        super("check-vector-perpendicularity", "Проверка перпендикулярности", "calculators/vector", [
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

        const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
        const isPerpendicular = Math.abs(dotProduct) < 1e-10; 

        return isPerpendicular ? "Векторы перпендикулярны" : "Векторы не перпендикулярны"
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