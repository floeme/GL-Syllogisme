import {Quantifier} from "../src/model/Quantifier";
import {QuantifierType} from "../src/model/QuantifierType";

describe('Quantifier', () => {
    it("Quantifier test", async ()=>{
        const quant : Quantifier = new Quantifier('test', QuantifierType.A);
        expect(quant.type).toBe(QuantifierType.A);
        expect(quant.name).toBe("test");
    })
    it("Quantifier test with set", async ()=>{
        const quant : Quantifier = new Quantifier('test', QuantifierType.A);
        expect(quant.type).toBe(QuantifierType.A);
        expect(quant.name).toBe("test");

        quant.type = QuantifierType.O;
        quant.name = "buenjfjk";

        expect(quant.type).toBe(QuantifierType.O);
        expect(quant.name).toBe("buenjfjk");
    })
})