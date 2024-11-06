import {Quantifier} from "../src/model/Quantifier";
import {QuantifierType} from "../src/model/QuantifierType";
import {QuantifierRepository} from "../src/model/QuantifierRepository";

const checkExist = (q : Quantifier[], t : Quantifier): boolean => {
    return q.find(value => {
        return value.name == t.name;
    }) != undefined
}

const search = (q : Quantifier[], t : Quantifier): Quantifier => {
    const result =  q.find(value => {
        return value.name == t.name;
    })
    if(result == undefined)
        return t;
    return result;
}

describe("QuantifierRepository", () => {
    it("Repository: getByType", async () => {

        const quantifiera1 : Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifiera2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifieri1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifieri2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifieri3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifiero1 : Quantifier = new Quantifier("q6", QuantifierType.O);

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

    it("Repository: Add and getAll", async () => {

        const quantifiera1 : Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifiera2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifieri1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifieri2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifieri3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifiero1 : Quantifier = new Quantifier("q6", QuantifierType.O);

        QuantifierRepository.reset();

        QuantifierRepository.add(quantifiera1);
        QuantifierRepository.add(quantifiera2);

        QuantifierRepository.add(quantifieri1);
        QuantifierRepository.add(quantifieri2);
        QuantifierRepository.add(quantifieri3);

        QuantifierRepository.add(quantifiero1);

        expect(QuantifierRepository.getAll().length).toBe(6);


        const allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifiera1)).toBe(true);
        expect(checkExist(allQuantifier, quantifiera2)).toBe(true);


        expect(checkExist(allQuantifier, quantifieri1)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri2)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri3)).toBe(true);


        expect(checkExist(allQuantifier, quantifiero1)).toBe(true);

    })

    it("Repository: Remove", async () => {

        var quantifiera1 : Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifiera2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifieri1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifieri2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifieri3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifiero1 : Quantifier = new Quantifier("q6", QuantifierType.O);

        QuantifierRepository.reset();

        QuantifierRepository.add(quantifiera1);
        QuantifierRepository.add(quantifiera2);

        QuantifierRepository.add(quantifieri1);
        QuantifierRepository.add(quantifieri2);
        QuantifierRepository.add(quantifieri3);

        QuantifierRepository.add(quantifiero1);


        var allQuantifier = QuantifierRepository.getAll();


        quantifiera1 = search(allQuantifier, quantifiera1);
        QuantifierRepository.remove(quantifiera1);
        allQuantifier = QuantifierRepository.getAll();


        expect(checkExist(allQuantifier, quantifiera1)).toBe(false);
        expect(checkExist(allQuantifier, quantifiera2)).toBe(true);


        expect(checkExist(allQuantifier, quantifieri1)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri2)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri3)).toBe(true);


        expect(checkExist(allQuantifier, quantifiero1)).toBe(true);


        QuantifierRepository.remove(search(allQuantifier, quantifieri2));
        allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifiera1)).toBe(false);
        expect(checkExist(allQuantifier, quantifiera2)).toBe(true);


        expect(checkExist(allQuantifier, quantifieri1)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri2)).toBe(false);
        expect(checkExist(allQuantifier, quantifieri3)).toBe(true);


        expect(checkExist(allQuantifier, quantifiero1)).toBe(true);

        QuantifierRepository.remove(search(allQuantifier, quantifieri2));
        allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifiera1)).toBe(false);
        expect(checkExist(allQuantifier, quantifiera2)).toBe(true);


        expect(checkExist(allQuantifier, quantifieri1)).toBe(true);
        expect(checkExist(allQuantifier, quantifieri2)).toBe(false);
        expect(checkExist(allQuantifier, quantifieri3)).toBe(true);


        expect(checkExist(allQuantifier, quantifiero1)).toBe(true);

    })

})