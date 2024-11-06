import {Syllogism} from "./Syllogism.ts";
import {Quantifier} from "./Quantifier.ts";
import {Term} from "./Term.ts";

export const RULE_I18N_NAMESPACE = "syllogism.rule";

/**
 * Result of a rule, with a boolean indicating if the rule passed or not on a syllogism and a message explaining why.
 * If some data has to be shown in the message, it could be supplied in `extras`.
 */
export type RuleResult = {
    /**
     * Boolean indicating if the rule passed (`true`) or failed (`false`).
     */
    valid: boolean;
    /**
     * Message explaining why the rule passed or failed.
     */
    message: string;
    /**
     * Extra objects if some data has to be shown in the message.
     */
    extras?: object[];
}

/**
 * A rule which validates a given syllogism.
 *
 * **Precondition for all rules:** the syllogism to check must have a valid structure, i.e.
 * {@link Syllogism.hasValidStructure} must return `true`.
 *
 * **Messages and descriptions in translation files:** In translation files (in `public/locales`), there is a
 * "namespace" for each rule (`syllogism.rule.<Rule ID>`), containing the name of the rule (`name` key), its description
 * (`description`) and several messages.
 * This namespace is structured as follows:
 * ```json
 * {
 *   "syllogism": {
 *     "rule": {
 *       "Rmt": { // ← Identifier of the rule
 *         // Required keys:
 *         "name": "Middle Term Rule",
 *         "description": "The quantifier must be universal in at least one premise.",
 *         // Other messages:
 *         "passed": "The quantifier is universal in at least one premise.",
 *         "failed": "There is not any universally-quantified premise."
 *       },
 *       // Other rules here...
 *     }
 *   }
 * }
 * ```
 */
export type Rule = {
    /**
     * Identifier of the rule, such as `Rmt`, `Rlh`...
     */
    readonly id: string;
    /**
     * Function to check given syllogism.
     */
    readonly check: (s: Syllogism) => RuleResult;
}


// Rules

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
