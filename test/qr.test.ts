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

        const quantifierA1 : Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifierA2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifierI1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifierI2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifierI3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifierO1 : Quantifier = new Quantifier("q6", QuantifierType.O);

        QuantifierRepository.reset();

        QuantifierRepository.add(quantifierA1);
        QuantifierRepository.add(quantifierA2);

        QuantifierRepository.add(quantifierI1);
        QuantifierRepository.add(quantifierI2);
        QuantifierRepository.add(quantifierI3);

        QuantifierRepository.add(quantifierO1);

        expect(QuantifierRepository.getByType(QuantifierType.A).length).toBe(2)
        expect(QuantifierRepository.getByType(QuantifierType.E).length).toBe(0)
        expect(QuantifierRepository.getByType(QuantifierType.I).length).toBe(3)
        expect(QuantifierRepository.getByType(QuantifierType.O).length).toBe(1)

    })

    it("Repository: Add and getAll", async () => {

        const quantifierA1 : Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifierA2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifierI1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifierI2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifierI3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifierO1 : Quantifier = new Quantifier("q6", QuantifierType.O);

        QuantifierRepository.reset();

        QuantifierRepository.add(quantifierA1);
        QuantifierRepository.add(quantifierA2);

        QuantifierRepository.add(quantifierI1);
        QuantifierRepository.add(quantifierI2);
        QuantifierRepository.add(quantifierI3);

        QuantifierRepository.add(quantifierO1);

        expect(QuantifierRepository.getAll().length).toBe(6);


        const allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifierA1)).toBe(true);
        expect(checkExist(allQuantifier, quantifierA2)).toBe(true);


        expect(checkExist(allQuantifier, quantifierI1)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI2)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI3)).toBe(true);


        expect(checkExist(allQuantifier, quantifierO1)).toBe(true);

    })

    it("Repository: Remove", async () => {

        let quantifierA1: Quantifier = new Quantifier("q1", QuantifierType.A);
        const quantifierA2 : Quantifier = new Quantifier("q2", QuantifierType.A);

        const quantifierI1 : Quantifier = new Quantifier("q3", QuantifierType.I);
        const quantifierI2 : Quantifier = new Quantifier("q4", QuantifierType.I);
        const quantifierI3 : Quantifier = new Quantifier("q5", QuantifierType.I);

        const quantifierO1 : Quantifier = new Quantifier("q6", QuantifierType.O);

        QuantifierRepository.reset();

        QuantifierRepository.add(quantifierA1);
        QuantifierRepository.add(quantifierA2);

        QuantifierRepository.add(quantifierI1);
        QuantifierRepository.add(quantifierI2);
        QuantifierRepository.add(quantifierI3);

        QuantifierRepository.add(quantifierO1);


        let allQuantifier = QuantifierRepository.getAll();


        quantifierA1 = search(allQuantifier, quantifierA1);
        QuantifierRepository.remove(quantifierA1);
        allQuantifier = QuantifierRepository.getAll();


        expect(checkExist(allQuantifier, quantifierA1)).toBe(false);
        expect(checkExist(allQuantifier, quantifierA2)).toBe(true);


        expect(checkExist(allQuantifier, quantifierI1)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI2)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI3)).toBe(true);


        expect(checkExist(allQuantifier, quantifierO1)).toBe(true);


        QuantifierRepository.remove(search(allQuantifier, quantifierI2));
        allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifierA1)).toBe(false);
        expect(checkExist(allQuantifier, quantifierA2)).toBe(true);


        expect(checkExist(allQuantifier, quantifierI1)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI2)).toBe(false);
        expect(checkExist(allQuantifier, quantifierI3)).toBe(true);


        expect(checkExist(allQuantifier, quantifierO1)).toBe(true);

        QuantifierRepository.remove(search(allQuantifier, quantifierI2));
        allQuantifier = QuantifierRepository.getAll();

        expect(checkExist(allQuantifier, quantifierA1)).toBe(false);
        expect(checkExist(allQuantifier, quantifierA2)).toBe(true);


        expect(checkExist(allQuantifier, quantifierI1)).toBe(true);
        expect(checkExist(allQuantifier, quantifierI2)).toBe(false);
        expect(checkExist(allQuantifier, quantifierI3)).toBe(true);


        expect(checkExist(allQuantifier, quantifierO1)).toBe(true);

    })

})