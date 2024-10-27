import {Syllogism} from "./Syllogism.ts";

/**
 * A rule which validates a given syllogism.
 */
export interface Rule {
    check(syllogism: Syllogism): {valid: boolean; message: string};
}