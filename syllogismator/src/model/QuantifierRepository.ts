import {Quantifier} from "./Quantifier.ts";
import {QuantifierType} from "./QuantifierType.ts";

const LOCALSTORAGE_QUANTIFIERS_KEY = "quantifiers";

/**
 * Manages quantifier aliases and their persistence in browser local storage.
 * It loads and saves quantifier aliases.
 */
export class QuantifierRepository {
    private static serialize(quantifiers: Quantifier[]): string {
        return JSON.stringify(
            quantifiers.map((quantifier: Quantifier) => ({
                type: quantifier.type.code,
                name: quantifier.name
            }))
        );
    }

    private static deserialize(quantifiers: string): Quantifier[] {
        return JSON.parse(quantifiers)
            .map((item: { type: string; name: string; }) =>
                new Quantifier(item.name, QuantifierType.of(item.type))
            );
    }

    private static load(): Quantifier[] {
        const storedQuantifiers = localStorage.getItem(LOCALSTORAGE_QUANTIFIERS_KEY);
        return (storedQuantifiers != null) ? this.deserialize(storedQuantifiers) : [];
    }

    private static persist(quantifiers: Quantifier[]) {
        localStorage.setItem(LOCALSTORAGE_QUANTIFIERS_KEY, this.serialize(quantifiers))
    }

    private static update(updateFn: (quantifiers: Quantifier[]) => void) {
        const storedQuantifiers = this.load();
        updateFn(storedQuantifiers);
        this.persist(storedQuantifiers)
    }

    /**
     * Reset to default values.
     */
    static reset(): void {
        this.persist([]);
    }

    /**
     * Returns all quantifiers.
     */
    static getAll(): Quantifier[] {
        return this.load();
    }

    /**
     * Returns quantifiers of given type.
     */
    static getByType(type: QuantifierType): Quantifier[] {
        return this.load().filter((quantifier: Quantifier) => quantifier.type === type);
    }

    /**
     * Adds given quantifier.
     */
    static add(quantifier: Quantifier): void {
        this.update(quantifiers => quantifiers.push(quantifier));
    }

    /**
     * Removes given quantifier.
     */
    static remove(quantifier: Quantifier): void {
        this.update(quantifiers => {
            const index = quantifiers.indexOf(quantifier);
            if (index >= 0) quantifiers.splice(index, 1);
        });
    }
}
