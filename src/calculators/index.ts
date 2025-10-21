import { MathVectorCalculator } from "./math-vectors";
import { BaseCalculator } from "./models/base-caclulator";

export const Calculators: BaseCalculator[] = [
    new MathVectorCalculator()
]

export * from "./types";
export * from "./models";
export * from "./math-vectors";