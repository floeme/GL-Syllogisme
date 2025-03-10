import {Fragment, useCallback, useEffect, useState} from "react"
import SyllogismMP from "./SyllogismMP"
import { Syllogism } from "../../../../model/Syllogism"
import {getAllRules, check, CheckResults} from "../../../../model/Rule.ts"
import { Figure } from "../../../../model/Figure"
import { Term } from "../../../../model/Term"
import {defaultQuantifiers, Quantifier} from "../../../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";
import {RuuCheckbox} from "../RuuCheckbox.tsx";
import {Raa, Rlh, Rmt, Rn, Rnn, Rp, Rpp} from "../../../../model/RulesImpl.ts";
import ResultReport from "../Result.tsx";
import {ToolbarButtons} from "../Toolbar.tsx"
import {LinkVerbTooltip} from "../../LinkVerbTooltip.tsx";

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

    const [result, setResult] = useState<CheckResults | undefined>(undefined);
    const [messageKO, setMessageKO] = useState<string[]>([])

    const { t } = useTranslation(I18N_NS)

    const validateInputs = () => {
        let isErrorMessage = false

        if (middle.value === predicate.value || middle.value === subject.value || predicate.value === subject.value) {
            isErrorMessage = true
        }

        if (!prop3Quantifier) {
            messageKO.push(t("syllogism.expert.errorMessages.missingQuantifier") + 3)
            isErrorMessage = true
        }

        if (!prop2Quantifier) {
            messageKO.push(t("syllogism.expert.errorMessages.missingQuantifier") + 2)
            isErrorMessage = true
        }

        if (!prop1Quantifier) {
            messageKO.push(t("syllogism.expert.errorMessages.missingQuantifier") + 1)
            isErrorMessage = true
        }

        if (![Figure.Figure1, Figure.Figure2, Figure.Figure3, Figure.Figure4].includes(figure)) {
            messageKO.push("Veuillez renseigner une figure")
            isErrorMessage = true
        }

        if (!middle.value) {
            messageKO.push(t("syllogism.expert.errorMessages.missingVerb"))
            isErrorMessage = true
        }

        if (!predicate.value) {
            messageKO.push(t("syllogism.expert.errorMessages.missingPredicate"))
            isErrorMessage = true
        }

        if (!subject.value) {
            messageKO.push(t("syllogism.expert.errorMessages.missingSubject"))
            isErrorMessage = true
        }

        return !isErrorMessage
    }

    const checkSyllogism = () => {
        messageKO.splice(0)
        setResult(undefined)
        if (!validateInputs()) {
            syllogism.link = verb
        } else {
            setResult( checkRuu ?
                check(syllogism, getAllRules(), true) : check(syllogism, [Rmt, Rlh, Rnn, Rn, Raa, Rpp, Rp], true))
        }

        setMessageKO([...messageKO])
    }

    const clearSyllogism = () => {
        subject.value = ""
        setSubject({...subject})
        predicate.value = ""
        setPredicate({...predicate})
        middle.value = ""
        setMiddle({...middle})

        setVerb("")

        setProp1Quantifier(defaultQuantifiers.A)
        setProp2Quantifier(defaultQuantifiers.A)
        setProp3Quantifier(defaultQuantifiers.A)

        setFigure(Figure.Figure1)

    }

    const renderSyllogismMP1 = useCallback((figure: Figure) => {
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
    }, [middle.value, predicate.value, prop1Quantifier, setProp1Quantifier, setVerb, verb])

    const renderSyllogismMP2 = useCallback((figure: Figure) => {
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
    }, [middle.value, prop2Quantifier, setProp2Quantifier, setVerb, subject.value, verb])

    const renderSyllogismMP3 = useCallback((figure: Figure) => {
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
    }, [predicate.value, prop3Quantifier, setProp3Quantifier, setVerb, subject.value, verb])

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
            messageKO.splice(0)
            messageKO.push("Conflit - Les termes doivent être différents")
            setMessageKO(() => messageKO)
        }

        setPropositions([
            renderSyllogismMP1(figure),
            renderSyllogismMP2(figure),
            renderSyllogismMP3(figure)
        ])
    }, [figure, subject, predicate, middle, verb, renderSyllogismMP1, renderSyllogismMP2, renderSyllogismMP3, messageKO])

    const syllogismSize : number = syllogism.getPropositions().length

    return (
        <div className="section-premises">
            <div className="button-row">
                <ToolbarButtons clearSyllogism={clearSyllogism} path="/docs/fr/Expert_Guide.pdf" />
                <div className="switch-comp">
                    <label className="name1">{t("input.guided")}</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={expertMode}
                            onChange={() => {
                                clearSyllogism()
                                setExpertMode(!expertMode)
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
                            {
                                syllogismSize - 1 != index &&
                                <label>Proposition {index + 1}</label>
                            }
                            {
                                syllogismSize - 1 == index &&
                                <label>Conclusion</label>
                            }
                        </div>
                        <div className={"proposition-" + (index+1)}>
                            {proposition}
                        </div>
                    </Fragment>
                ))}

                <div className="hypothesis">
                    <RuuCheckbox checked={checkRuu} onChange={setCheckRuu}/>
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("input.check")}</button>
                </div>
                <ResultReport checkResults={result} inputErrors={messageKO}></ResultReport>
            </div>

            <LinkVerbTooltip/>
        </div>
    )
}

export default SyllogismPropositions
