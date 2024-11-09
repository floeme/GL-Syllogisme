import {Quantifier} from "./Quantifier.ts";
import {Term} from "./Term.ts";
import {Rule} from "./Rule.ts";

/**
 * ## Middle-term rule (Rmt)
 * The quantifier (for the middle-term) must be universal in at least one premise.
 */
export const Rmt: Rule = {
    id: "Rmt",
    check: (s) => {
        const isValid = s.premises.some(proposition =>
            (<Quantifier>proposition.quantifier).type.universal
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
        if ((<Quantifier>s.conclusion.quantifier).type.universal) {
            let isValid = false;

            // Check if the **minor term** is universally quantified in its premise
            const minorTerm = <Term>s.getMinorTerm();
            for (const premise of s.premises) {
                if (premise.indexOf(minorTerm) !== -1) {
                    isValid = (<Quantifier>premise.quantifier).type.universal;
                    break;
                }
            }

            if (!isValid) {
                // Check if the **major term** is universally quantified in its premise
                const minorTerm = <Term>s.getMajorTerm();
                for (const premise of s.premises) {
                    if (premise.indexOf(minorTerm) !== -1) {
                        isValid = (<Quantifier>premise.quantifier).type.universal;
                        break;
                    }
                }
            }

            return {
                valid: isValid,
                message: isValid ? "passed" : "failed",
            }
        } else {
            return {
                valid: true,
                message: "specific_conclusion"
            }
        }
    }
}
