import {Term} from "../src/model/Term";

describe('Term', () => {
    it("Term test", async ()=>{
        const term : Term = new Term('t1');
        expect(term.value).toBe('t1');
    })
    it("Term test with set", async ()=>{
        const term : Term = new Term("t1");

        expect(term.value).toBe('t1');
        term.value = "t2";
        expect(term.value).toBe('t2');
    })
})