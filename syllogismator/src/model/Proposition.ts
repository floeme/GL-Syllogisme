import {Term} from "./Term.ts";
import {Quantifier} from "./Quantifier.ts";

/**
 * A proposition of a syllogism, which is composed of a {@link Quantifier}, two {@link Term}s – called "subject" and
 * "predicate".
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

    static withTerms(quantifier: Quantifier, subject: Term, predicate: Term): Proposition {
        const proposition: Proposition = new Proposition();
        proposition.quantifier = quantifier;
        proposition.subject = subject;
        proposition.predicate = predicate;
        return proposition;
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