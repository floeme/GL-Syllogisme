import {Fragment, useEffect, useState} from "react"
import SyllogismMP1 from "./SyllogismMP1"
import SyllogismMP2 from "./SyllogismMP2"
import SyllogismMP3 from "./SyllogismMP3"
import {Term} from "../../../../model/Term"
import {Quantifier} from "../../../../model/Quantifier"
import {RuuCheckbox} from "../RuuCheckbox.tsx";
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {Syllogism} from "../../../../model/Syllogism.ts";
import {check, CheckResults, getAllRules} from "../../../../model/Rule.ts";
import {Raa, Rlh, Rmt, Rn, Rnn, Rp, Rpp} from "../../../../model/RulesImpl.ts";
import {Figure} from "../../../../model/Figure.ts";

interface SyllogismPremisesProps {
    subject: Term
    setSubject: (value: Term) => void
    predicate: Term
    setPredicate: (value: Term) => void
    middle: Term
    setMiddle: (value: Term) => void
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
    syllogism: Syllogism
    figure: Figure
    setFigure: (value: Figure) => void
}

function SyllogismPropositions({
    subject, setSubject,
    predicate, setPredicate,
    middle, setMiddle,
    expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb,
    syllogism,
    figure, setFigure
}: SyllogismPremisesProps) {
    const [checkRuu, setCheckRuu] = useState(true); // TODO temporary

    const [inputErrorMessage, setInputErrorMessage] = useState("")
    const [errorMessage1, setErrorMessage1] = useState("")
    const [errorMessage2, setErrorMessage2] = useState("")

    const [MP1FirstTerm, setMP1FirstTerm] = useState("")
    const [MP1SecondTerm, setMP1SecondTerm] = useState("")
    const [MP2FirstTerm, setMP2FirstTerm] = useState("")
    const [MP2SecondTerm, setMP2SecondTerm] = useState("")

    const { t } = useTranslation(I18N_NS);

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

        const update = (subjectS : string, middleS : string, predicateS : string, figureS : Figure) => {
            if(subjectS !== subject.value){
                setSubject({...subject, value: subjectS})
            }
            if(middleS !== middle.value){
                setMiddle({...middle, value: middleS})
            }
            if(predicateS !== predicate.value){
                setPredicate({...predicate, value: predicateS})
            }
            if(figureS !== figure){
                setFigure(figureS)
            }
        }

        // Figure 3
        if (MP1FirstTerm === MP2FirstTerm) {
            update(MP2SecondTerm, MP1FirstTerm, MP1SecondTerm, Figure.Figure3)
        }else if (MP1FirstTerm === MP2SecondTerm) {
            // Figure 1
            update(MP2FirstTerm, MP1FirstTerm, MP1SecondTerm, Figure.Figure1)
        }else if (MP1SecondTerm === MP2FirstTerm) {
            // Figure 4
            update(MP2SecondTerm, MP1SecondTerm, MP1FirstTerm, Figure.Figure4)
        }else if (MP1SecondTerm === MP2SecondTerm) {
            // Figure 2
            update(MP2FirstTerm, MP1SecondTerm, MP1FirstTerm, Figure.Figure2)
        }

    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, figure, middle, predicate, setFigure, setMiddle, setPredicate, setSubject, subject])

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

        return !isErrorMessage
    }

    const checkSyllogism = () => {
        if (!validateInputs()) {

            syllogism.link = verb
        }else{
            const resultsCheck: CheckResults = checkRuu ? check(syllogism, getAllRules(), true) : check(syllogism, [Rmt, Rlh, Rnn, Rn, Raa, Rpp, Rp], true);

            let errorMessage = "";
            let containsErrors = false;

            resultsCheck.results.forEach((value, key) => {
                if (value.valid)
                    return;
                errorMessage = errorMessage + " Régle: " + key + " - Erreur: " + value.message;
                containsErrors = true
            })

            if (!containsErrors) {
                errorMessage = "Syllogisme ok"
            }

            setInputErrorMessage(errorMessage)

            console.log("check")
        }
    }

    const clearSyllogism = () => {
        subject.value = ""
        setSubject({...subject})
        predicate.value = ""
        setPredicate({...predicate})
        middle.value = ""
        setMiddle({...middle})

        setVerb("")

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
            quantifier={prop1Quantifier}
            setProp1Quantifier={setProp1Quantifier}
            verb={verb}
            setVerb={setVerb}
        />,
        <SyllogismMP2
            MP1FirstTerm={MP1FirstTerm}
            MP1SecondTerm={MP1SecondTerm}
            MP2FirstTerm={MP2FirstTerm}
            setMP2FirstTerm={setMP2FirstTerm}
            MP2SecondTerm={MP2SecondTerm}
            setMP2SecondTerm={setMP2SecondTerm}
            quantifier={prop2Quantifier}
            setProp2Quantifier={setProp2Quantifier}
            verb={verb}
            setVerb={setVerb}
        />,
        <SyllogismMP3
            subject={subject.value}
            predicate={predicate.value}
            quantifier={prop3Quantifier}
            setProp3Quantifier={setProp3Quantifier}
            verb={verb}
            setVerb={setVerb}
        />
    ])

    useEffect(() => {
        setPropositions([
            <SyllogismMP1
                MP1FirstTerm={MP1FirstTerm}
                setMP1FirstTerm={setMP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                setMP1SecondTerm={setMP1SecondTerm}
                quantifier={prop1Quantifier}
                setProp1Quantifier={setProp1Quantifier}
				verb={verb}
				setVerb={setVerb}
            />,
            <SyllogismMP2
                MP1FirstTerm={MP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                MP2FirstTerm={MP2FirstTerm}
                setMP2FirstTerm={setMP2FirstTerm}
                MP2SecondTerm={MP2SecondTerm}
                setMP2SecondTerm={setMP2SecondTerm}
                quantifier={prop2Quantifier}
                setProp2Quantifier={setProp2Quantifier}
				verb={verb}
				setVerb={setVerb}
            />,
            <SyllogismMP3
                subject={subject.value}
                predicate={predicate.value}
                quantifier={prop3Quantifier}
                setProp3Quantifier={setProp3Quantifier}
				verb={verb}
				setVerb={setVerb}
            />
        ])
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, predicate.value, prop1Quantifier, prop2Quantifier, prop3Quantifier, setMP1FirstTerm, setMP1SecondTerm, setMP2FirstTerm, setMP2SecondTerm, setProp1Quantifier, setProp2Quantifier, setProp3Quantifier, setVerb, subject.value, verb])

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
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                    <label className="name2">{t("input.expert")}</label>
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
                    <RuuCheckbox checked={checkRuu} onChange={setCheckRuu}/>
                    {inputErrorMessage && <p style={{ color: "#fc9294" }}>{inputErrorMessage}</p>}
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("input.check")}</button>
                </div>
            </div>
        </div>
    )
}

export default SyllogismPropositions
