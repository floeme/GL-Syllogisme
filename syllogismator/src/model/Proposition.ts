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
     * Returns true if the subject and the predicate are defined, distinct and not blank (empty string or string with
     * only whitespace characters), and if the quantifier is defined.
     * Otherwise, returns false.
     */
    hasValidStructure(): boolean {
        return this.quantifier !== undefined && this.predicate !== undefined && this.subject !== undefined
            && this.subject.value.trim().length > 0 && this.predicate.value.trim().length > 0
            && this.subject.value !== this.predicate.value;
    }

    /**
     * Looks for the given term in the proposition.
     * Returns `0` if it is the subject, `1` if it is the predicate, or `-1` if it is absent from the proposition.
     * @param term Term to find in the proposition
     */
    indexOf(term: Term): number {
        if (term === this.subject)
            return 0;
        if (term === this.predicate)
            return 1;
        return -1;
    }
}