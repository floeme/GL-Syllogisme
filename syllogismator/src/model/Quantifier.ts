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
    A: new Quantifier("{A}", QuantifierType.A),
    E: new Quantifier("{E}", QuantifierType.E),
    I: new Quantifier("{I}", QuantifierType.I),
    O: new Quantifier("{O}", QuantifierType.O)
}
