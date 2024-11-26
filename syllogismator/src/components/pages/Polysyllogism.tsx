import { Fragment, useEffect, useState } from "react"
import PolysyllogismMP from "../elements/polysyllogism/PolysyllogismMP"
import { Proposition } from "../../model/Proposition"
import { Term } from "../../model/Term"
import { Quantifier } from "../../model/Quantifier"
import { QuantifierType } from "../../model/QuantifierType"
import { useTranslation } from "react-i18next"
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from "react-beautiful-dnd"
import { Syllogism } from "../../model/Syllogism"
import PolyModal from "../elements/modals/PolyModal"
import {check, CheckResults, getAllRules} from "../../model/Rule.ts";
import {Raa, Rlh, Rmt, Rn, Rnn, Rp, Rpp} from "../../model/RulesImpl.ts";
import ResultProposition from "../elements/syllogism/Result.tsx";
import {RuuCheckbox} from "../elements/syllogism/RuuCheckbox.tsx";

export const Polysyllogism = () => {
	const [verb, setVerb] = useState("are")
    const [result, setResult] = useState<CheckResults | undefined>(undefined);
    const [messageKO, setMessageKO] = useState<string[]>([])
    const [checkRuu, setCheckRuu] = useState(true); // TODO temporary

    const [syllogism, setSyllogism] = useState(new Syllogism())
    const [propositions, setPropositions] = useState([
        syllogism.getProposition(0),
        syllogism.getProposition(1),
        syllogism.getProposition(2)
    ])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    // Remplace les valeurs de base du syllogisme par les valeurs de base du composant
    useEffect(() => {
        rebuildPolysyllogism()
    }, []) // [] garantit que l'effet s'exécute une seule fois au chargement

    useEffect(() => {
        rebuildPolysyllogism()
    }, [propositions])

    const rebuildPolysyllogism = () => {
        const newSyllogism = new Syllogism()

        // Supprime les valeurs de base du syllogisme
        syllogism.getPropositions().forEach(() => {
            syllogism.removeProposition(0)
        })

        // Supprime les valeurs de base du newSyllogisme
        newSyllogism.getPropositions().forEach(() => {
            newSyllogism.removeProposition(0)
        })

        newSyllogism.removeProposition(-1)

        // Mettre les valeurs de base du composant dans le syllogisme
        propositions.forEach(proposition => {
            newSyllogism.addProposition(proposition)
        })

        setSyllogism(newSyllogism)
    }

    const { t } = useTranslation('translation', { keyPrefix: 'polysyllogism' })

    const onDragEnd = (result: any) => {
        const { source, destination } = result

        if (!destination)
            return

        const reorderedPropositions = [...propositions]
        const [removed] = reorderedPropositions.splice(source.index, 1)
        reorderedPropositions.splice(destination.index, 0, removed)

        setPropositions(reorderedPropositions)
    }

    const clearSyllogism = () => {
        setSyllogism(new Syllogism())

        setPropositions([
            syllogism.getProposition(0),
            syllogism.getProposition(1),
            syllogism.getProposition(2)
        ])

        setVerb("are")

        console.log("clear")
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const help = () => {
        setModalIsOpen(true)
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const updateProposition = (index: number, updatedProposition: Proposition) => {
        const newPropositions = [...propositions]
        newPropositions[index] = updatedProposition
        setPropositions(newPropositions)
    }

    const addProposition = () => {
        let proposition = Proposition.withTerms(
            new Quantifier("propQuantifier", QuantifierType.A),
            new Term("new term 1"),
            new Term("new term 2")
        )

        setPropositions([...propositions, proposition])

        syllogism.addProposition(proposition)
    }

    const removeProposition = (index: number) => {
        setPropositions(propositions.filter((_, i) => i !== index))
        syllogism.removeProposition(index)
    }

    const reorderPropositions = () => {
        syllogism.autoReorder()
    }

    const validateInputs = () => {
        let isErrorMessage = false

        let i = 0

        propositions.forEach(proposition => {
            if (!isErrorMessage) {
                ++i

                if (!proposition.quantifier?.type) {
                    messageKO.push(t("errorMessages.missingQuantifier") + i)
                    isErrorMessage = true
                } else if (!proposition.subject?.value) {
                    messageKO.push(t("errorMessages.missingSubject") + i)
                    isErrorMessage = true
                } else if (!verb) {
                    messageKO.push(t("errorMessages.missingVerb"))
                    isErrorMessage = true
                } else if (!proposition.predicate?.value) {
                    messageKO.push(t("errorMessages.missingPredicate") + i)
                    isErrorMessage = true
                }
            }
        })

        return !isErrorMessage
    }

    const checkSyllogism = () => {
        console.log("checkSyllogism")
        messageKO.splice(0)
        if (!validateInputs()) {
            syllogism.link = verb
        } else {
            setResult(checkRuu ?
                check(syllogism, getAllRules(), true) : check(syllogism, [Rmt, Rlh, Rnn, Rn, Raa, Rpp, Rp], true))
        }
        setMessageKO(() => messageKO)
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
                <PolyModal isOpen={modalIsOpen} onRequestClose={closeModal} path="/docs/fr/Polysyllogism_Guide.pdf" />
                <button type="button" name="settingsButton" onClick={goSettings}>
                    <img src="images/settings_icon.svg" alt="settings" />
                </button>
                <button type="button" name="addPropositionButton" onClick={addProposition}>{t("buttons.add")}</button>
                <button type="button" name="reorderButton" onClick={reorderPropositions}>{t("buttons.reorder")}</button>
            </div>

            <div className="polysyllogism-grid">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="propositions">
                        {(provided: DroppableProvided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {propositions.map((proposition, index) => (
                                    <Draggable key={index} draggableId={`proposition-${index}`} index={index}>
                                        {(provided: DraggableProvided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="hypothesis">
                    <label>{t("labels.existenceHypothesis")}</label>
                    <RuuCheckbox checked={checkRuu} onChange={setCheckRuu}/>
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("buttons.check")}</button>
                </div>
                <ResultProposition checkResult={result} messageKO={messageKO}></ResultProposition>
            </div>
        </div>
    )
}

export default Polysyllogism
