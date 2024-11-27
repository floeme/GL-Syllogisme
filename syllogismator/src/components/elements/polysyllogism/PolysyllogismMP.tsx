import { Proposition } from "../../../model/Proposition"
import { useTranslation } from "react-i18next"
import QuantifierSelector from "../QuantifierSelector.tsx";
import {defaultQuantifiers, Quantifier} from "../../../model/Quantifier.ts";
import {Term} from "../../../model/Term.ts";
import {Syllogism} from "../../../model/Syllogism.ts";

interface PollysyllogismMPProps {
    verb: string
    setVerb: (value: string) => void
    proposition: Proposition
    onPropositionChange: (updatedProposition: Proposition) => void
    syllogism: Syllogism
}

function PolysyllogismMP({
    verb, setVerb,
    proposition, onPropositionChange,
    syllogism
}: PollysyllogismMPProps) {
    const { t } = useTranslation('translation', { keyPrefix: 'polysyllogism' })

    const setQuantifier = (quantifier : Quantifier): void => {
        proposition.quantifier = quantifier
        onPropositionChange(proposition)
    }

    if(proposition.quantifier === undefined) {
        proposition.quantifier = defaultQuantifiers.A
    }

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <QuantifierSelector quantifier={proposition.quantifier!} setPropQuantifier={setQuantifier} />
                </div>
                <div className="first-term">
                    <input
                        type="text"
                        name="firstTerm"
                        placeholder={t('placeholder.firstTerm')}
                        defaultValue={proposition.subject?.value}
                        onChange={(e) => {
                            let resTerm = null;
                            for(const term of syllogism.getTerms()) {
                                if(term.value===e.target.value) {
                                    resTerm = term
                                    break
                                }
                            }
                            if(resTerm == null)
                                resTerm = new Term(e.target.value)
                            proposition.subject = resTerm
                            onPropositionChange(proposition)
                        }}
                    />
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder={t('placeholder.verb')}
                        value={verb}
                        onChange={(e) => {
                            setVerb(e.target.value)
                        }}
                    />
                </div>

                <div className="second-term">
                    <input
                        type="text"
                        name="secondTerm"
                        placeholder={t('placeholder.secondTerm')}
                        defaultValue={proposition.predicate?.value}
                        onChange={(e) => {
                            let resTerm = null;
                            for(const term of syllogism.getTerms()) {
                                if(term.value===e.target.value) {
                                    resTerm = term
                                    break
                                }
                            }
                            if(resTerm == null)
                                resTerm = new Term(e.target.value)
                            proposition.predicate = resTerm
                            onPropositionChange(proposition)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PolysyllogismMP
