/**
 * A term in a {@link Proposition}.
 * Terms are represented as objects so that they can be renamed easily in a syllogism (as they are stored as references
 * in the Proposition objects).
 */
export class Term {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}