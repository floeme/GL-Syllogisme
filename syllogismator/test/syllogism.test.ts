import {Syllogism} from "../src/model/Syllogism";
import {Quantifier} from "../src/model/Quantifier";
import {QuantifierType} from "../src/model/QuantifierType";
import {Term} from "../src/model/Term";
import {Proposition} from "../src/model/Proposition";
import {Figure} from "../src/model/Figure";

const generateProposition = (quantName : string, term1 : string, term2 : string):Proposition => {
    return Proposition.withTerms(new Quantifier(quantName, QuantifierType.A), new Term(term1), new Term(term2));
}

const updateProposition = (proposition : Proposition, quantName : string, term1 : string, term2 : string):Proposition => {
    proposition.quantifier = new Quantifier(quantName, QuantifierType.A);
    proposition.subject = new Term(term1);
    proposition.predicate = new Term(term2);
    return proposition;
}

const updatePropositionType = (proposition : Proposition, quantName : Quantifier, term1 : Term, term2 : Term):Proposition => {
    proposition.quantifier = quantName;
    proposition.subject = term1;
    proposition.predicate = term2;
    return proposition;
}

describe('Syllogisme', () => {
    it("addProposition", async ()=>{
        const syllogism : Syllogism = new Syllogism();

        expect(syllogism.getPropositions().length).toBe(3);

        const prop : Proposition = updateProposition(syllogism.getProposition(0), "ILU", "Nabil Aiekillu", "test");

        expect(syllogism.getPropositions().length).toBe(3);
        expect(syllogism.getPropositions()[0]).toBe(prop);

        const prop2 : Proposition = updateProposition(syllogism.getProposition(1), "dezan", "fez", "tezfst");

        expect(syllogism.getPropositions().length).toBe(3);
        expect(syllogism.getPropositions()[0]).toBe(prop)
        expect(syllogism.getPropositions()[1]).toBe(prop2);

        const prop3 : Proposition = generateProposition("frzdz", "Nabil fz", "frefzs");
        syllogism.addProposition(prop3);

        expect(syllogism.getPropositions().length).toBe(4);
        expect(syllogism.getPropositions()[0]).toBe(prop)
        expect(syllogism.getPropositions()[1]).toBe(prop2);
        expect(syllogism.getPropositions()[2]).toBe(prop3);

        const prop4 : Proposition = generateProposition("gede", "Nabil feuzioujhj", "ge");
        syllogism.addProposition(prop4);

        expect(syllogism.getPropositions().length).toBe(5);
        expect(syllogism.getPropositions()[0]).toBe(prop)
        expect(syllogism.getPropositions()[1]).toBe(prop2);
        expect(syllogism.getPropositions()[2]).toBe(prop3);
        expect(syllogism.getPropositions()[3]).toBe(prop4);

    })
    it("removeProposition", async ()=>{
        const syllogism : Syllogism = new Syllogism();

        expect(syllogism.getPropositions().length).toBe(3);

        const prop : Proposition = updateProposition(syllogism.getProposition(0), "ILU", "Nabil Aiekillu", "test");

        const prop2 : Proposition = updateProposition(syllogism.getProposition(1), "dezan", "fez", "tezfst");

        const prop3 : Proposition = generateProposition("frzdz", "Nabil fz", "frefzs");
        syllogism.addProposition(prop3);

        const prop4 : Proposition = generateProposition("gede", "Nabil feuzioujhj", "ge");
        syllogism.addProposition(prop4);

        expect(syllogism.getPropositions().length).toBe(5);
        expect(syllogism.getPropositions()[0]).toBe(prop)
        expect(syllogism.getPropositions()[1]).toBe(prop2);
        expect(syllogism.getPropositions()[2]).toBe(prop3);
        expect(syllogism.getPropositions()[3]).toBe(prop4);

        syllogism.removeProposition(1);

        expect(syllogism.getPropositions().length).toBe(4);
        expect(syllogism.getPropositions()[0]).toBe(prop)
        expect(syllogism.getPropositions()[1]).toBe(prop3);
        expect(syllogism.getPropositions()[2]).toBe(prop4);

        syllogism.removeProposition(0);

        expect(syllogism.getPropositions().length).toBe(3);
        expect(syllogism.getPropositions()[0]).toBe(prop3);
        expect(syllogism.getPropositions()[1]).toBe(prop4);


        syllogism.removeProposition(1);

        expect(syllogism.getPropositions().length).toBe(2);
        expect(syllogism.getPropositions()[0]).toBe(prop3);

        syllogism.removeProposition(0);
        expect(syllogism.getPropositions().length).toBe(1);
    })

    it("getPropositionCount", async ()=>{

        const syllogism : Syllogism = new Syllogism();

        expect(syllogism.getPropositions().length).toBe(3);

        const prop : Proposition = generateProposition("ILU", "Nabil Aiekillu", "test");
        syllogism.addProposition(prop);

        expect(syllogism.getPropositionCount()).toBe(4)

        const prop2 : Proposition = generateProposition("dezan", "fez", "tezfst");
        syllogism.addProposition(prop2);

        expect(syllogism.getPropositionCount()).toBe(5)

        syllogism.removeProposition(0)
        expect(syllogism.getPropositionCount()).toBe(4)

    })

    it("getProposition", async ()=>{

        const syllogism : Syllogism = new Syllogism();

        expect(syllogism.getPropositions().length).toBe(3);

        const prop : Proposition = updateProposition(syllogism.getProposition(0), "ILU", "Nabil Aiekillu", "test");

        const prop2 : Proposition = updateProposition(syllogism.getProposition(1), "dezan", "fez", "tezfst");

        const prop3 : Proposition = generateProposition("fer", "sq", "getr");
        syllogism.addProposition(prop3);

        expect(syllogism.getProposition(0)).toBe(prop);
        expect(syllogism.getProposition(1)).toBe(prop2);
        expect(syllogism.getProposition(2)).toBe(prop3);

        expect(syllogism.getProposition(3)).not.toBe(prop);
        expect(syllogism.getProposition(3)).not.toBe(prop2);
        expect(syllogism.getProposition(3)).not.toBe(prop3);

    })

    it("getPropositions", async ()=>{

        const syllogism : Syllogism = new Syllogism();

        expect(syllogism.getPropositions().length).toBe(3);

        const prop : Proposition = updateProposition(syllogism.getProposition(0), "ILU", "Nabil Aiekillu", "test");

        const prop2 : Proposition = updateProposition(syllogism.getProposition(1), "dezan", "fez", "tezfst");

        const prop3 : Proposition = generateProposition("fer", "sq", "getr");
        syllogism.addProposition(prop3);

        const propositions : Proposition[] = syllogism.getPropositions();


        expect(propositions.find((cprop) => { return cprop == prop})).toBe(prop);

        expect(propositions.find((cprop) => { return cprop == prop2})).toBe(prop2);

        expect(propositions.find((cprop) => { return cprop == prop3})).toBe(prop3);

    })

    it("reorderProposition", async ()=>{

        const syllogism : Syllogism = new Syllogism();

        const prop : Proposition = updateProposition(syllogism.getProposition(0), "ILU", "Nabil Aiekillu", "test");

        const prop2 : Proposition = updateProposition(syllogism.getProposition(1), "dezan", "fez", "tezfst");

        const prop3 : Proposition = generateProposition("fer", "sq", "getr");
        syllogism.addProposition(prop3);

        const conc = syllogism.getProposition(3);

        expect(syllogism.getProposition(0)).toBe(prop);
        expect(syllogism.getProposition(1)).toBe(prop2);
        expect(syllogism.getProposition(2)).toBe(prop3);
        expect(syllogism.getProposition(3)).toBe(conc);

        syllogism.reorderProposition(2,0)

        expect(syllogism.getProposition(0)).toBe(prop3);
        expect(syllogism.getProposition(1)).toBe(prop);
        expect(syllogism.getProposition(2)).toBe(prop2);
        expect(syllogism.getProposition(3)).toBe(conc);

        syllogism.reorderProposition(0,1);

        expect(syllogism.getProposition(0)).toBe(prop);
        expect(syllogism.getProposition(1)).toBe(prop3);
        expect(syllogism.getProposition(2)).toBe(prop2);
        expect(syllogism.getProposition(3)).toBe(conc);

        syllogism.reorderProposition(1,3);

        expect(syllogism.getProposition(0)).toBe(prop);
        expect(syllogism.getProposition(1)).toBe(prop2);
        expect(syllogism.getProposition(2)).toBe(conc);
        expect(syllogism.getProposition(3)).toBe(prop3);

    })


    it("autoReorder", async ()=>{
        const syllogism : Syllogism = Syllogism.ofFigure(Figure.Figure1, new Term("s"), new Term("p"), new Term("m"));
        const prem1 : Proposition = syllogism.getProposition(0);
        const prem2 : Proposition = syllogism.getProposition(1);
        const conc : Proposition = syllogism.getProposition(2);

        prem1.quantifier = new Quantifier("prem1", QuantifierType.A);
        prem2.quantifier = new Quantifier("prem2", QuantifierType.A);
        conc.quantifier = new Quantifier("conc", QuantifierType.A);

        syllogism.reorderProposition(0, 1)

        expect(syllogism.getProposition(0)).toBe(prem2);
        expect(syllogism.getProposition(1)).toBe(prem1);
        expect(syllogism.getProposition(2)).toBe(conc);

        syllogism.autoReorder();

        expect(syllogism.getProposition(0)).toBe(prem1);
        expect(syllogism.getProposition(1)).toBe(prem2);
        expect(syllogism.getProposition(2)).toBe(conc);

        syllogism.autoReorder();

        expect(syllogism.getProposition(0)).toBe(prem1);
        expect(syllogism.getProposition(1)).toBe(prem2);
        expect(syllogism.getProposition(2)).toBe(conc);

    })

    it("getTerms", async ()=> {
        const term1 : Term = new Term("s");
        const term2 : Term = new Term("p");
        const term3 : Term = new Term("m");
        const syllogism: Syllogism = Syllogism.ofFigure(Figure.Figure1, term1, term2, term3);

        expect(syllogism.getTerms().has(term1)).toBe(true);
        expect(syllogism.getTerms().has(term2)).toBe(true);
        expect(syllogism.getTerms().has(term3)).toBe(true);

        const term4 : Term = new Term("reiun");
        const prop : Proposition = Proposition.withTerms(new Quantifier("prop3", QuantifierType.I), term1, term4);

        syllogism.addProposition(prop);

        expect(syllogism.getTerms().has(term1)).toBe(true);
        expect(syllogism.getTerms().has(term2)).toBe(true);
        expect(syllogism.getTerms().has(term3)).toBe(true);
        expect(syllogism.getTerms().has(term4)).toBe(true);

        syllogism.removeProposition(2);

        expect(syllogism.getTerms().has(term1)).toBe(true);
        expect(syllogism.getTerms().has(term2)).toBe(true);
        expect(syllogism.getTerms().has(term3)).toBe(true);

    })

    it("Minor / Major / Middle", async ()=> {
        const term1 : Term = new Term("s");
        const term2 : Term = new Term("p");
        const term3 : Term = new Term("m");
        const syllogism: Syllogism = Syllogism.ofFigure(Figure.Figure1, term1, term2, term3);

        expect(syllogism.getMinorTerm()).toBe(term1);
        expect(syllogism.getMajorTerm()).toBe(term2);
        expect(syllogism.getMiddleTerms().has(term3)).toBe(true);


        const term4 : Term = new Term("reiun");
        const prop : Proposition = Proposition.withTerms(new Quantifier("prop3", QuantifierType.I), term1, term4);

        syllogism.addProposition(prop)

        expect(syllogism.getMinorTerm()).toBe(term1);
        expect(syllogism.getMajorTerm()).toBe(term2);
        expect(syllogism.getMiddleTerms().has(term3)).toBe(true);
        expect(syllogism.getMiddleTerms().has(term4)).toBe(true);

    })

    it("getFigure : Figure 1", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();

        updatePropositionType(syllogism.getProposition(0), new Quantifier("qp1", QuantifierType.I), m, p);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("qp2", QuantifierType.I), s, m);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("qp3", QuantifierType.I), s, p);

        expect(syllogism.getFigure()).toBe(Figure.Figure1)
    })

    it("getFigure : Figure 2", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();


        updatePropositionType(syllogism.getProposition(0), new Quantifier("qp1", QuantifierType.I), p, m);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("qp2", QuantifierType.I), s, m);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("qp3", QuantifierType.I), s, p);

        expect(syllogism.getFigure()).toBe(Figure.Figure2)

    })

    it("getFigure : Figure 3", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();


        updatePropositionType(syllogism.getProposition(0), new Quantifier("qp1", QuantifierType.I), m, p);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("qp2", QuantifierType.I), m, s);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("qp3", QuantifierType.I), s, p);

        expect(syllogism.getFigure()).toBe(Figure.Figure3)


    })

    it("getFigure : Figure 4", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();


        updatePropositionType(syllogism.getProposition(0), new Quantifier("qp1", QuantifierType.I), p, m);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("qp2", QuantifierType.I), m, s);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("qp3", QuantifierType.I), s, p);

        expect(syllogism.getFigure()).toBe(Figure.Figure4)


    })

    it("hasValidStructure : Okay", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();

        updatePropositionType(syllogism.getProposition(0), new Quantifier("qp1", QuantifierType.I), p, m);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("qp2", QuantifierType.I), m, s);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("qp3", QuantifierType.I), s, p);

        expect(syllogism.hasValidStructure()).toBe(true)
    })

    it("hasValidStructure : Prop term equal", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const syllogism: Syllogism = new Syllogism();


        updatePropositionType(syllogism.getProposition(0), new Quantifier("prop1", QuantifierType.I), p, p);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("prop2", QuantifierType.I), m, s);

        updatePropositionType(syllogism.getProposition(2), new Quantifier("conc", QuantifierType.A), s, p);

        expect(syllogism.hasValidStructure()).toBe(false)
    })

    it("hasValidStructure : Prop term not 2", async ()=> {
        const m : Term = new Term("m"); // m
        const p : Term = new Term("p"); // p
        const s : Term = new Term("s"); // s
        const sd : Term = new Term("fr"); // s
        const syllogism: Syllogism = new Syllogism();


        updatePropositionType(syllogism.getProposition(0), new Quantifier("prop1", QuantifierType.I), p, m);
        updatePropositionType(syllogism.getProposition(1), new Quantifier("prop2,", QuantifierType.I), m, sd);
        updatePropositionType(syllogism.getProposition(2), new Quantifier("conc", QuantifierType.I), s, p);

        expect(syllogism.hasValidStructure()).toBe(false)
    })

})