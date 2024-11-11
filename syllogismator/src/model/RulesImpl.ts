import {Rule} from "./Rule.ts";

// Rules on quantity

/**
 * ## Middle-term rule (Rmt)
 * The quantifier for each middle-term must be universal in at least one of its premises.
 */
export const Rmt: Rule = {
    id: "Rmt",
    check: (s) => {
        // TODO Write the rule for polysyllogisms
        const isValid = s.premises.some(proposition =>
            proposition.quantifier!.type.universal
        );

        return {
            valid: isValid,
            message: isValid ? "passed" : "failed"
        }
    }
}

/**
 * ## *Latius-Hos* Rule (Rlh)
 * The quantifier of the conclusion can be universal only if a term of the conclusion is universally quantified.
 */
export const Rlh: Rule = {
    id: "Rlh",
    check: (s) => {
        // If the quantifier of the conclusion is universal…
        if (s.conclusion.quantifier!.type.universal) {
            let isValid = false;

            // Check if the **minor term** is universally quantified in its premise
            const minorTerm = s.getMinorTerm()!;
            for (const premise of s.premises) {
                if (premise.indexOf(minorTerm) !== -1) {
                    isValid = premise.quantifier!.type.universal;
                    break;
                }
            }

            if (!isValid) {
                // Check if the **major term** is universally quantified in its premise
                const minorTerm = s.getMajorTerm()!;
                for (const premise of s.premises) {
                    if (premise.indexOf(minorTerm) !== -1) {
                        isValid = premise.quantifier!.type.universal;
                        break;
                    }
                }
            }

            return {
                valid: isValid,
                message: isValid ? "passed" : "failed"
            }
        } else {
            return {
                valid: true,
                message: "specific_conclusion"
            }
        }
    }
}

// Rules on quality

/**
 * ## 2 Negative Premises Rule (Rnn)
 * Two negative premises do not lead to a conclusion.
 */
export const Rnn: Rule = {
    id: "Rnn",
    check: (s) => {
        if (s.getPropositionCount() === 3) {
            const isValid =
                s.getProposition(0).quantifier!.type.affirmative || s.getProposition(1).quantifier!.type.affirmative;

            return {
                valid: isValid,
                message: isValid ? "passed" : "failed"
            };
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
                const isValid = !s.conclusion.quantifier!.type.affirmative;

                return {
                    valid: isValid,
                    message: isValid ? "passed" : "failed"
                };
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
                const isValid = s.conclusion.quantifier!.type.affirmative;

                return {
                    valid: isValid,
                    message: isValid ? "passed" : "failed"
                };
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
            const isValid =
                s.getProposition(0).quantifier!.type.universal || s.getProposition(1).quantifier!.type.universal;

            return {
                valid: isValid,
                message: isValid ? "passed" : "failed"
            };
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
                const isValid = !s.conclusion.quantifier!.type.universal;

                return {
                    valid: isValid,
                    message: isValid ? "passed" : "failed"
                };
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
                const isValid = s.conclusion.quantifier!.type.universal;

                return {
                    valid: isValid,
                    message: isValid ? "passed" : "failed"
                };
            } else {
                return {
                    valid: true,
                    message: "particular_premise"
                };
            }
        } else throw Error("Not implemented."); // TODO
    }
}
