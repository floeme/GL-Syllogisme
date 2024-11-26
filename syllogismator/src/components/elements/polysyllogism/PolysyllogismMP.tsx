import { Proposition } from "../../../model/Proposition"
import { useTranslation } from "react-i18next"
import QuantifierSelector from "../QuantifierSelector.tsx";
import {defaultQuantifiers, Quantifier} from "../../../model/Quantifier.ts";
import {Term} from "../../../model/Term.ts";

interface PollysyllogismMPProps {
    verb: string
    setVerb: (value: string) => void
    proposition: Proposition
    onPropositionChange: (updatedProposition: Proposition) => void
}

function PolysyllogismMP({
    verb, setVerb,
    proposition, onPropositionChange
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
                            if(proposition.subject == undefined)
                                proposition.subject = new Term(e.target.value)
                            proposition.subject!.value = e.target.value
                            onPropositionChange(proposition)
                        }}
                    />
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder={t('placeholder.verb')}
                        defaultValue={verb}
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
                            if(proposition.predicate == undefined)
                                proposition.predicate = new Term(e.target.value)
                            proposition.predicate!.value = e.target.value
                            onPropositionChange(proposition)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PolysyllogismMP
