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

describe("Test : reorder a valid order polysyllogism", () => {

    it(`Case : (P-M1)(M1-M2)(M2-S)(S-P)`, () => {
        const polysyllogism = new Syllogism();
        const P = new Term("P");
        const M1 = new Term("M1");
        const M2 = new Term("M2");
        const S = new Term("S");

        updatePropositionType(polysyllogism.getProposition(0), new Quantifier("Q", QuantifierType.A), P, M1);//  (P - M1)
        updatePropositionType(polysyllogism.getProposition(1), new Quantifier("Q", QuantifierType.A), M1, M2);// (M1 - M2)
        updatePropositionType(polysyllogism.getProposition(2), new Quantifier("Q", QuantifierType.A), M2, S); // (M2 - S)
        polysyllogism.addProposition(Proposition.withTerms( new Quantifier("Q", QuantifierType.A), S, P), -1);   // (S - P)

        const expected = polysyllogism.getPropositions();
        let tmp : string = "";
        expected.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("Expected : " + tmp);

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        tmp = "";
        received.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("\nReceived : " + tmp);

        expect(received[0].subject).toBe(P);
        expect(received[0].predicate).toBe(M1);

        expect(received[1].subject).toBe(M1);
        expect(received[1].predicate).toBe(M2);

        expect(received[2].subject).toBe(M2);
        expect(received[2].predicate).toBe(S);

        expect(received[3].subject).toBe(S);
        expect(received[3].predicate).toBe(P);
    });

    it(`Case : (P-M1)(M1-M2)(M2-M3)(M3-S)(S-P)`, () => {
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

        const expected = polysyllogism.getPropositions();
        let tmp : string = "";
        expected.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("Expected : " + tmp);

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        tmp = "";
        received.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("\nReceived : " + tmp);

        expect(received[0].subject).toBe(P);
        expect(received[0].predicate).toBe(M1);

        expect(received[1].subject).toBe(M1);
        expect(received[1].predicate).toBe(M2);

        expect(received[2].subject).toBe(M2);
        expect(received[2].predicate).toBe(M3);

        expect(received[3].subject).toBe(M3);
        expect(received[3].predicate).toBe(S);

        expect(received[4].subject).toBe(S);
        expect(received[4].predicate).toBe(P);
    });

    it(`Case : (P-M1)(M1-M2)(M2-M3)(M3-M4)(M4-S)(S-P)`, () => {
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

        const expected = polysyllogism.getPropositions();
        let tmp : string = "";
        expected.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("Expected : " + tmp);

        polysyllogism.autoReorder();

        const received : Proposition[] = polysyllogism.getPropositions();
        tmp = "";
        received.map((p) => {
            tmp = tmp + "\nsubject : " + p.subject!.value + " | predicate : " + p.predicate!.value;
        })
        console.log("\nReceived : " + tmp);

        expect(received[0].subject).toBe(P);
        expect(received[0].predicate).toBe(M1);

        expect(received[1].subject).toBe(M1);
        expect(received[1].predicate).toBe(M2);

        expect(received[2].subject).toBe(M2);
        expect(received[2].predicate).toBe(M3);

        expect(received[3].subject).toBe(M3);
        expect(received[3].predicate).toBe(M4);

        expect(received[4].subject).toBe(M4);
        expect(received[4].predicate).toBe(S);

        expect(received[5].subject).toBe(S);
        expect(received[5].predicate).toBe(P);
    });
});

