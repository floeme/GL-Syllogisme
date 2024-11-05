import {Term} from "../src/model/Term";

describe('Term', () => {
    it("Term test", async ()=>{
        const term : Term = new Term('test');
        expect(term.value).toBe('test');
    })
    it("Term test with set", async ()=>{
        const term : Term = new Term("test");

        expect(term.value).toBe('test');
        term.value = "nbeibu";
        expect(term.value).toBe('nbeibu');
    })
})