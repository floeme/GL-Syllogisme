import {Quantifier} from "../src/model/Quantifier.ts";
import {QuantifierType} from "../src/model/QuantifierType.ts";
import {QuantifierRepository} from "../src/model/QuantifierRepository.ts";

test("Quantifier Repository: getByType", async () => {

    const quantifiera1 : Quantifier = new Quantifier("ILU", QuantifierType.A);
    const quantifiera2 : Quantifier = new Quantifier("DA", QuantifierType.A);

    const quantifieri1 : Quantifier = new Quantifier("ZLKJKZ", QuantifierType.I);
    const quantifieri2 : Quantifier = new Quantifier("M?EZFOK?ML", QuantifierType.I);
    const quantifieri3 : Quantifier = new Quantifier("LZINZ", QuantifierType.I);

    const quantifiero1 : Quantifier = new Quantifier("ALINA", QuantifierType.O);

    QuantifierRepository.reset();

    QuantifierRepository.add(quantifiera1);
    QuantifierRepository.add(quantifiera2);

    QuantifierRepository.add(quantifieri1);
    QuantifierRepository.add(quantifieri2);
    QuantifierRepository.add(quantifieri3);

    QuantifierRepository.add(quantifiero1);

    expect(QuantifierRepository.getByType(QuantifierType.A).length).toBe(2)
    expect(QuantifierRepository.getByType(QuantifierType.E).length).toBe(0)
    expect(QuantifierRepository.getByType(QuantifierType.I).length).toBe(3)
    expect(QuantifierRepository.getByType(QuantifierType.O).length).toBe(1)

})