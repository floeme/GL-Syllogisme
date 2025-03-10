import {Proposition} from "../src/model/Proposition";
import {Quantifier} from "../src/model/Quantifier";
import {QuantifierType} from "../src/model/QuantifierType";
import {Term} from "../src/model/Term";

describe("Proposition", () => {
    it("WithTerms", async () => {
        const quantifier : Quantifier = new Quantifier("quantifier", QuantifierType.A);
        const term1 : Term = new Term("term1");
        const term2 : Term = new Term("term2");

        const prop : Proposition = Proposition.withTerms(quantifier, term1, term2);

        expect(prop.quantifier).toBe(quantifier)
        expect(prop.subject).toBe(term1)
        expect(prop.predicate).toBe(term2)

        const prop2 : Proposition = Proposition.withTerms(quantifier, term1, term1);

        expect(prop2.quantifier).toBe(quantifier)
        expect(prop2.subject).toBe(term1)
        expect(prop2.predicate).toBe(term1)

    })

    it("hasValidStructure", async () => {
        const quantifier : Quantifier = new Quantifier("quantifier", QuantifierType.A);
        const term1 : Term = new Term("term1");
        const term2 : Term = new Term("term2");

        const prop : Proposition = Proposition.withTerms(quantifier, term1, term2);

        expect(prop.hasValidStructure()).toBe(true);

        const prop2 : Proposition = Proposition.withTerms(quantifier, term1, term1);

        expect(prop2.hasValidStructure()).toBe(false);
    })
})