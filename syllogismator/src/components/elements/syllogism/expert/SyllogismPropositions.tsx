import { Fragment, useEffect, useState } from "react"
import SyllogismMP1 from "./SyllogismMP1"
import SyllogismMP2 from "./SyllogismMP2"
import SyllogismMP3 from "./SyllogismMP3"
import { Term } from "../../../../model/Term"
import { Quantifier } from "../../../../model/Quantifier"
import {RuuCheckbox} from "../RuuCheckbox.tsx";
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {Syllogism} from "../../../../model/Syllogism.ts";

interface SyllogismPremisesProps {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
    MP2FirstTerm: string
    setMP2FirstTerm: (value: string) => void
    MP2SecondTerm: string
    setMP2SecondTerm: (value: string) => void
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
}

function SyllogismPropositions({
    MP1FirstTerm, setMP1FirstTerm,
    MP1SecondTerm, setMP1SecondTerm,
    MP2FirstTerm, setMP2FirstTerm,
    MP2SecondTerm, setMP2SecondTerm,
    subject, setSubject,
    predicate, setPredicate,
    middle, setMiddle,
    expertMode, setExpertMode,
	prop1Quantifier, setProp1Quantifier,
	prop2Quantifier, setProp2Quantifier,
	prop3Quantifier, setProp3Quantifier,
	verb, setVerb,
    syllogism
}: SyllogismPremisesProps) {
    const [checkRuu, setCheckRuu] = useState(true); // TODO temporary

    const [inputErrorMessage, setInputErrorMessage] = useState("")
    const [errorMessage1, setErrorMessage1] = useState("")
    const [errorMessage2, setErrorMessage2] = useState("")

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

        // Figure 3
        if (MP1FirstTerm === MP2FirstTerm) {
            subject.value = MP2SecondTerm
            setSubject({...subject})
            middle.value = MP1FirstTerm
            setMiddle({...middle})
            predicate.value = MP1SecondTerm
            setPredicate({...predicate})
        }

        // Figure 1
        if (MP1FirstTerm === MP2SecondTerm) {
            subject.value = MP2FirstTerm
            setSubject({...subject})
            middle.value = MP1FirstTerm
            setMiddle({...middle})
            predicate.value = MP1SecondTerm
            setPredicate({...predicate})
        }

        // Figure 4
        if (MP1SecondTerm === MP2FirstTerm) {
            subject.value = MP2SecondTerm
            setSubject({...subject})
            middle.value = MP1SecondTerm
            setMiddle({...middle})
            predicate.value = MP1FirstTerm
            setPredicate({...predicate})
        }

        // Figure 2
        if (MP1SecondTerm === MP2SecondTerm) {
            subject.value = MP2FirstTerm
            setSubject({...subject})
            middle.value = MP1SecondTerm
            setMiddle({...middle})
            predicate.value = MP1FirstTerm
            setPredicate({...predicate})
        }
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, middle, predicate, setMiddle, setPredicate, setSubject, subject])

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

            syllogism.link = verb
        }

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
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, subject, predicate, middle, verb, setMP1FirstTerm, setMP1SecondTerm, prop1Quantifier, setProp1Quantifier, setVerb, setMP2FirstTerm, setMP2SecondTerm, prop2Quantifier, setProp2Quantifier, prop3Quantifier, setProp3Quantifier])

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
