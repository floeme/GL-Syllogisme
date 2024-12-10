import { Syllogism } from "../../src/model/Syllogism";
import { Term } from "../../src/model/Term";
import { Quantifier} from "../../src/model/Quantifier";
import {QuantifierType } from "../../src/model/QuantifierType";
import { Proposition } from "../../src/model/Proposition";
import {check, CheckResults, Rule, RuleResult} from "../../src/model/Rule";
import {Rlh, Rmt} from "../../src/model/RulesImpl";

const updatePropositionType = (proposition : Proposition, quantName : Quantifier, term1 : Term, term2 : Term):Proposition => {
    proposition.quantifier = quantName;
    proposition.subject = term1;
    proposition.predicate = term2;
    return proposition;
};

function test(rule : Rule){
    const polySyllogism = new Syllogism();
    const M = new Term("M"), C = new Term("C"), P = new Term("P"), S = new Term("S"), R = new Term("R"), T = new Term("T"), N = new Term("N");

    updatePropositionType(polySyllogism.getProposition(0), new Quantifier("A", QuantifierType.A), P, M);
    updatePropositionType(polySyllogism.getProposition(1), new Quantifier("A", QuantifierType.A), M, R);
    updatePropositionType(polySyllogism.getProposition(2), new Quantifier("A", QuantifierType.A), R, T);
    polySyllogism.addProposition(Proposition.withTerms( new Quantifier("A", QuantifierType.A), T, N), -1);
    polySyllogism.addProposition(Proposition.withTerms( new Quantifier("E", QuantifierType.E), C, N), -1);
    polySyllogism.addProposition(Proposition.withTerms( new Quantifier("A", QuantifierType.A), S, C), -1);
    polySyllogism.addProposition(Proposition.withTerms( new Quantifier("E", QuantifierType.E), S, P), -1);


    const result = rule.check(polySyllogism);
    expect(result.valid).toBe(true);
}

describe("Test rules of polysyllogism on quantity", () => {
    it('Rule : Rlh', () => {
        test(Rlh);
    });
    it('Rule : Rmt', () => {
        test(Rmt)
    });
});