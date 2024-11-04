/**
 * Denotes the figure type of a simple {@link Syllogism}.
 * 
 * There are 4 figure types.
 * @see Syllogism.Figure1
 * @see Syllogism.Figure2
 * @see Syllogism.Figure3
 * @see Syllogism.Figure4
 */
export enum Figure {
    /**
     * ```
     * M → P
     * S → M
     * S → P
     * ```
     */
    Figure1,
    /**
     * ```
     * P → M
     * S → M
     * S → P
     * ```
     */
    Figure2,
    /**
     * ```
     * M → P
     * M → S
     * S → P
     * ```
     */
    Figure3,
    /**
     * ```
     * P → M
     * M → S
     * S → P
     * ```
     */
    Figure4,
}