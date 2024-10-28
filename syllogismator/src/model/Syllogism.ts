import {Proposition} from "./Proposition.ts";
import {Term} from "./Term.ts";
import {Figure} from "./Figure.ts";
import {mergeMapValue} from "../utils.ts";

/**
 * Represents a syllogism, which consists of a list of {@link Proposition}s (several premises and a conclusion).
 * This class can represent simple syllogisms (which have 3 propositions and belong to a {@link Figure} type) and
 * polysyllogisms (which have more than 3 propositions).
 */
export class Syllogism {
    // Propositions = premises + conclusion
    readonly premises: Proposition[];
    conclusion: Proposition;

    /**
     * A string which links the subject to the predicate in each proposition.
     */
    link: string = "";

    /**
     * Builds a simple syllogism of the given figure type and with the given terms.
     * @param figure one of the four {@link Figure} types
     * @param s minor term (subject of the conclusion)
     * @param p major term (predicate of the conclusion)
     * @param m middle term
     */
    static ofFigure(figure: Figure, s: Term, p: Term, m: Term): Syllogism {
        const syllogism: Syllogism = new Syllogism();

        // First premise
        if (figure === Figure.Figure1 || figure === Figure.Figure3) { // M → P
            syllogism.premises[0].subject = m;
            syllogism.premises[0].predicate = p;
        } else { // P → M
            syllogism.premises[0].subject = p;
            syllogism.premises[0].predicate = m;
        }

        // Second premise
        if (figure === Figure.Figure1 || figure === Figure.Figure2) { // S → M
            syllogism.premises[1].subject = s;
            syllogism.premises[1].predicate = m;
        } else { // M → S
            syllogism.premises[1].subject = m;
            syllogism.premises[1].predicate = s;
        }

        // The structure of the conclusion is always S → P
        syllogism.conclusion.subject = s;
        syllogism.conclusion.predicate = p;

        return syllogism;
    }

    /**
     * Creates a syllogism with 3 empty propositions (2 premises and a conclusion).
     */
    constructor() {
        this.premises = [];
        this.conclusion = new Proposition();
    }

    /**
     * Returns the proposition at the given index.
     *
     * If the given index is equal to <code>[getPropositionCount()]{@link #getPropositionCount} - 1</code> or -1,
     * returns the conclusion.
     *
     * @param index
     */
    getProposition(index: number): Proposition {
        if (index === this.getPropositionCount() - 1 || index === -1) {
            return this.conclusion;
        }
        return this.premises[index];
    }

    /**
     * Returns all propositions (premises and conclusion).
     */
    getPropositions(): Proposition[] {
        return this.premises.concat(this.conclusion);
    }

    /**
     * Move the proposition from/to given indexes.
     */
    reorderProposition(fromIndex: number, toIndex: number): void {
        console.error("reorderProposition - Not implemented.");
        // TODO
    }

    /**
     * Auto-reorder the premises so that each middle term is present in two consecutive propositions.
     * Does not move the conclusion.
     */
    autoReorder(): void {
        console.error("autoReorder - Not implemented.");
        // TODO
    }

    /**
     * **Applies only for a polysyllogism**
     *
     * Adds a proposition before the conclusion or at the specified index.
     *
     * @param proposition proposition to insert
     * @param index where to insert the proposition (before the conclusion if undefined)
     */
    addProposition(proposition: Proposition, index?: number): void {
        if (index === undefined) {
            this.premises.push(proposition);
        } else {
            this.premises.splice(index, 0, proposition);
        }
    }

    /**
     * **Applies only for a polysyllogism**
     *
     * Remove the proposition at given index.
     *
     * @param index where to remove the proposition
     */
    removeProposition(index: number): void {
        this.premises.splice(index, 1);
    }

    /**
     * Returns the number of propositions (premises + conclusion).
     */
    getPropositionCount(): number {
        return this.premises.length + 1;
    }

    /**
     * Returns a set containing the {@link Term}s of the syllogism.
     */
    getTerms(): Set<Term> {
        return this.getPropositions().reduce((accumulator, currentProposition) => {
            if (currentProposition.subject !== undefined) accumulator.add(currentProposition.subject);
            if (currentProposition.predicate !== undefined) accumulator.add(currentProposition.predicate);
            return accumulator;
        }, new Set<Term>())
    }

    /**
     * Returns the minor {@link Term}, which is the subject of the conclusion.
     */
    getMinorTerm(): Term | undefined {
        return this.conclusion.subject;
    }

    /**
     * Returns the major {@link Term}, which is the predicate of the conclusion.
     */
    getMajorTerm(): Term | undefined {
        return this.conclusion.predicate;
    }

    /**
     * Returns a set containing the middle {@link Term}s. There is only one term if called on a simple syllogism.
     */
    getMiddleTerms(): Set<Term> {
        const terms = this.getTerms();
        if (this.getMinorTerm() !== undefined) terms.delete(<Term>this.getMinorTerm());
        if (this.getMajorTerm() !== undefined) terms.delete(<Term>this.getMajorTerm());
        return terms;
    }

    /**
     * **Applies only for simple syllogisms**
     *
     * Detects the figure type (according to positions of the terms in the propositions) and returns it.
     * If called on a polysyllogism, or in case of invalid structure, returns `null`.
     */
    getFigure(): Figure | null {
        if (this.getPropositionCount() === 3 && this.hasValidStructure()) {
            const s = <Term>this.getMinorTerm();
            const p = <Term>this.getMajorTerm()
            // TODO
            console.error("getFigure - Not implemented.");
        }
        return null;
    }

    /**
     * Returns `true` if there are at least 3 propositions, each proposition has a valid structure, and if each term
     * appears exactly twice in the syllogism. Otherwise, returns `false`.
     */
    hasValidStructure(): boolean {
        const propositionCount = this.getPropositionCount();

        if (propositionCount < 3
            || !this.getPropositions().every(proposition => proposition.hasValidStructure())) {
            return false;
        }

        // Check that each term appears exactly twice
        const occurrences = new Map<Term, number>();
        for (const proposition of this.getPropositions()) {
            // Count subject and predicate occurrences
            const s = mergeMapValue(occurrences, proposition.subject, 1, (x, y) => x + y);
            const p = mergeMapValue(occurrences, proposition.predicate, 1, (x, y) => x + y);

            // If a term is present more than twice, the syllogism is invalid.
            // If there are more distinct terms than the number of propositions, the syllogism is invalid.
            if (s > 2 || p > 2 || occurrences.size > propositionCount) return false;
        }

        // The syllogism has a valid structure if it was not invalidated above.
        return true;
    }
}

