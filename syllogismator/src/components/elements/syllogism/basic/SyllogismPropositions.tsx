import { Fragment, useEffect, useState } from "react"
import SyllogismMP from "./SyllogismMP"

interface SyllogismPremisesProps {
    subject: string
    setSubject: (value: string) => void
    predicate: string
    setPredicate: (value: string) => void
    middle: string
    setMiddle: (value: string) => void
    figure: string
    setFigure: (value: string) => void
    expertMode: boolean
    setExpertMode: (value: boolean) => void
    prop1Quantifier: string
    setProp1Quantifier: (value: string) => void
    prop2Quantifier: string
    setProp2Quantifier: (value: string) => void
    prop3Quantifier: string
    setProp3Quantifier: (value: string) => void
}

function SyllogismPropositions({
    subject, setSubject,
    predicate, setPredicate,
    middle, setMiddle,
    figure, setFigure,
    expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier
}: SyllogismPremisesProps) {
    const checkSyllogism = () => {
        console.log("check")
    }

    const clearSyllogism = () => {
        setSubject("")
        setPredicate("")
        setMiddle("")
        setFigure("")
        console.log("clear")
    }

    const help = () => {
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const renderSyllogismMP1 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure3":
                return <SyllogismMP firstTerm={middle} secondTerm={predicate} setPropQuantifier={setProp1Quantifier} />
            case "figure2":
            case "figure4":
                return <SyllogismMP firstTerm={predicate} secondTerm={middle} setPropQuantifier={setProp1Quantifier} />
            default:
                return <div>Please select a figure</div>
        }
    }

    const renderSyllogismMP2 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure2":
                return <SyllogismMP firstTerm={subject} secondTerm={middle} setPropQuantifier={setProp2Quantifier} />
            case "figure3":
            case "figure4":
                return <SyllogismMP firstTerm={middle} secondTerm={subject} setPropQuantifier={setProp2Quantifier} />
            default:
                return <div>Please select a figure</div>
        }
    }

    const renderSyllogismMP3 = (figure: string) => {
        switch (figure) {
            case "figure1":
            case "figure2":
            case "figure3":
            case "figure4":
                return <SyllogismMP firstTerm={subject} secondTerm={predicate} setPropQuantifier={setProp3Quantifier} />
            default:
                return <div>Please select a figure</div>
        }
    }

    const [propositions, setPropositions] = useState([
        renderSyllogismMP1(figure),
        renderSyllogismMP2(figure),
        renderSyllogismMP3(figure)
    ])

    useEffect(() => {
        setPropositions([
            renderSyllogismMP1(figure),
            renderSyllogismMP2(figure),
            renderSyllogismMP3(figure)
        ])
    }, [figure, subject, predicate, middle])

    return (
        <div className="section-premises">
            <div className="button-row">
                <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}><img src="images/delete_icon.svg" alt="delete"></img></button>
                <button type="button" name="helpButton" onClick={help}><img src="images/help_icon.svg" alt="help"></img></button>
                <button type="button" name="settingsButton" onClick={goSettings}><img src="images/settings_icon.svg" alt="settings"></img></button>
                <div className="switch-comp">
                    <label className="name1">Guided</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={expertMode}
                            onChange={() => {
                                setExpertMode(!expertMode)
                                setProp1Quantifier("")
                                setProp2Quantifier("")
                                setProp3Quantifier("")
                                setFigure("")
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="name2">Expert</label>
                </div>
            </div>

            <div className="syllogism-grid">
                {propositions.map((proposition, index) => (
                    <Fragment key={index}>
                        <div className={"label-" + (index+1)}>
                            <label>Proposition {index + 1}</label>
                        </div>
                        <div className={"proposition-" + (index+1)}>
                            {proposition}
                        </div>
                    </Fragment>
                ))}

                <div className="hypothesis">
                    <label>Existence Hypothesis</label>
                    <input type="checkbox" name="existenceHypothesis" />
                    <button type="button" name="checkButton" onClick={checkSyllogism}>Check</button>
                </div>
            </div>
        </div>
    )
}

export default SyllogismPropositions
