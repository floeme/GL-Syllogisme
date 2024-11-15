import { Fragment, useEffect, useState } from "react"
import SyllogismMP from "./SyllogismMP"
import { Syllogism } from "../../../../model/Syllogism"
import { Figure } from "../../../../model/Figure"
import { Term } from "../../../../model/Term"
import { Quantifier } from "../../../../model/Quantifier"
import { QuantifierType } from "../../../../model/QuantifierType"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {RuuCheckbox} from "../RuuCheckbox.tsx";

interface SyllogismPremisesProps {
    subject: Term
    setSubject: (value: Term) => void
    predicate: Term
    setPredicate: (value: Term) => void
    middle: Term
    setMiddle: (value: Term) => void
    figure: Figure
    setFigure: (value: Figure) => void
    expertMode: boolean
    setExpertMode: (value: boolean) => void
    prop1Quantifier: Quantifier
    setProp1Quantifier: (value: Quantifier) => void
    prop2Quantifier: Quantifier
    setProp2Quantifier: (value: Quantifier) => void
    prop3Quantifier: Quantifier
    setProp3Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
    syllogism : Syllogism
}

function SyllogismPropositions({
    subject, setSubject,
    predicate, setPredicate,
    middle, setMiddle,
    figure, setFigure,
    expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb,
    syllogism
}: SyllogismPremisesProps) {
    const [checkRuu, setCheckRuu] = useState(true); // TODO temporary

    const [inputErrorMessage, setInputErrorMessage] = useState("")

    const { t } = useTranslation(I18N_NS);

    const validateInputs = () => {
        let isErrorMessage = false

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

        if (![Figure.Figure1, Figure.Figure2, Figure.Figure3, Figure.Figure4].includes(figure)) {
            setInputErrorMessage("Veuillez renseigner une figure")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!middle.value) {
            setInputErrorMessage("Veuillez renseigner un moyen terme")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!predicate.value) {
            setInputErrorMessage("Veuillez renseigner un prédicat")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        if (!subject.value) {
            setInputErrorMessage("Veuillez renseigner un sujet")
            isErrorMessage = true
        } else if (!isErrorMessage) {
            setInputErrorMessage("")
        }

        return isErrorMessage
    }

    const checkSyllogism = () => {
        if (!validateInputs()) {
            syllogism.link = verb
            // res = syllogism.check()

            // if (res["rmt"]["validation"] == false) {
            //     // mettre le msg d'erreur res["rmt"]["errorMessage"]
            // } else {

            // }
        }

        // {
        //     "rmt":
        //         "validity": "false",
        //         "errorMessage": ""
        //     "rlh":
        //         "validity": "false",
        //         "errorMessage": ""
        // }

        console.log("check")
    }

    const clearSyllogism = () => {
        subject.value = ""
        setSubject({...subject})
        predicate.value = ""
        setPredicate({...predicate})
        middle.value = ""
        setMiddle({...middle})

        setVerb("")

        setFigure(Figure.Figure1)

        console.log("clear")
    }

    const help = () => {
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const renderSyllogismMP1 = (figure: Figure) => {
        switch (figure) {
            case Figure.Figure1:
            case Figure.Figure3:
                return <SyllogismMP
                        firstTerm={middle.value}
                        secondTerm={predicate.value}
                        quantifier={prop1Quantifier}
                        setPropQuantifier={setProp1Quantifier}
                        verb={verb}
                        setVerb={setVerb}
                    />
            case Figure.Figure2:
            case Figure.Figure4:
                return <SyllogismMP
                        firstTerm={predicate.value}
                        secondTerm={middle.value}
                        quantifier={prop1Quantifier}
                        setPropQuantifier={setProp1Quantifier}
                        verb={verb}
                        setVerb={setVerb}
                    />
            default:
                return <div>Please select a figure</div>
        }
    }

    const renderSyllogismMP2 = (figure: Figure) => {
        switch (figure) {
            case Figure.Figure1:
            case Figure.Figure2:
                return <SyllogismMP
                        firstTerm={subject.value}
                        secondTerm={middle.value}
                        quantifier={prop2Quantifier}
                        setPropQuantifier={setProp2Quantifier}
                        verb={verb}
                        setVerb={setVerb}
                    />
            case Figure.Figure3:
            case Figure.Figure4:
                return <SyllogismMP
                        firstTerm={middle.value}
                        secondTerm={subject.value}
                        quantifier={prop2Quantifier}
                        setPropQuantifier={setProp2Quantifier}
                        verb={verb}
                        setVerb={setVerb}
                    />
            default:
                return <div>Please select a figure</div>
        }
    }

    const renderSyllogismMP3 = (figure: Figure) => {
        switch (figure) {
            case Figure.Figure1:
            case Figure.Figure2:
            case Figure.Figure3:
            case Figure.Figure4:
                return <SyllogismMP
                        firstTerm={subject.value}
                        secondTerm={predicate.value}
                        quantifier={prop3Quantifier}
                        setPropQuantifier={setProp3Quantifier}
                        verb={verb}
                        setVerb={setVerb}
                    />
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
        if ((subject.value !== "" && predicate.value !== "" && middle.value !== "") &&
            (subject.value === predicate.value ||
            subject.value === middle.value ||
            predicate.value === middle.value)
        ) {
            setInputErrorMessage("Conflit - Les termes doivent être différents")
        } else {
            setInputErrorMessage("")
        }

        setPropositions([
            renderSyllogismMP1(figure),
            renderSyllogismMP2(figure),
            renderSyllogismMP3(figure)
        ])
    }, [figure, subject, predicate, middle, verb])

    return (
        <div className="section-premises">
            <div className="button-row">
                <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}><img src="images/delete_icon.svg" alt="delete"></img></button>
                <button type="button" name="helpButton" onClick={help}><img src="images/help_icon.svg" alt="help"></img></button>
                <button type="button" name="settingsButton" onClick={goSettings}><img src="images/settings_icon.svg" alt="settings"></img></button>
                <div className="switch-comp">
                    <label className="name1">{t("input.guided")}</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={expertMode}
                            onChange={() => {
                                setExpertMode(!expertMode)
                                prop1Quantifier.type = QuantifierType.A
                                setProp1Quantifier({...prop1Quantifier})
                                prop2Quantifier.type = QuantifierType.A
                                setProp2Quantifier({...prop2Quantifier})
                                prop3Quantifier.type = QuantifierType.A
                                setProp3Quantifier({...prop3Quantifier})
                                setFigure(Figure.Figure1)
                                setVerb("")
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="name2">{t("input.expert")}</label>
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
                    <RuuCheckbox checked={checkRuu} onChange={setCheckRuu}/>
                    {inputErrorMessage && <p style={{ color: "#fc9294" }}>{inputErrorMessage}</p>}
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("input.check")}</button>
                </div>
            </div>
        </div>
    )
}

export default SyllogismPropositions
