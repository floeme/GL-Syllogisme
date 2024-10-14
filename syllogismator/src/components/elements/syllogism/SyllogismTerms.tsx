interface SyllogismTermsProps {
    setSubject: (value: string) => void;
    setPredicate: (value: string) => void;
    setMiddle: (value: string) => void;
}

function SyllogismTerms({ setSubject, setPredicate, setMiddle }: SyllogismTermsProps) {
    return (
        <div className="section-terms-input">
            {/* SUBJECT */}
            <label>Subject</label>
            <input type="text"
                name="SubjectTerm"
                placeholder="Enter a subject term"
                onChange={(e) => setSubject(e.target.value)}
            />

            {/* PREDICATE */}
            <label>Predicate</label>
            <input type="text"
                name="predicateTerm"
                placeholder="Enter a predicate term"
                onChange={(e) => setPredicate(e.target.value)}
            />

            {/* MIDDLE */}
            <label>Middle Term</label>
            <input type="text"
                name="middleTerm"
                placeholder="Enter a middle term"
                onChange={(e) => setMiddle(e.target.value)}
            />
      </div>
    )
}

export default SyllogismTerms
