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
}

function SyllogismPremises({ subject, setSubject, predicate, setPredicate, middle, setMiddle, figure, setFigure }: SyllogismPremisesProps) {
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
            <div className="syllogism-grid">
                {propositions.map((proposition, index) => (
                    <div
                        key={index}
                    >
                        <div
                            className="label-1"
                        >
                            <label>Proposition {index + 1}</label>
                        </div>
                        <div
                            className="proposition-1"
                        >
                            {proposition}
                        </div>
                    </div>
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

export default SyllogismPremises;
