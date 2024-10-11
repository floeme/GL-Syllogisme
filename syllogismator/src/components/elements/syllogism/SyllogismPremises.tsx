import SyllogismMP from "./SyllogismMP";

interface SyllogismPremisesProps {
    subject: string;
    predicate: string;
    middle: string;
    figure: string;
  }

function SyllogismPremises({ subject, predicate, middle, figure }: SyllogismPremisesProps) {
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

    const renderSyllogismMP1 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure3":
                return <SyllogismMP firstTerm={middle} secondTerm={predicate} />;
            case "figure2":
            case "figure4":
                return <SyllogismMP firstTerm={predicate} secondTerm={middle} />;
            default:
                return <div>Please select a figure</div>;
        }
    };

    const renderSyllogismMP2 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure2":
                return <SyllogismMP firstTerm={subject} secondTerm={middle} />;
            case "figure3":
            case "figure4":
                return <SyllogismMP firstTerm={middle} secondTerm={subject} />;
            default:
                return <div>Please select a figure</div>;
        }
    };

    const renderSyllogismMP3 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure2":
            case "figure3":
            case "figure4":
                return <SyllogismMP firstTerm={subject} secondTerm={predicate} />;
            default:
                return <div>Please select a figure</div>;
        }
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
                {/* Proposition 1 */}
                <div className="proposition">
                    <label>Proposition 1</label>
                </div>
                <div className="syllogism-mp">
                    {renderSyllogismMP1(figure)}
                </div>

                {/* Proposition 2 */}
                <div className="proposition">
                    <label>Proposition 2</label>
                </div>
                <div className="syllogism-mp">
                    {renderSyllogismMP2(figure)}
                </div>

                {/* Conclusion */}
                <div className="proposition">
                    <label>Conclusion</label>
                </div>
                <div className="syllogism-mp">
                    {renderSyllogismMP3(figure)}
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
