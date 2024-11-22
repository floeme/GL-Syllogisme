import { Syllogism } from "../../src/model/Syllogism";
import { Term } from "../../src/model/Term";
import { Quantifier} from "../../src/model/Quantifier";
import {QuantifierType } from "../../src/model/QuantifierType";
import { Proposition } from "../../src/model/Proposition";
import { Rmt, Rlh} from "../../src/model/RulesImpl";
import { RuleResult } from "../../src/model/Rule";


const updatePropositionType = (proposition : Proposition, quantName : Quantifier, term1 : Term, term2 : Term):Proposition => {
    proposition.quantifier = quantName;
    proposition.subject = term1;
    proposition.predicate = term2;
    return proposition;
}

// ----------------------------------------------------------------------
//                    RULE RMT
//------------------------------------------------------------------------
const casesRMT = [               // figures :  1     2      3     4
    { q1Type: QuantifierType.A, q2Type: QuantifierType.A, expectedResults: [true, false, true, true] },
    { q1Type: QuantifierType.A, q2Type: QuantifierType.E, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.A, q2Type: QuantifierType.I, expectedResults: [true, false, true, false] },
    { q1Type: QuantifierType.A, q2Type: QuantifierType.O, expectedResults: [true, true, true, false] },

    { q1Type: QuantifierType.E, q2Type: QuantifierType.A, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.E, q2Type: QuantifierType.E, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.E, q2Type: QuantifierType.I, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.E, q2Type: QuantifierType.O, expectedResults: [true, true, true, true] },

    { q1Type: QuantifierType.I, q2Type: QuantifierType.A, expectedResults: [false, false, true, true] },
    { q1Type: QuantifierType.I, q2Type: QuantifierType.E, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.I, q2Type: QuantifierType.I, expectedResults: [false, false, false, false] },
    { q1Type: QuantifierType.I, q2Type: QuantifierType.O, expectedResults: [true, true, false, false] },

    { q1Type: QuantifierType.O, q2Type: QuantifierType.A, expectedResults: [false, true, true, true] },
    { q1Type: QuantifierType.O, q2Type: QuantifierType.E, expectedResults: [true, true, true, true] },
    { q1Type: QuantifierType.O, q2Type: QuantifierType.I, expectedResults: [false, true, false, true] },
    { q1Type: QuantifierType.O, q2Type: QuantifierType.O, expectedResults: [true, true, false, true] },
];


describe("Exhaustive testing of Rmt Rule for all figures with specific expectations", () => {
    casesRMT.forEach(({ q1Type, q2Type, expectedResults }, index) => {
        /**
         * Testing for Figure 1
         */
        it(`Figure 1 -> ${q1Type.code}${q2Type.code}`, () => {
            const syllogism = new Syllogism();
            const t1 = new Term("M"), t2 = new Term("P"), t3 = new Term("S");

            updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2);// Major premise (M - P)
            updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t3, t1);// Minor premise (S - M)

            const result: RuleResult = Rmt.check(syllogism);
            expect(result.valid).toBe(expectedResults[0]);
        });

        /**
         * Testing for Figure 2
         */
        it(`Figure 2 -> ${q1Type.code}${q2Type.code}`, () => {
            const syllogism = new Syllogism();
            const t1 = new Term("P"), t2 = new Term("M"), t3 = new Term("S");

            updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2);// Major premise (P - M)
            updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t3, t2);// Minor premise (S - M)

            const result: RuleResult = Rmt.check(syllogism);
            expect(result.valid).toBe(expectedResults[1]);
        });

        /**
         * Testing for Figure 3
         */
        it(`Figure 3 -> ${q1Type.code}${q2Type.code}`, () => {
            const syllogism = new Syllogism();
            const t1 = new Term("M"), t2 = new Term("P"), t3 = new Term("S");

            updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2);// Major premise (M - P)
            updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t1, t3);// Minor premise (M - S)

            const result: RuleResult = Rmt.check(syllogism);
            expect(result.valid).toBe(expectedResults[2]);
        });

        /**
         * Testing for Figure 4
         */
        it(`Figure 4 -> ${q1Type.code}${q2Type.code}`, () => {
            const syllogism = new Syllogism();
            const t1 = new Term("P"), t2 = new Term("M"), t3 = new Term("S");

            updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2); // Major premise (P - M)
            updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t2, t3); // Minor premise (M - S)

            const result: RuleResult = Rmt.check(syllogism);
            expect(result.valid).toBe(expectedResults[3]);
        });
    });
});



