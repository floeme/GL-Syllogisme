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
                return <div className="please-select">Please select a figure</div>;
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
                    <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}><img src="images/delete_icon.svg" alt="delete"></img></button>
                    <button type="button" name="helpButton" onClick={help}><img src="images/help_icon.svg" alt="help"></img></button>
                    <button type="button" name="settingsButton" onClick={goSettings}><img src="images/settings_icon.svg" alt="settings"></img></button>
            </div>

            <div className="syllogism-grid">

                <div className="label-1">
                    <label>Proposition 1</label>
                </div>
                <div className="label-2">
                    <label>Proposition 2</label>
                </div>
                <div className="label-3">
                    <label>Conclusion</label>
                </div>
                
                <div className="proposition-1">
                    {renderSyllogismMP1(figure)}  {/* METTRE sous forme de variable les 3 renders commeca ca cassera pas le css pour faire les changements d'ordres*/}
                </div>
                <div className="proposition-2">
                    {renderSyllogismMP2(figure)}
                </div>
                <div className="proposition-3">
                    {renderSyllogismMP3(figure)}
                </div>
                
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
