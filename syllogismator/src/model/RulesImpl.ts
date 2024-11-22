import {buildRuleResult, Rule} from "./Rule.ts";
import {Term} from "./Term.ts";
import {isUniversal, QuantifierType} from "./QuantifierType.ts";
import {Syllogism} from "./Syllogism.ts";

// Rules on quantity
// ⚠️ Quantity of a term ≠ quantifier of its proposition. See isUniversal in QuantifierType.ts.

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
 * A term of the conclusion can have universal quantity only if it has universal quantity in its premise.
 */
export const Rlh: Rule = {
    id: "Rlh",
    check: (s) => {
        const conclusionQuantifier = s.conclusion.quantifier!.type;

        const minor = s.getMinorTerm()!;
        const isMinorUniversal = isUniversal(conclusionQuantifier, true);  // quantity of the minor term in the conclusion
        const major = s.getMajorTerm()!;
        const isMajorUniversal = isUniversal(conclusionQuantifier, false); // quantity of the major term in the conclusion

        // If a term of the conclusion has universal quantity…
        if (isMinorUniversal || isMajorUniversal) {
            if (isMinorUniversal && !rlh_aux(s, minor)) {
                // The minor term has universal quantity in the conclusion but not in its premise
                const result = buildRuleResult(false);
                result.extras = minor;
                return result;
            }
            if (isMajorUniversal && !rlh_aux(s, major)) {
                // The major term has universal quantity in the conclusion but not in its premise
                const result = buildRuleResult(false);
                result.extras = major;
                return result;
            }
            // At this point, both terms of the conclusion have universal quantity in the conclusion and their
            // respective premise. Thus, the syllogism is valid.
            return buildRuleResult(true);
        } else {
            // Both terms of the conclusion have particular quantity

            // Test of the rule with universal conclusion (interesting syllogisms)
            const conclusionQuantifier_bis = conclusionQuantifier.affirmative ?
                QuantifierType.A : QuantifierType.E;
            const isMinorUniversal_bis = isUniversal(conclusionQuantifier_bis, true);
            const isMajorUniversal_bis = isUniversal(conclusionQuantifier_bis, false);

            let validWithUniversalConclusion = !(isMinorUniversal_bis || isMajorUniversal_bis);
                // True if both terms of the conclusion have particular quantity
            validWithUniversalConclusion ||= !(isMinorUniversal_bis && !rlh_aux(s, minor))
                && !(isMajorUniversal_bis && !rlh_aux(s, minor));
                // True if the rule passed with a universal conclusion

            return {
                valid: true,
                validWithUniversalConclusion,
                message: "specific_conclusion"
            };
        }
    }
}

/**
 * Check that `t` has universal quantity in its premise.
 * @param s Syllogism to check
 * @param t Term to check
 * @return true if `t` has universal quantity in its premise, false otherwise.
 */
function rlh_aux(s: Syllogism, t: Term): boolean {
    // Check that t has universal quantity
    for (const premise of s.premises) {
        for (const {term, isSubject} of
            [{term: premise.subject!, isSubject: true}, {term: premise.predicate!, isSubject: false}]
        ) {
            if (term === t) {
                return isUniversal(premise.quantifier!.type, isSubject);
            }
        }
    }

    return false; // This shouldn't be reached
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
                    validWithUniversalConclusion: false,
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



