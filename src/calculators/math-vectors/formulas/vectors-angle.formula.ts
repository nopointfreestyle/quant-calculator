import { InputBoxForm, ItemsGroupForm, BaseFormula } from "../../models";
import { Vector2d } from "../models";
import { GraphVector } from "../models/graph-vector";

export class VectorsAngleFormula extends BaseFormula {
    constructor() {
        super("vectors-angle", "Угол между векторами", "calculators/vector", [
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
        const length1 = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
        const length2 = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);

        const cosTheta = dotProduct / (length1 * length2);
        const angle = Math.acos(cosTheta);

        return `${(angle * 180 / Math.PI).toFixed(2)}°`;
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
            new GraphVector(0, 0, vectorB.x, vectorB.y, "#fc4b3b"),
        ]
        return vectors;
    } 
}