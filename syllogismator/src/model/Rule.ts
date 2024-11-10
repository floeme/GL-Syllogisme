import {Syllogism} from "./Syllogism.ts";
import * as r from "./RulesImpl.ts";

export const RULE_I18N_NAMESPACE = "syllogism.rule";
export const RULE_NAME_I18N_KEY = "name";
export const RULE_DESCRIPTION_I18N_KEY = "description";

const STANDARD_RULES = [r.Rmt, r.Rlh, r.Rnn, r.Rn, r.Raa, r.Rpp, r.Rp]; // Private; do not mutate it.

/**
 * A rule which validates a given syllogism.
 *
 * **Precondition for all rules:** the syllogism to check must have a valid structure, i.e.
 * {@link Syllogism.hasValidStructure} must return `true`.
 *
 * **Messages and descriptions in translation files:** In translation files (in `public/locales`), there is a
 * "namespace" for each rule (`syllogism.rule.<Rule ID>`), containing the name of the rule (`name` key), its description
 * (`description`) and several messages (for different results of syllogism check).
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
 * For instance, the name of the rule `Rmt` is the value of `syllogism.rule.Rmt.name`.
 * @see ruleNamespace
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
     * Key (without namespace) of the message explaining why the rule passed or failed.
     * @see Rule
     */
    message: string;
    /**
     * Extra objects if some data has to be shown in the message.
     */
    extras?: object[];
}

/**
 * Check given syllogism with given rules (or [standard rules]{@link STANDARD_RULES} if no rule array is passed as
 * argument).
 *
 * **Precondition:** the syllogism to check must have a valid structure, i.e. {@link Syllogism.hasValidStructure} must
 * return `true`.
 *
 * @param syllogism Syllogism to check
 * @param rules Rules to check the syllogism
 * @param stopOnBrokenRule If true, when a rule is broken, the other rules are not checked. False by default.
 * @return A map which associates a [rule id]{@link Rule.id} to the [result]{@link RuleResult} of that rule
 */
export function check(
    syllogism: Syllogism,
    rules: Rule[] = STANDARD_RULES,
    stopOnBrokenRule: boolean = false
): Map<string, RuleResult> {
    const result = new Map<string, RuleResult>();

    for (let rule of rules) {
        const ruleResult = rule.check(syllogism);
        result.set(rule.id, ruleResult);
        if (stopOnBrokenRule && !ruleResult) break;
    }

    return result;
}

/**
 * Returns rule namespace for given rule, for i18n.
 */
export function ruleNamespace(rule: Rule) {
    return RULE_I18N_NAMESPACE + "." + rule.id;
}

export function ruleName(rule: Rule): string {
    return ruleNamespace(rule) + "." + RULE_NAME_I18N_KEY;
}

export function ruleDescription(rule: Rule): string {
    return ruleNamespace(rule) + "." + RULE_DESCRIPTION_I18N_KEY;
}
