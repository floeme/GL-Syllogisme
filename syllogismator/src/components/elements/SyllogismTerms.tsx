function SyllogismTerms() {
    return (
        <>
            {/* SUBJECT */}
            <label>Subject :</label>
            <input type="text" name="SubjectTerm" placeholder="Enter a subject term" />

            {/* PREDICATE */}
            <label>Predicate :</label>
            <input type="text" name="predicateTerm" placeholder="Enter a predicate term" />

            {/* MEDIUM */}
            <label>Medium Term :</label>
            <input type="text" name="mediumTerm" placeholder="Enter a medium term" />
      </>
    )
}

export default SyllogismTerms
