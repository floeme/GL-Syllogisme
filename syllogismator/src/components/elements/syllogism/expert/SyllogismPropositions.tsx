import { Fragment, useEffect, useState } from "react"
import SyllogismMP1 from "./SyllogismMP1"
import SyllogismMP2 from "./SyllogismMP2"
import SyllogismMP3 from "./SyllogismMP3"

interface SyllogismPremisesProps {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
    MP2FirstTerm: string
    setMP2FirstTerm: (value: string) => void
    MP2SecondTerm: string
    setMP2SecondTerm: (value: string) => void
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
    MP1FirstTerm, setMP1FirstTerm,
    MP1SecondTerm, setMP1SecondTerm,
    MP2FirstTerm, setMP2FirstTerm,
    MP2SecondTerm, setMP2SecondTerm,
    subject, setSubject,
    predicate, setPredicate,
    middle, setMiddle,
    figure, setFigure,
    expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier
}: SyllogismPremisesProps) {
    const [inputErrorMessage, setInputErrorMessage] = useState("")
    const [errorMessage1, setErrorMessage1] = useState("")
    const [errorMessage2, setErrorMessage2] = useState("")

    const handleTermConflict = (term1: string, term2: string) => {
        if (term1 === term2 && term1 !== "" && term2 !== "") {
            console.warn("Duplicate terms detected. Adjusting terms to ensure unique syllogism structure.")
            return true
        }
        return false
    }

    useEffect(() => {
        if (handleTermConflict(MP1FirstTerm, MP1SecondTerm)) {
            setErrorMessage1("Conflit - Proposition 1 : Les deux termes ne peuvent pas être identiques.")
        } else {
            setErrorMessage1("")
        }

        if (handleTermConflict(MP2FirstTerm, MP2SecondTerm)) {
            setErrorMessage2("Conflit - Proposition 2 : Les deux termes ne peuvent pas être identiques.")
        } else {
            setErrorMessage2("")
        }

        // Figure 3
        if (MP1FirstTerm === MP2FirstTerm) {
            setSubject(MP2SecondTerm)
            setMiddle(MP1FirstTerm)
            setPredicate(MP1SecondTerm)
            setFigure("figure3")
        }

        // Figure 1
        if (MP1FirstTerm === MP2SecondTerm) {
            setSubject(MP2FirstTerm)
            setMiddle(MP1FirstTerm)
            setPredicate(MP1SecondTerm)
            setFigure("figure1")
        }

        // Figure 4
        if (MP1SecondTerm === MP2FirstTerm) {
            setSubject(MP2SecondTerm)
            setMiddle(MP1SecondTerm)
            setPredicate(MP1FirstTerm)
            setFigure("figure4")
        }

        // Figure 2
        if (MP1SecondTerm === MP2SecondTerm) {
            setSubject(MP2FirstTerm)
            setMiddle(MP1SecondTerm)
            setPredicate(MP1FirstTerm)
            setFigure("figure2")
        }
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm])

    const validateInputs = () => {
        let isErrorMessage = false

        if (!MP2SecondTerm) {
            setInputErrorMessage("Veuillez renseigner un terme dans le quatrième champ")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!MP2FirstTerm) {
            setInputErrorMessage("Veuillez renseigner un terme dans le troisième champ")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!MP1SecondTerm) {
            setInputErrorMessage("Veuillez renseigner un terme dans le deuxième champ")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!MP1FirstTerm) {
            setInputErrorMessage("Veuillez renseigner un terme dans le premier champ")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!prop3Quantifier) {
            setInputErrorMessage("Veuillez renseigner le quantificateur de la troisième proposition")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!prop2Quantifier) {
            setInputErrorMessage("Veuillez renseigner le quantificateur de la deuxième proposition")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!prop1Quantifier) {
            setInputErrorMessage("Veuillez renseigner le quantificateur de la première proposition")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        return isErrorMessage
    }

    const checkSyllogism = () => {
        if (!validateInputs()) {

        }

        console.log("check")
    }

    const clearSyllogism = () => {
        setSubject("")
        setPredicate("")
        setMiddle("")
        setMP1FirstTerm("")
        setMP1SecondTerm("")
        setMP2FirstTerm("")
        setMP2SecondTerm("")
        console.log("clear")
    }

    const help = () => {
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const [propositions, setPropositions] = useState([
        <SyllogismMP1
            MP1FirstTerm={MP1FirstTerm}
            setMP1FirstTerm={setMP1FirstTerm}
            MP1SecondTerm={MP1SecondTerm}
            setMP1SecondTerm={setMP1SecondTerm}
            setProp1Quantifier={setProp1Quantifier}
        />,
        <SyllogismMP2
            MP1FirstTerm={MP1FirstTerm}
            MP1SecondTerm={MP1SecondTerm}
            MP2FirstTerm={MP2FirstTerm}
            setMP2FirstTerm={setMP2FirstTerm}
            MP2SecondTerm={MP2SecondTerm}
            setMP2SecondTerm={setMP2SecondTerm}
            setProp2Quantifier={setProp2Quantifier}
        />,
        <SyllogismMP3
            subject={subject}
            predicate={predicate}
            setProp3Quantifier={setProp3Quantifier}
        />
    ])

    useEffect(() => {
        setPropositions([
            <SyllogismMP1
                MP1FirstTerm={MP1FirstTerm}
                setMP1FirstTerm={setMP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                setMP1SecondTerm={setMP1SecondTerm}
                setProp1Quantifier={setProp1Quantifier}
            />,
            <SyllogismMP2
                MP1FirstTerm={MP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                MP2FirstTerm={MP2FirstTerm}
                setMP2FirstTerm={setMP2FirstTerm}
                MP2SecondTerm={MP2SecondTerm}
                setMP2SecondTerm={setMP2SecondTerm}
                setProp2Quantifier={setProp2Quantifier}
            />,
            <SyllogismMP3
                subject={subject}
                predicate={predicate}
                setProp3Quantifier={setProp3Quantifier}
            />
        ])
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, subject, predicate, middle])

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
                            onChange={() => setExpertMode(!expertMode)}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="name2">Expert</label>
                </div>
            </div>

            <div className="syllogism-grid">
                {errorMessage1 && <p style={{ color: "#fc9294" }}>{errorMessage1}</p>}
                {errorMessage2 && <p style={{ color: "#fc9294" }}>{errorMessage2}</p>}
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
                    {inputErrorMessage && <p style={{ color: "#fc9294" }}>{inputErrorMessage}</p>}
                    <button type="button" name="checkButton" onClick={checkSyllogism}>Check</button>
                </div>
            </div>
        </div>
    )
}

export default SyllogismPropositions
