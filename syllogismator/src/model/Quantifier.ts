import {QuantifierType} from "./QuantifierType.ts";

/**
 * A quantifier, which has a name and a {@link QuantifierType} (A, E, I, O).
 */
export class Quantifier {
    name: string;
    type: QuantifierType;

    constructor(name: string, type: QuantifierType) {
        this.name = name;
        this.type = type;
    }
}

export const defaultQuantifiers = {
    A1: new Quantifier("All", QuantifierType.A),
    A2: new Quantifier("Every", QuantifierType.A),
    A3: new Quantifier("Each", QuantifierType.A),
    A4: new Quantifier("Every single", QuantifierType.A),
    E1: new Quantifier("None", QuantifierType.E),
    E2: new Quantifier("There isn\'t any", QuantifierType.E),
    I1: new Quantifier("Some", QuantifierType.I),
    I2: new Quantifier("There are", QuantifierType.I),
    I3: new Quantifier("Several", QuantifierType.I),
    I4: new Quantifier("A few", QuantifierType.I),
    O1: new Quantifier("Some not", QuantifierType.O),
    O2: new Quantifier("Not every", QuantifierType.O),
}
