import SyllogismMP from "../elements/SyllogismMP";

function SyllogismPremises() {
    const checkSyllogism = () => {
        console.log("check")
    };

    const clearSyllogism = () => {
        console.log("clear")
    };

    const help = () => {
        console.log("clear")
    };

    const goSettings = () => {
        console.log("goSettings")
    };

    return (
        <div className="section-premises">
            {/* clear syllogism button */}
            <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}>Clear</button>

            {/* help button */}
            <button type="button" name="helpButton" onClick={help}>Help</button>

            {/* settings redirection */}
            <button type="button" name="settingsButton" onClick={goSettings}>Settings</button>

            <br/>

            {/* label "Proposition" */}
            <label>Proposition :</label>
            <SyllogismMP />

            <br/>

            {/* label "Proposition" */}
            <label>Premise :</label>
            <SyllogismMP />

            <br/>

            {/* label "Conclusion" */}
            <label>Conclusion :</label>
            <SyllogismMP />

            <br/>

            {/* label "Existence hypothesis" */}
            <label>Existence hypothesis</label>
            {/* checkbox existence hypothesis */}
            <input type="checkbox" name="existenceHypothesis" />
            {/* check syllogism button */}
            <button type="button" name="checkButton" onClick={checkSyllogism}>Check Syllogism</button>
        </div>
    )
}

export default SyllogismPremises
