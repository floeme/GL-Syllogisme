import { Fragment, useState } from "react"
import PolysyllogismMP from "../elements/polysyllogism/PolysyllogismMP"
import { Proposition } from "../../model/Proposition"
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
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const { t } = useTranslation('translation', { keyPrefix: 'polysyllogism' })

    const onDragEnd = (result: any) => {
        const { source, destination } = result

        syllogism.reorderProposition(source, destination)
    }

    const clearSyllogism = () => {
        setSyllogism(new Syllogism())

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

    const updateProposition = () => {
        setSyllogism(syllogism)
    }

    const addProposition = () => {
        syllogism.addProposition(new Proposition())
    }

    const removeProposition = (index: number) => {
        syllogism.removeProposition(index)
    }

    const reorderPropositions = () => {
        syllogism.autoReorder()
    }

    const validateInputs = () => {
        let isErrorMessage = false

        let i = 0

        syllogism.getPropositions().forEach(proposition => {
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
                                {syllogism.getPropositions().map((proposition, index) => (
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
                                                            onPropositionChange={() =>
                                                                updateProposition()
                                                            }
                                                            syllogism={syllogism}
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
