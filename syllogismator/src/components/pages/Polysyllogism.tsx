import { Fragment, useState } from "react"
import PolysyllogismMP from "../elements/polysyllogism/PolysyllogismMP"
import { Proposition } from "../../model/Proposition"
import { Term } from "../../model/Term"
import { Quantifier } from "../../model/Quantifier"
import { QuantifierType } from "../../model/QuantifierType"
import { useTranslation } from "react-i18next"

export const Polysyllogism = () => {
    const [inputErrorMessage, setInputErrorMessage] = useState("")
	const [verb, setVerb] = useState("are")

    const { t } = useTranslation('translation', { keyPrefix: 'polysyllogism' })

    const validateInputs = () => {
        let isErrorMessage = false

        let i = 0;

        propositions.forEach(proposition => {
            if (!isErrorMessage) {
                ++i

                if (!proposition.quantifier?.type) {
                    setInputErrorMessage(t("errorMessages.missingQuantifier", { index: i }));
                    isErrorMessage = true;
                } else if (!proposition.subject?.value) {
                    setInputErrorMessage(t("errorMessages.missingSubject"));
                    isErrorMessage = true;
                } else if (!verb) {
                    setInputErrorMessage(t("errorMessages.missingVerb", { index: i }));
                    isErrorMessage = true;
                } else if (!proposition.predicate?.value) {
                    setInputErrorMessage(t("errorMessages.missingPredicate", { index: i }));
                    isErrorMessage = true;
                }
            }
        });

        return isErrorMessage
    }

    const checkSyllogism = () => {
        if (!validateInputs()) {
            console.log("check")
        }
    }

    const clearSyllogism = () => {
        setPropositions([
            Proposition.withTerms(
                new Quantifier("prop1Quantifier", QuantifierType.A),
                new Term("Term 1"),
                new Term("Term 2")
            ),
            Proposition.withTerms(
                new Quantifier("prop1Quantifier", QuantifierType.A),
                new Term("Term 3"),
                new Term("Term 4")
            ),
            Proposition.withTerms(
                new Quantifier("prop1Quantifier", QuantifierType.A),
                new Term("Term 5"),
                new Term("Term 6")
            )
        ])

        setVerb("are")

        console.log("clear")
    }

    const help = () => {
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const [propositions, setPropositions] = useState([
        Proposition.withTerms(
            new Quantifier("prop1Quantifier", QuantifierType.A),
            new Term("Homme"),
            new Term("Mortel")
        ),
        Proposition.withTerms(
            new Quantifier("prop1Quantifier", QuantifierType.A),
            new Term("Socrate"),
            new Term("Homme")
        ),
        Proposition.withTerms(
            new Quantifier("prop1Quantifier", QuantifierType.A),
            new Term("Socrate"),
            new Term("Mortel")
        )
    ])

    const updateProposition = (index: number, updatedProposition: Proposition) => {
        const newPropositions = [...propositions]
        newPropositions[index] = updatedProposition
        setPropositions(newPropositions)
        console.log(propositions)
    }

    const addProposition = () => {
        let proposition = Proposition.withTerms(
            new Quantifier("prop1Quantifier", QuantifierType.A),
            new Term("new term 1"),
            new Term("new term 2")
        )

        setPropositions([...propositions, proposition])
    }

    const removeProposition = (index: number) => {
        setPropositions(propositions.filter((_, i) => i !== index));
    }

    const reorderPropositions = () => {
        // reorderProposition(fromIndex: number, toIndex: number) FROM syllogism.ts
    }

    return (
        <div className="section-premises">
            <div className="button-row">
                <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}>
                    <img src="images/delete_icon.svg" alt="delete" />
                </button>
                <button type="button" name="helpButton" onClick={help}>
                    <img src="images/help_icon.svg" alt="help" />
                </button>
                <button type="button" name="settingsButton" onClick={goSettings}>
                    <img src="images/settings_icon.svg" alt="settings" />
                </button>
                <button type="button" name="addPropositionButton" onClick={addProposition}>{t("buttons.add")}</button>
                <button type="button" name="reorderButton" onClick={reorderPropositions}>{t("buttons.reorder")}</button>
            </div>

            <div className="polysyllogism-grid">
                {propositions.map((proposition, index) => (
                    <Fragment key={index}>
                        <div className="label">
                            <label>Proposition {index + 1}</label>
                        </div>

                        <div className="proposition">
                            <PolysyllogismMP
                                verb={verb}
                                setVerb={setVerb}
                                proposition={proposition}
                                onPropositionChange={(updatedProposition) =>
                                    updateProposition(index, updatedProposition)
                                }
                            />

                            {index >= 3 && (
                                <button onClick={() => removeProposition(index)}>🗑️</button>
                            )}
                        </div>
                    </Fragment>
                ))}

                <div className="hypothesis">
                    <label>{t("labels.existenceHypothesis")}</label>
                    <input type="checkbox" name="existenceHypothesis" />
                    {inputErrorMessage && <p style={{ color: "#fc9294" }}>{inputErrorMessage}</p>}
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("buttons.check")}</button>
                </div>
            </div>
        </div>
    )
}

export default Polysyllogism
