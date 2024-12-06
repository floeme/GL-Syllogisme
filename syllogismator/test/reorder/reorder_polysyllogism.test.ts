import { Syllogism } from "../../src/model/Syllogism";
import { Term } from "../../src/model/Term";
import { Quantifier} from "../../src/model/Quantifier";
import {QuantifierType } from "../../src/model/QuantifierType";
import { Proposition } from "../../src/model/Proposition";

const updatePropositionType = (proposition : Proposition, quantName : Quantifier, term1 : Term, term2 : Term):Proposition => {
    proposition.quantifier = quantName;
    proposition.subject = term1;
    proposition.predicate = term2;
    return proposition;
};

describe("Reorder a polysyllogism in the right order (must not move premises)", () => {

    it(`[4 propositions] (P-M1)(M1-M2)(M2-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, S); // (M2 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);   // (S - P)

        console.log("Expected : " + polysyllogism.toString());

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        console.log("\nReceived : " + polysyllogism.toString());

        expect([1,0]).toContain(received[0].indexOf(P));
        expect([1,0]).toContain(received[0].indexOf(M1));

        expect([1,0]).toContain(received[1].indexOf(M1));
        expect([1,0]).toContain(received[1].indexOf(M2));

        expect([1,0]).toContain(received[2].indexOf(M2));
        expect([1,0]).toContain(received[2].indexOf(S));

        expect(received[3].subject).toBe(S);
        expect(received[3].predicate).toBe(P);
    });

    it(`[5 propositions] (P-M1)(M1-M2)(M2-M3)(M3-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const M3 = new Term("M3");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, M3); // (M2 - M3)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), M3, S), -1);   // (M3 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);   // (S - P)

        console.log("Expected : " + polysyllogism.toString());

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        console.log("\nReceived : " + polysyllogism.toString());

        expect([1,0]).toContain(received[0].indexOf(P));
        expect([1,0]).toContain(received[0].indexOf(M1));

        expect([1,0]).toContain(received[1].indexOf(M1));
        expect([1,0]).toContain(received[1].indexOf(M2));

        expect([1,0]).toContain(received[2].indexOf(M2));
        expect([1,0]).toContain(received[2].indexOf(M3));

        expect([1,0]).toContain(received[3].indexOf(M3));
        expect([1,0]).toContain(received[3].indexOf(S));

        expect(received[4].subject).toBe(S);
        expect(received[4].predicate).toBe(P);
    });

    it(`[6 propositions] (P-M1)(M1-M2)(M2-M3)(M3-M4)(M4-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const M3 = new Term("M3");
        const M4 = new Term("M4");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, M3); // (M2 - M3)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), M3, M4), -1);   // (M3 - M4)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), M4, S), -1);   // (M4 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);   // (S - P)

        console.log("Expected : " + polysyllogism.toString());

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        console.log("\nReceived : " + polysyllogism.toString());

        expect([1,0]).toContain(received[0].indexOf(P));
        expect([1,0]).toContain(received[0].indexOf(M1));

        expect([1,0]).toContain(received[1].indexOf(M1));
        expect([1,0]).toContain(received[1].indexOf(M2));

        expect([1,0]).toContain(received[2].indexOf(M2));
        expect([1,0]).toContain(received[2].indexOf(M3));

        expect([1,0]).toContain(received[3].indexOf(M3));
        expect([1,0]).toContain(received[3].indexOf(M4));

        expect([1,0]).toContain(received[4].indexOf(M4));
        expect([1,0]).toContain(received[4].indexOf(S));

        expect(received[5].subject).toBe(S);
        expect(received[5].predicate).toBe(P);
    });
});

describe("Reorder a polysyllogism in the wrong order", ()=> {
    it(`[4 propositions] (M1-M2)(P-M1)(M2-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, S);// (M2 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);// (S - P)

        console.log("before : " + polysyllogism.toString());

        polysyllogism.autoReorder();

        const after : Proposition[] = polysyllogism.getPropositions();
        console.log("\nReceived : " + polysyllogism.toString());

        expect([1,0]).toContain(after[0].indexOf(P));
        expect([1,0]).toContain(after[0].indexOf(M1));

        expect([1,0]).toContain(after[1].indexOf(M1));
        expect([1,0]).toContain(after[1].indexOf(M2));

        expect([1,0]).toContain(after[2].indexOf(M2));
        expect([1,0]).toContain(after[2].indexOf(S));

        expect(after[3].subject).toBe(S);
        expect(after[3].predicate).toBe(P);
    });

    it(`[5 propositions] (M1-M2)(P-M1)(M2-M3)(M3-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const M3 = new Term("M3");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, M3);// (M2 - M3)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), M3, S), -1);// (M3 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);// (S - P)

        console.log("before : " + polysyllogism.toString());

        polysyllogism.autoReorder();

        const after : Proposition[] = polysyllogism.getPropositions();
        console.log("\nReceived : " + polysyllogism.toString());

        expect([1,0]).toContain(after[0].indexOf(P));
        expect([1,0]).toContain(after[0].indexOf(M1));

        expect([1,0]).toContain(after[1].indexOf(M1));
        expect([1,0]).toContain(after[1].indexOf(M2));

        expect([1,0]).toContain(after[2].indexOf(M2));
        expect([1,0]).toContain(after[2].indexOf(M3));

        expect([1,0]).toContain(after[3].indexOf(M3));
        expect([1,0]).toContain(after[3].indexOf(S));

        expect(after[4].subject).toBe(S);
        expect(after[4].predicate).toBe(P);
    });
});

