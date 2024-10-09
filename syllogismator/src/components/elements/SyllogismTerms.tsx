import { useNavigate } from "react-router-dom";

function SyllogismTerms() {
    const navigate = useNavigate();

    const goBack = () => {
        console.log("goBack")
        navigate("/polysyllogismes");
    };

    return (
        <div>
            {/* back button */}
            <button type="button" name="backButton" onClick={goBack}>Back</button>

            <br/>

            {/* label "subject" */}
            <label>Subject :</label>
            {/* input subject */}
            <input type="text" name="SubjectTerm" />

            {/* label "predicate" */}
            <label>Predicate :</label>
            {/* input predicate */}
            <input type="text" name="predicateTerm" />

            <br/>

            {/* label "medium" */}
            <label>Medium Term :</label>
            {/* input medium */}
            <input type="text" name="mediumTerm" />
      </div>
    )
}

export default SyllogismTerms
