import { useTranslation } from "react-i18next"
import {
    DEFAULT_QUANTIFIERS_I18N_NAMESPACE,
    defaultQuantifiers,
    isDefaultQuantifierName
} from "../../../model/Quantifier.ts";
import {Term} from "../../../model/Term.ts";
import {Syllogism} from "../../../model/Syllogism.ts";
import {Proposition} from "../../../model/Proposition.ts";
import React, {useContext} from "react";
import QuantifierContext from "../../../contexts/QuantifierContext.tsx";
import {QuantifierType} from "../../../model/QuantifierType.ts";
import {I18N_NS} from "../../../i18n.ts";

interface PollysyllogismMPProps {
    verb: string
    setVerb: (value: string) => void
    syllogism: Syllogism
    proposition: Proposition
}

function PolysyllogismMP({
    verb, setVerb,

    syllogism, proposition
}: PollysyllogismMPProps) {
    const { t } = useTranslation(I18N_NS)
    const { quantifiers } = useContext(QuantifierContext)

    if(proposition.quantifier === undefined) {
        proposition.quantifier = defaultQuantifiers.A
    }

    const [, updateState] = React.useState();
    // @ts-expect-error updateState({}) is considered as error
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const update = () => {
        forceUpdate()
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const name = selectedOption.getAttribute("value") as string;

        for(const q of quantifiers){
            if(q.name === name){
                proposition.quantifier = q
                forceUpdate()
                break
            }
        }
    }

    const quantifierTypes = [QuantifierType.A, QuantifierType.E, QuantifierType.I, QuantifierType.O];

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <select onChange={handleChange} value={proposition.quantifier.name}>
                        { // Grouping quantifiers by type
                            quantifierTypes.map((type) => (
                                <optgroup key={type.code} label={`${type.code} – ${t(DEFAULT_QUANTIFIERS_I18N_NAMESPACE+"."+type.code)}`}>
                                    {quantifiers.filter((quantifier) => quantifier.type === type)
                                        .map((mapQuantifier, index) => (
                                            <option key={index} data-group={type.code} value={mapQuantifier.name}>
                                                {isDefaultQuantifierName(mapQuantifier.name) ? t(DEFAULT_QUANTIFIERS_I18N_NAMESPACE+"."+mapQuantifier.name) : mapQuantifier.name}
                                            </option>
                                        ))
                                    }
                                </optgroup>
                            ))
                        }
                    </select>
                </div>
                <div className="first-term">
                    <input
                        type="text"
                        name="firstTerm"
                        id={proposition.subject?.value}
                        placeholder={t('polysyllogism.placeholder.firstTerm')}
                        value={proposition.subject == undefined ? "" : proposition.subject?.value}
                        onChange={(e) => {
                            let resTerm = null;
                            for (const term of syllogism.getTerms()) {
                                if (term.value === e.target.value) {
                                    resTerm = term
                                    break
                                }
                            }
                            if (resTerm == null)
                                resTerm = new Term(e.target.value)
                            proposition.subject = resTerm
                            e.currentTarget.value = e.target.value
                            update()
                        }}
                    />
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder={t('polysyllogism.placeholder.verb')}
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
                        placeholder={t('polysyllogism.placeholder.secondTerm')}
                        value={proposition.predicate == undefined ? "" : proposition.predicate?.value}
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
                            e.currentTarget.value = e.target.value
                            update()
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PolysyllogismMP
