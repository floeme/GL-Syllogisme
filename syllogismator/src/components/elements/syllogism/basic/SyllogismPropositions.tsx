import { useEffect, useState } from "react";
import SyllogismMP from "./SyllogismMP";

interface SyllogismPremisesProps {
    subject: string;
    setSubject: (value: string) => void;
    predicate: string;
    setPredicate: (value: string) => void;
    middle: string;
    setMiddle: (value: string) => void;
    figure: string;
    setFigure: (value: string) => void;
    expertMode: boolean;
    setExpertMode: (value: boolean) => void;
}

function SyllogismPropositions({ subject, setSubject, predicate, setPredicate, middle, setMiddle, figure, setFigure, expertMode, setExpertMode }: SyllogismPremisesProps) {
    const checkSyllogism = () => {
        console.log("check");
    };

    const clearSyllogism = () => {
        setSubject("");
        setPredicate("");
        setMiddle("");
        setFigure("");
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

    const [propositions, setPropositions] = useState([
        renderSyllogismMP1(figure),
        renderSyllogismMP2(figure),
        renderSyllogismMP3(figure)
    ]);

    useEffect(() => {
        setPropositions([
            renderSyllogismMP1(figure),
            renderSyllogismMP2(figure),
            renderSyllogismMP3(figure)
        ]);
    }, [figure, subject, predicate, middle]);

    return (
        <div className="section-premises">
            <div className="button-row">
                    <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}><img src="images/delete_icon.svg" alt="delete"></img></button>
                    <button type="button" name="helpButton" onClick={help}><img src="images/help_icon.svg" alt="help"></img></button>
                    <button type="button" name="settingsButton" onClick={goSettings}><img src="images/settings_icon.svg" alt="settings"></img></button>
                    <label>Guided</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={expertMode}
                            onChange={() => setExpertMode(!expertMode)}
                        />
                        <span className="slider"></span>
                    </label>
                    <label>Expert</label>
                </div>

            <div className="syllogism-grid">
                {propositions.map((proposition, index) => (
                    <
                    >
                        <div
                            className={"label-" + (index+1)}
                        >
                            <label>Proposition {index + 1}</label>
                        </div>
                        <div
                            className={"proposition-" + (index+1)}
                        >
                            {proposition}
                        </div>
                    </>
                ))}

                <div className="hypothesis">
                    <label>Existence Hypothesis</label>
                    <input type="checkbox" name="existenceHypothesis" />
                    <button type="button" name="checkButton" onClick={checkSyllogism}>Check</button>
                </div>
            </div>
        </div>
    );
}

export default SyllogismPropositions;
