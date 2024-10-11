import SyllogismMP from "../elements/SyllogismMP";

function SyllogismPremises() {
    const checkSyllogism = () => {
        console.log("check");
    };

    const clearSyllogism = () => {
        console.log("clear");
    };

    const help = () => {
        console.log("help");
    };

    const goSettings = () => {
        console.log("goSettings");
    };

    return (
        <div className="section-premises">
            <div className="button-row">
                {/* clear syllogism button */}
                <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}>Clear</button>

                {/* help button */}
                <button type="button" name="helpButton" onClick={help}>Help</button>

                {/* settings redirection */}
                <button type="button" name="settingsButton" onClick={goSettings}>Settings</button>
            </div>

            <div className="syllogism-grid">
                {/* Proposition */}
                    <div className="proposition">
                        <label>Proposition</label>
                    </div>
                    <div className="syllogism-mp">
                        <SyllogismMP />
                    </div>

                {/* Proposition */}
                    <div className="proposition">
                        <label>Proposition</label>
                    </div>
                    <div className="syllogism-mp">
                        <SyllogismMP />
                    </div>

                {/* Conclusion */}
                    <div className="proposition">
                        <label>Conclusion</label>
                    </div>
                    <div className="syllogism-mp">
                        <SyllogismMP />
                    </div>

                {/* Existence Hypothesis and Check Button*/}
                <div className="hypothesis">
                    <label>Existence Hypothesis</label>
                    <input type="checkbox" name="existenceHypothesis" />
                    <button type="button" name="checkButton" onClick={checkSyllogism}>Check</button>
                </div>
            </div>
        </div>
    );
}

export default SyllogismPremises;
