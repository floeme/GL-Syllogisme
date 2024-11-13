import {buildRuleResult, Rule} from "./Rule.ts";
import {Term} from "./Term.ts";
import {isUniversal} from "./QuantifierType.ts";
import {Syllogism} from "./Syllogism.ts";

// Rules on quantity

/**
 * ## Middle-term rule (Rmt)
 * The quantity for each middle-term must be universal in at least one of its premises.
 *
 * **Extras:** If a middle-term appears twice with a particular quantity (violating the rule), it is present in the
 * {@link RuleResult.extras} property.
 */
export const Rmt: Rule = {
    id: "Rmt",
    check: (s) => {
        const major = s.getMajorTerm()!;
        const minor = s.getMinorTerm()!;

        // Map which associates a middle term to a boolean indicating if it is universal
        const middleTermsMap = new Map<Term, boolean>;

        // Test on each middle term. Stop when a middle term appears twice with a particular quantity.
        for (const premise of s.premises) {
            // Test the subject and the predicate of the premise
            for (const {term, isSubject} of
                [{term: premise.subject!, isSubject: true}, {term: premise.predicate!, isSubject: false}]
            ) {
                if (term !== major && term !== minor) { // t is a middle term
                    const universal = isUniversal(premise.quantifier!.type, isSubject);
                    const u: boolean | undefined = middleTermsMap.get(term);
                    // u is defined if term was previously found during the traversal: it is true if term is universal,
                    // false if term is particular; it is undefined if it is the first time we find term.

                    if (u === undefined) {
                        // term is not in middleTermsMap => It is the first occurrence of term
                        middleTermsMap.set(term, universal);
                    } else {
                        // term is in middleTermsMap => It is the second occurrence of term
                        // If term is particular in both of its occurrences, the syllogism is invalid => Stop!
                        if (!u && !universal) {
                            const result = buildRuleResult(false);
                            result.extras = term;
                            return result;
                        }
                    }
                }
            }
        }

        return buildRuleResult(true);
    }
}


/**
 * ## *Latius-Hos* Rule (Rlh)
 * The quantifier of the conclusion can be universal only if a term of the conclusion has universal quantity.
 */
export const Rlh: Rule = {
    id: "Rlh",
    check: (s) => {
        // If the quantifier of the conclusion is universal…
        if (s.conclusion.quantifier!.type.universal) {
            return buildRuleResult(rlh_aux(s));
        } else {
            return {
                valid: true,
                validWithUniversalConclusion: rlh_aux(s),
                message: "specific_conclusion"
            };
        }
    }
}

function rlh_aux(s: Syllogism): boolean {
    const major = s.getMajorTerm()!;
    const minor = s.getMinorTerm()!;

    // True when the first occurrence of term is found
    let foundConclusionTerm = false;

    let valid = false;

    // Check that either the major or the minor term are universally quantified in their respective premises
    for (const premise of s.premises) {
        for (const {term, isSubject} of
            [{term: premise.subject!, isSubject: true}, {term: premise.predicate!, isSubject: false}]
        ) {
            if (term === major || term === minor) {
                valid = isUniversal(premise.quantifier!.type, isSubject);
                if (valid || foundConclusionTerm) {
                    return valid;
                } else {
                    foundConclusionTerm = true;
                }
            }
        }
    }

    return false;
}


// Rules on proposition quality

/**
 * ## 2 Negative Premises Rule (Rnn)
 * Two negative premises do not lead to a conclusion.
 */
export const Rnn: Rule = {
    id: "Rnn",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            return buildRuleResult(
                s.getProposition(0).quantifier!.type.affirmative || s.getProposition(1).quantifier!.type.affirmative
            );
        } else throw Error("Not implemented."); // TODO
    }
}

/**
 * ## 1 Negative Premise Rule (Rn)
 * If one premise is negative, the conclusion is negative.
 */
export const Rn: Rule = {
    id: "Rn",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            if (!s.getProposition(0).quantifier!.type.affirmative || !s.getProposition(1).quantifier!.type.affirmative) {
                return buildRuleResult(!s.conclusion.quantifier!.type.affirmative);
            } else {
                return {
                    valid: true,
                    message: "2_affirmative_premises"
                };
            }
        } else throw Error("Not implemented."); // TODO
    }
}

/**
 * ## 2 Affirmative Premises Rule (Raa)
 * Two affirmative premises lead to an affirmative conclusion.
 */
export const Raa: Rule = {
    id: "Raa",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            if (s.getProposition(0).quantifier!.type.affirmative && s.getProposition(1).quantifier!.type.affirmative) {
                return buildRuleResult(s.conclusion.quantifier!.type.affirmative);
            } else {
                return {
                    valid: true,
                    message: "negative_premise"
                };
            }
        } else throw Error("Not implemented."); // TODO
    }
}

/**
 * ## 2 Particular Premises Rule (Rpp)
 * Two particular premises do not lead to a conclusion.
 */
export const Rpp: Rule = {
    id: "Rpp",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            return buildRuleResult(
                s.getProposition(0).quantifier!.type.universal || s.getProposition(1).quantifier!.type.universal
            );
        } else throw Error("Not implemented."); // TODO
    }
}

/**
 * ## 1 Particular Premise Rule (Rp)
 * If one premise is particular, the conclusion is particular.
 */
export const Rp: Rule = {
    id: "Rp",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            if (!s.getProposition(0).quantifier!.type.universal || !s.getProposition(1).quantifier!.type.universal) {
                return buildRuleResult(!s.conclusion.quantifier!.type.universal);
            } else {
                return {
                    valid: true,
                    message: "2_universal_premises"
                };
            }
        } else throw Error("Not implemented."); // TODO
    }
}

// Existence hypothesis

/**
 * ## Existence hypothesis Rule (Ruu)
 * Two universal premises do not lead to a particular conclusion.
 */
export const Ruu: Rule = {
    id: "Ruu",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            if (s.getProposition(0).quantifier!.type.universal && s.getProposition(1).quantifier!.type.universal) {
                return buildRuleResult(s.conclusion.quantifier!.type.universal);
            } else {
                return {
                    valid: true,
                    message: "particular_premise"
                };
            }
        } else throw Error("Not implemented."); // TODO
    }
}