// ----------------------------------------------------------------------
//                    RULE RLH
//------------------------------------------------------------------------
    const casesRLH = [               // figures :  1     2      3     4
        { q1Type: QuantifierType.A, q2Type: QuantifierType.A, conclusionType: QuantifierType.A, expectedResults: [true, true, false, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.A, conclusionType: QuantifierType.E, expectedResults: [false, true, false, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.A, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.A, conclusionType: QuantifierType.O, expectedResults: [false, true, false, true] },

        { q1Type: QuantifierType.A, q2Type: QuantifierType.E, conclusionType: QuantifierType.A, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.E, conclusionType: QuantifierType.E, expectedResults: [false, true, false, true] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.E, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.E, conclusionType: QuantifierType.O, expectedResults: [false, true, false, true] },

        { q1Type: QuantifierType.A, q2Type: QuantifierType.I, conclusionType: QuantifierType.A, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.I, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.I, conclusionType: QuantifierType.I, expectedResults: [true, false, true, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.I, conclusionType: QuantifierType.O, expectedResults: [true, true, true, true] },

        { q1Type: QuantifierType.A, q2Type: QuantifierType.O, conclusionType: QuantifierType.A, expectedResults: [true, true, true, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.O, conclusionType: QuantifierType.E, expectedResults: [true, true, true, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.O, conclusionType: QuantifierType.I, expectedResults: [true, true, true, false] },
        { q1Type: QuantifierType.A, q2Type: QuantifierType.O, conclusionType: QuantifierType.O, expectedResults: [true, true, true, false] },


        { q1Type: QuantifierType.E, q2Type: QuantifierType.A, conclusionType: QuantifierType.A, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.A, conclusionType: QuantifierType.E, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.A, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.A, conclusionType: QuantifierType.O, expectedResults: [true, true, true, true] },

        { q1Type: QuantifierType.E, q2Type: QuantifierType.E, conclusionType: QuantifierType.A, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.E, conclusionType: QuantifierType.E, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.E, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.E, conclusionType: QuantifierType.O, expectedResults: [true, true, true, true] },

        { q1Type: QuantifierType.E, q2Type: QuantifierType.I, conclusionType: QuantifierType.A, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.I, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.I, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.I, conclusionType: QuantifierType.O, expectedResults: [true, true, true, true] },

        { q1Type: QuantifierType.E, q2Type: QuantifierType.O, conclusionType: QuantifierType.A, expectedResults: [false, false, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.O, conclusionType: QuantifierType.E, expectedResults: [false, false, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.O, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.E, q2Type: QuantifierType.O, conclusionType: QuantifierType.O, expectedResults: [true, true, true, true] },

        { q1Type: QuantifierType.I, q2Type: QuantifierType.A, conclusionType: QuantifierType.A, expectedResults: [true, true, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.A, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.A, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.A, conclusionType: QuantifierType.O, expectedResults: [false, false, false, false] },

        { q1Type: QuantifierType.I, q2Type: QuantifierType.E, conclusionType: QuantifierType.A, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.E, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.E, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.E, conclusionType: QuantifierType.O, expectedResults: [false, false, false, false] },

        { q1Type: QuantifierType.I, q2Type: QuantifierType.I, conclusionType: QuantifierType.A, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.I, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.I, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.I, conclusionType: QuantifierType.O, expectedResults: [false, false, false, false] },

        { q1Type: QuantifierType.I, q2Type: QuantifierType.O, conclusionType: QuantifierType.A, expectedResults: [true, true, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.O, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.O, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.I, q2Type: QuantifierType.O, conclusionType: QuantifierType.O, expectedResults: [false, false, false, false] },


        { q1Type: QuantifierType.O, q2Type: QuantifierType.A, conclusionType: QuantifierType.A, expectedResults: [true, true, false, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.A, conclusionType: QuantifierType.E, expectedResults: [true, false, false, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.A, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.A, conclusionType: QuantifierType.O, expectedResults: [true, false, true, false] },

        { q1Type: QuantifierType.O, q2Type: QuantifierType.E, conclusionType: QuantifierType.A, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.E, conclusionType: QuantifierType.E, expectedResults: [true, false, true, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.E, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.E, conclusionType: QuantifierType.O, expectedResults: [true, false, true, false] },

        { q1Type: QuantifierType.O, q2Type: QuantifierType.I, conclusionType: QuantifierType.A, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.I, conclusionType: QuantifierType.E, expectedResults: [false, false, false, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.I, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.I, conclusionType: QuantifierType.O, expectedResults: [true, false, true, false] },

        { q1Type: QuantifierType.O, q2Type: QuantifierType.O, conclusionType: QuantifierType.A, expectedResults: [false, false, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.O, conclusionType: QuantifierType.E, expectedResults: [false, false, true, false] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.O, conclusionType: QuantifierType.I, expectedResults: [true, true, true, true] },
        { q1Type: QuantifierType.O, q2Type: QuantifierType.O, conclusionType: QuantifierType.O, expectedResults: [true, false, true, false] },
    ];

    describe("Exhaustive testing of Rlh Rule for all figures with specific expectations", () => {
        casesRLH.forEach(({ q1Type, q2Type, conclusionType, expectedResults }, index) => {
            /**
             * Testing for Figure 1
             */
            it(`Figure 1 -> ${q1Type.code}${q2Type.code}${conclusionType.code}`, () => {
                const syllogism = new Syllogism();
                const t1 = new Term("M"), t2 = new Term("P"), t3 = new Term("S");

                updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2);// Major premise (M - P)
                updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t3, t1); // Minor premise (S - M)
                updatePropositionType(syllogism.getProposition(2), new Quantifier("Q", conclusionType), t3, t2);

                const result: RuleResult = Rlh.check(syllogism);
                expect(result.valid).toBe(expectedResults[0]);
            });

            /**
             * Testing for Figure 2
             */
            it(`Figure 2 -> ${q1Type.code}${q2Type.code}${conclusionType.code}`, () => {
                const syllogism = new Syllogism();
                const t1 = new Term("P"), t2 = new Term("M"), t3 = new Term("S");

                updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2); // Major premise (P - M)
                updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t3, t2); // Minor premise (S - M)
                updatePropositionType(syllogism.getProposition(2), new Quantifier("Q", conclusionType), t3, t1);

                const result: RuleResult = Rlh.check(syllogism);
                expect(result.valid).toBe(expectedResults[1]);
            });

            /**
             * Testing for Figure 3
             */
            it(`Figure 3 -> ${q1Type.code}${q2Type.code}${conclusionType.code}`, () => {
                const syllogism = new Syllogism();
                const t1 = new Term("M"), t2 = new Term("P"), t3 = new Term("S");

                updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2); // Major premise (M - P)
                updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t1, t3); // Minor premise (M - S)
                updatePropositionType(syllogism.getProposition(2), new Quantifier("Q", conclusionType), t3, t2);

                const result: RuleResult = Rlh.check(syllogism);
                expect(result.valid).toBe(expectedResults[2]);
            });

            /**
             * Testing for Figure 4
             */
            it(`Figure 4 -> ${q1Type.code}${q2Type.code}${conclusionType.code}`, () => {
                const syllogism = new Syllogism();
                const t1 = new Term("P"), t2 = new Term("M"), t3 = new Term("S");

                updatePropositionType(syllogism.getProposition(0), new Quantifier("Q", q1Type), t1, t2); // Major premise (P - M)
                updatePropositionType(syllogism.getProposition(1), new Quantifier("Q", q2Type), t2, t3); // Minor premise (M - S)
                updatePropositionType(syllogism.getProposition(2), new Quantifier("Q", conclusionType), t3, t1);

                const result: RuleResult = Rlh.check(syllogism);
                expect(result.valid).toBe(expectedResults[3]);
            });
        });
    });