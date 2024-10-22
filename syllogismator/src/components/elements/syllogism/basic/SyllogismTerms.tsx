interface SyllogismTermsProps {
    subject: string
    setSubject: (value: string) => void
    predicate: string
    setPredicate: (value: string) => void
    middle: string
    setMiddle: (value: string) => void
    figure: string
    setFigure: (value: string) => void
}

function SyllogismTerms({ subject, setSubject, middle, setMiddle, predicate, setPredicate }: SyllogismTermsProps) {
    return (
        <div className="section-terms-input">
            {/* SUBJECT */}
            <label>Subject</label>
            <input type="text"
                name="SubjectTerm"
                placeholder="Enter a subject term"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            {/* PREDICATE */}
            <label>Predicate</label>
            <input type="text"
                name="predicateTerm"
                placeholder="Enter a predicate term"
                value={predicate}
                onChange={(e) => setPredicate(e.target.value)}
            />

            {/* MIDDLE */}
            <label>Middle Term</label>
            <input type="text"
                name="middleTerm"
                placeholder="Enter a middle term"
                value={middle}
                onChange={(e) => setMiddle(e.target.value)}
            />
      </div>
    )
}

export default SyllogismTerms
