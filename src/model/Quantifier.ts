import {QuantifierType} from "./QuantifierType.ts";

export const DEFAULT_QUANTIFIERS_I18N_NAMESPACE = "syllogism.quantifier";

/**
 * A quantifier, which has a name and a {@link QuantifierType} (A, E, I, O).
 */
export class Quantifier {
    readonly name: string;
    readonly type: QuantifierType;

    constructor(name: string, type: QuantifierType) {
        this.name = name;
        this.type = type;
    }
}

/**
 * **Default quantifiers.**
 *
 * These quantifiers have to be handled differently from user-defined quantifiers.
 * * Their name is translated (in translation files, the namespace is
 * [`syllogism.quantifier`]{@link DEFAULT_QUANTIFIERS_I18N_NAMESPACE} and the key is the `name`
 * attribute of the quantifier object).
 * * Do not edit or delete them. They cannot be modified in the quantifier alias management page.
 * * They are not returned by `QuantifierRepository`. Don't forget to show them in the quantifier selector.
 */
export const defaultQuantifiers = {
    A: new Quantifier("A", QuantifierType.A),
    E: new Quantifier("E", QuantifierType.E),
    I: new Quantifier("I", QuantifierType.I),
    O: new Quantifier("O", QuantifierType.O)
}

export function isDefaultQuantifierName(name: string): boolean {
    return name === "A" || name === "E" || name === "I" || name === "O";
}