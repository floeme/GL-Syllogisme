import React, { Fragment, useState } from "react"
import PolysyllogismMP from "../elements/polysyllogism/PolysyllogismMP"
import { Proposition } from "../../model/Proposition"
import { useTranslation } from "react-i18next"
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DraggableProvided,
} from "react-beautiful-dnd"
import { Syllogism } from "../../model/Syllogism"
import {check, CheckResults, getAllRules} from "../../model/Rule.ts";
import {Raa, Rlh, Rmt, Rn, Rnn, Rp, Rpp} from "../../model/RulesImpl.ts";
import ResultReport from "../elements/syllogism/Result.tsx";
import {RuuCheckbox} from "../elements/syllogism/RuuCheckbox.tsx";
import {LinkVerbTooltip} from "../elements/LinkVerbTooltip.tsx";
import {ToolbarButtons} from "../elements/syllogism/Toolbar.tsx";

export const Polysyllogism = () => {
	const [verb, setVerb] = useState("are")
    const [result, setResult] = useState<CheckResults | undefined>(undefined);
    const [messageKO, setMessageKO] = useState<string[]>([])
    const [checkRuu, setCheckRuu] = useState(true); // TODO temporary

    const [syllogism, setSyllogism] = useState<Syllogism>(new Syllogism())

    const { t } = useTranslation('translation', { keyPrefix: 'polysyllogism' })

    const [, updateState] = React.useState();
    // @ts-expect-error updateState({}) is considered as error
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const updateSyllogism = () => {
        forceUpdate()
    }

    const onDragEnd = (result: any) => {
        const { source, destination } = result
        syllogism.reorderProposition(source.index, destination.index)
        updateSyllogism()
    }

    const clearSyllogism = () => {
        setSyllogism(new Syllogism())

        setVerb("are")

        updateSyllogism()
    }

    const addProposition = () => {
        syllogism.addProposition(new Proposition())
        updateSyllogism()
    }

    const removeProposition = (index: number) => {
        syllogism.removeProposition(index)
        updateSyllogism()
    }

    const reorderPropositions = () => {
        syllogism.autoReorder()
        updateSyllogism()
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

        if(!isErrorMessage){
            if(!syllogism.hasValidStructure()){
                isErrorMessage = true
                messageKO.push(t("errorMessages.invalidStructure"))
            }
        }

        return !isErrorMessage
    }

    const checkSyllogism = () => {
        messageKO.splice(0)
        if (!validateInputs()) {
            syllogism.link = verb
        } else {
            setResult(checkRuu ?
                check(syllogism, getAllRules(), true) : check(syllogism, [Rmt, Rlh, Rnn, Rn, Raa, Rpp, Rp], true))
        }
        setMessageKO([...messageKO])

    }

    const syllogismSize : number = syllogism.getPropositions().length

    return (
        <div className="section-premises">
            <div className="button-row">
                <ToolbarButtons clearSyllogism={clearSyllogism} path="/docs/fr/Polysyllogism_Guide.pdf" />

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
                                                        {
                                                            syllogismSize - 1 != index &&
                                                            <label>Proposition {index + 1}</label>
                                                        }
                                                        {
                                                            syllogismSize - 1 == index &&
                                                            <label>Conclusion</label>
                                                        }
                                                    </div>

                                                    <div className="proposition">
                                                        <PolysyllogismMP
                                                            verb={verb}
                                                            setVerb={setVerb}
                                                            syllogism={syllogism}
                                                            proposition={proposition}
                                                        />
                                                        {syllogismSize > 3 && syllogismSize-1 != index &&(
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
                    <RuuCheckbox checked={checkRuu} onChange={setCheckRuu}/>
                    <button type="button" name="checkButton" onClick={checkSyllogism}>{t("buttons.check")}</button>
                </div>
                <ResultReport checkResults={result} inputErrors={messageKO} figure={syllogism.getFigure() ?? undefined} />
            </div>

            <LinkVerbTooltip/>
        </div>
    )
}

export default Polysyllogism
