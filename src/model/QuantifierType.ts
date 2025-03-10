/**
 * Represents a quantifier type. There are four different quantifier types.
 *
 * <table>
 *     <tr>
 *         <td></td>
 *         <th>Affirmative</th>
 *         <th>Negative</th>
 *     </tr>
 *     <tr>
 *         <th>Universal</th>
 *         <td>`A` (All)</td>
 *         <td>`E` (None)</td>
 *     </tr>
 *     <tr>
 *         <th>Particular</th>
 *         <td>`I` (Some)</td>
 *         <td>`O` (Some Not)</td>
 *     </tr>
 * </table>
 */
export class QuantifierType {
    readonly code: string;
    readonly defaultName: string;
    readonly affirmative: boolean;
    readonly universal: boolean;

    private constructor(code: string, defaultName: string, affirmative: boolean, universal: boolean) {
        this.code = code;
        this.defaultName = defaultName;
        this.affirmative = affirmative;
        this.universal = universal;
    }

    toString(): string {
        return `${this.code} (${this.defaultName}, ${this.affirmative ? "affirmative" : "negative"}, ${this.universal ? "universal" : "particular"})`;
    }

    static readonly A = new QuantifierType("A", "All", true, true);
    static readonly E = new QuantifierType("E", "None", false, true);
    static readonly I = new QuantifierType("I", "Some", true, false);
    static readonly O = new QuantifierType("O", "Some Not", false, false);

    static of(type: string): QuantifierType {
        switch (type) {
            case "A":
                return QuantifierType.A;
            case "E":
                return QuantifierType.E;
            case "I":
                return QuantifierType.I;
            case "O":
                return QuantifierType.O;
            default:
                throw new Error("Unknown type " + type);
        }
    }
}

/**
 * Returns a boolean indicating if the quantity of the term is universal.
 *
 * <table>
 *   <tr>
 *     <th></th>
 *     <th>A</th>
 *     <th>E</th>
 *     <th>I</th>
 *     <th>O</th>
 *   </tr>
 *   <tr>
 *     <th>Subject</th>
 *     <td>Universal</td>
 *     <td>Universal</td>
 *     <td>Particular</td>
 *     <td>Particular</td>
 *   </tr>
 *   <tr>
 *     <th>Predicate</th>
 *     <td>Particular</td>
 *     <td>Universal</td>
 *     <td>Particular</td>
 *     <td>Universal</td>
 *   </tr>
 * </table>
 *
 * @param propositionQuantifier Quantifier of the proposition where the term appears.
 * @param subject true if the term is the subject of the proposition, false if it is the predicate.
 */
export function isUniversal(propositionQuantifier: QuantifierType, subject: boolean): boolean {
    switch (propositionQuantifier) {
        case QuantifierType.A: return subject;
        case QuantifierType.E: return true;
        case QuantifierType.I: return false;
        case QuantifierType.O: return !subject;
        default: throw new Error("Unknown propositionQuantifier");
    }
}
