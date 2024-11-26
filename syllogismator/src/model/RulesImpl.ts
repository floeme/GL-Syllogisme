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
            if (isMinorUniversal && !rlh_checkTerm(s, minor)) {
                // The minor term has universal quantity in the conclusion but not in its premise
                const result = buildRuleResult(false);
                result.extras = minor;
                return result;
            }
            if (isMajorUniversal && !rlh_checkTerm(s, major)) {
                // The major term has universal quantity in the conclusion but not in its premise
                const result = buildRuleResult(false);
                result.extras = major;
                return result;
            }

            // At this point, both terms of the conclusion have universal quantity in the conclusion and their
            // respective premise. Thus, the syllogism is valid.
            const result = buildRuleResult(true);
            result.validWithUniversalConclusion = rlh_universalConclusion(s);
            return result;
        } else {
            // Both terms of the conclusion have particular quantity
            return {
                valid: true,
                validWithUniversalConclusion: rlh_universalConclusion(s),
                message: "specific_conclusion"
            };
        }
    }
}

/**
 * Check that `t` has universal quantity in its premise.
 * *(Auxiliary function for {@link Rlh})*
 * @param s Syllogism to check
 * @param t Term to check
 * @return true if `t` has universal quantity in its premise, false otherwise.
 */
function rlh_checkTerm(s: Syllogism, t: Term): boolean {
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

/**
 * Test if the {@link Rlh} rule passes with a universal conclusion.
 * *(Auxiliary function for {@link Rlh})*
 * @param s Syllogism to test
 */
function rlh_universalConclusion(s: Syllogism): boolean {
    const conclusionQuantifier = s.conclusion.quantifier!.type;
    const minor = s.getMinorTerm()!;
    const major = s.getMajorTerm()!;

    if (!s.conclusion.quantifier!.type.universal) {
        const conclusionQuantifier_bis = conclusionQuantifier.affirmative ?
            QuantifierType.A : QuantifierType.E;
        const isMinorUniversal_bis = isUniversal(conclusionQuantifier_bis, true);
        const isMajorUniversal_bis = isUniversal(conclusionQuantifier_bis, false);

        let validWithUniversalConclusion = !(isMinorUniversal_bis || isMajorUniversal_bis);
            // ↪ True if both terms of the conclusion have particular quantity
        validWithUniversalConclusion ||= !(isMinorUniversal_bis && !rlh_checkTerm(s, minor))
            && !(isMajorUniversal_bis && !rlh_checkTerm(s, major));
            // ↪ True if the rule passed with a universal conclusion

        return validWithUniversalConclusion;
    } else {
        return true;
    }
}



// Rules on proposition quality

/**
 * ## 2 Negative Premises Rule (Rnn)
 * Two negative premises do not lead to a conclusion.
 */
export const Rnn: Rule = {
    id: "Rnn",
    check: (s) => {
        let negativePremises = 0;

        let i = 0;
        while (negativePremises < 2 && i < s.premises.length) {
            if (!s.premises[i].quantifier!.type.affirmative) ++negativePremises;
            ++i;
        }

        return buildRuleResult(negativePremises < 2);
    }
}


/**
 * ## 1 Negative Premise Rule (Rn)
 * If one premise is negative, the conclusion is negative.
 */
export const Rn: Rule = {
    id: "Rn",
    check: (s) => {
        let negativePremise = false;

        let i = 0;
        while (!negativePremise && i < s.premises.length) {
            negativePremise = !s.premises[i].quantifier!.type.affirmative;
            ++i;
        }

        if (negativePremise) {
            return buildRuleResult(!s.conclusion.quantifier!.type.affirmative);
        } else {
            return {
                valid: true,
                message: "all_affirmative_premises"
            };
        }
    }
}


/**
 * ## 2 Affirmative Premises Rule (Raa)
 * Two affirmative premises lead to an affirmative conclusion.
 */
export const Raa: Rule = {
    id: "Raa",
    check: (s) => {
        let affirmativePremises = 0;

        let i = 0;
        while (affirmativePremises < 2 && i < s.premises.length) {
            if (s.premises[i].quantifier!.type.affirmative) ++affirmativePremises;
            ++i;
        }

        if (affirmativePremises === 2) {
            return buildRuleResult(s.conclusion.quantifier!.type.affirmative);
        } else {
            return {
                valid: true,
                message: s.getPropositionCount() > 3 ? "not_2_affirmative_premises" : "negative_premise"
            };
        }
    }
}


/**
 * ## 2 Particular Premises Rule (Rpp)
 * Two particular premises do not lead to a conclusion.
 */
export const Rpp: Rule = {
    id: "Rpp",
    check: (s) => {
        let particularPremises = 0;

        let i = 0;
        while (particularPremises < 2 && i < s.premises.length) {
            if (!s.premises[i].quantifier!.type.universal) ++particularPremises;
            ++i;
        }

        return buildRuleResult(particularPremises < 2);
    }
}


/**
 * ## 1 Particular Premise Rule (Rp)
 * If one premise is particular, the conclusion is particular.
 */
export const Rp: Rule = {
    id: "Rp",
    check: (s) => {
        let particularPremise = false;

        let i = 0;
        while (!particularPremise && i < s.premises.length) {
            particularPremise = !s.premises[i].quantifier!.type.universal;
            i++;
        }

        if (particularPremise) {
            return buildRuleResult(!s.conclusion.quantifier!.type.universal);
        } else {
            return {
                valid: true,
                message: "all_universal_premises"
            };
        }
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
        let universalPremises = 0;

        let i = 0;
        while (universalPremises < 2 && i < s.premises.length) {
            if (s.premises[i].quantifier!.type.universal) ++universalPremises;
            ++i;
        }

        if (universalPremises === 2) {
            return buildRuleResult(s.conclusion.quantifier!.type.universal);
        } else {
            return {
                valid: true,
                message: s.getPropositionCount() > 3 ? "particular_premise" : "not_2_universal_premises"
            };
        }
    }
}
