import {Term} from "./Term.ts";
import {Quantifier} from "./Quantifier.ts";

/**
 * A proposition of a syllogism, which is composed of a {@link Quantifier}, two {@link Term}s – called "subject" and
 * "predicate" – and a string which links the subject to the quantifier.
 */
export class Proposition {
    /**
     * Quantifier of the proposition.
     */
    quantifier: Quantifier | undefined;
    /**
     * Subject of the syllogism = term on the left side.
     */
    subject: Term | undefined;
    /**
     * Subject of the syllogism = term on the right side.
     */
    predicate: Term | undefined;
    /**
     * A string which links the subject to the predicate.
     */
    link: string;

    static withTerms(quantifier: Quantifier, subject: Term, predicate: Term, link: string): Proposition {
        const proposition: Proposition = new Proposition();
        proposition.quantifier = quantifier;
        proposition.subject = subject;
        proposition.predicate = predicate;
        proposition.link = link;
        return proposition;
    }

    /**
     * Create an empty proposition (without defined terms)
     */
    constructor() {
        this.link = "";
    }

    /**
     * Returns true if the subject and the predicate are defined and distinct, and if the quantifier is defined.
     * Otherwise, returns false.
     */
    hasValidStructure(): boolean {
        return this.quantifier !== undefined && this.predicate !== undefined && this.subject !== undefined
            && this.predicate.value !== this.predicate.value;
    }
}