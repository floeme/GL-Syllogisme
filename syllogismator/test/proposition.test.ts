import {Proposition} from "../src/model/Proposition.ts";
import {Quantifier} from "../src/model/Quantifier.ts";
import {QuantifierType} from "../src/model/QuantifierType.ts";
import {Term} from "../src/model/Term.ts";

test("Proposition: withTerms", () => {
    const quantifier : Quantifier = new Quantifier("ILU", QuantifierType.A);
    const term1 : Term = new Term("Nabil AieKillu");
    const term2 : Term = new Term("Axel");

    const prop : Proposition = Proposition.withTerms(quantifier, term1, term2);

    expect(prop.quantifier).toBe(quantifier)
    expect(prop.subject).toBe(term1)
    expect(prop.predicate).toBe(term2)

    expect(prop.hasValidStructure()).toBe(true);

    const prop2 : Proposition = Proposition.withTerms(quantifier, term1, term1);

    expect(prop2.quantifier).toBe(quantifier)
    expect(prop2.subject).toBe(term1)
    expect(prop2.predicate).toBe(term1)

    expect(prop2.hasValidStructure()).toBe(false);

})

test("Proposition: constructor", () => {

    const quantifier : Quantifier = new Quantifier("ILU", QuantifierType.A);
    const term1 : Term = new Term("Nabil AieKillu");
    const term2 : Term = new Term("Axel");

    const prop : Proposition = new Proposition();

    expect(prop.quantifier).toBe(undefined)
    expect(prop.subject).toBe(undefined)
    expect(prop.predicate).toBe(undefined)

    expect(prop.hasValidStructure()).toBe(false);


    prop.quantifier = quantifier

    expect(prop.quantifier).toBe(quantifier)
    expect(prop.hasValidStructure()).toBe(false);

    prop.subject = term1
    expect(prop.subject).toBe(term1)
    expect(prop.hasValidStructure()).toBe(false);

    prop.predicate = term2
    expect(prop.predicate).toBe(term2)
    expect(prop.hasValidStructure()).toBe(true);

    prop.predicate = term1
    expect(prop.predicate).toBe(term1)
    expect(prop.hasValidStructure()).toBe(false);

})