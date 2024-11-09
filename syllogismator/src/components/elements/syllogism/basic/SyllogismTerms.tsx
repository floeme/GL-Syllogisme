import { Term } from "../../../../model/Term"

interface SyllogismTermsProps {
    subject: Term
    setSubject: (value: Term) => void
    middle: Term
    setMiddle: (value: Term) => void
    predicate: Term
    setPredicate: (value: Term) => void
}

function SyllogismTerms({
    subject, setSubject,
    middle, setMiddle,
    predicate, setPredicate
}: SyllogismTermsProps) {
    return (
        <div className="section-terms-input">
            {/* SUBJECT */}
            <label>Subject</label>
            <input type="text"
                name="SubjectTerm"
                placeholder="Enter a subject term"
                value={subject.value}
                onChange={(e) => {
                    subject.value = e.target.value
                    setSubject({...subject})
                }}
            />

            {/* PREDICATE */}
            <label>Predicate</label>
            <input type="text"
                name="predicateTerm"
                placeholder="Enter a predicate term"
                value={predicate.value}
                onChange={(e) => {
                    predicate.value = e.target.value
                    setPredicate({...predicate})
                }}
            />

            {/* MIDDLE */}
            <label>Middle Term</label>
            <input type="text"
                name="middleTerm"
                placeholder="Enter a middle term"
                value={middle.value}
                onChange={(e) => {
                    middle.value = e.target.value
                    setMiddle({...middle})
                }}
            />
      </div>
    )
}

export default SyllogismTerms
