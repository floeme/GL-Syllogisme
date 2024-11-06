import {Quantifier} from "../src/model/Quantifier";
import {QuantifierType} from "../src/model/QuantifierType";

describe('Quantifier', () => {
    it("Quantifier test", async ()=>{
        const quant : Quantifier = new Quantifier('q1', QuantifierType.A);
        expect(quant.type).toBe(QuantifierType.A);
        expect(quant.name).toBe("q1");
    })
    it("Quantifier test with set", async ()=>{
        const quant : Quantifier = new Quantifier('q2', QuantifierType.A);
        expect(quant.type).toBe(QuantifierType.A);
        expect(quant.name).toBe("q2");

        quant.type = QuantifierType.O;
        quant.name = "q3";

        expect(quant.type).toBe(QuantifierType.O);
        expect(quant.name).toBe("q3");
    })
})