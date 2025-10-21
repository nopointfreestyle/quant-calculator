import { BaseCalculator } from "../models";
import { CheckVectorCollinearityFormula, CheckVectorPerpendicularityFormula, DotProductFormula, VectorCoordsFormula, VectorLengthFormula, VectorMultiplyScalarFormula, VectorsAngleFormula, VectorSumFormula } from "./formulas";

export class MathVectorCalculator extends BaseCalculator {
    constructor() {
        super("math-vectors", "Вектора", "calculators/vector", [
            new VectorCoordsFormula(),
            new VectorLengthFormula(),
            new VectorSumFormula(),
            new VectorMultiplyScalarFormula(),
            new DotProductFormula(),
            new VectorsAngleFormula(),
            new CheckVectorCollinearityFormula(),
            new CheckVectorPerpendicularityFormula()
        ])
    }
}