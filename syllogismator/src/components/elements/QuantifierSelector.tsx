import React, {useContext, useState} from "react"
import QuantifierContext from "../../contexts/QuantifierContext"
import {QuantifierType} from "../../model/QuantifierType"
import {
    DEFAULT_QUANTIFIERS_I18N_NAMESPACE,
    defaultQuantifiers,
    isDefaultQuantifierName,
    Quantifier
} from "../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../i18n.ts";

interface QuantifierSelectorProps {
    quantifier: Quantifier
    setPropQuantifier: (value: Quantifier) => void
}

function QuantifierSelector({ quantifier, setPropQuantifier }: QuantifierSelectorProps) {
    const { quantifiers } = useContext(QuantifierContext)

    if(quantifier === undefined) {
        quantifier = defaultQuantifiers.A
        setPropQuantifier({...defaultQuantifiers.A})
    }

    const [curQuant, setCurQuant] = useState<Quantifier>(quantifier)

    const { t } = useTranslation(I18N_NS, { keyPrefix: DEFAULT_QUANTIFIERS_I18N_NAMESPACE });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const name = selectedOption.getAttribute("value") as string;

        for(const q of quantifiers){
            if(q.name === name){
                setPropQuantifier({...q})
                setCurQuant(q)
                break
            }
        }
    }

    const quantifierTypes = [QuantifierType.A, QuantifierType.E, QuantifierType.I, QuantifierType.O];

    return (
        <>*

            <select onChange={handleChange} value={curQuant.name}>
                { // Grouping quantifiers by type
                    quantifierTypes.map((type) => (
                        <optgroup key={type.code} label={`${type.code} – ${t(type.code)}`}>
                            { quantifiers.filter((quantifier) => quantifier.type === type)
                                .map((mapQuantifier, index) => (
                                    <option key={index} data-group={type.code} value={mapQuantifier.name}>
                                        {isDefaultQuantifierName(mapQuantifier.name) ? t(mapQuantifier.name) : mapQuantifier.name}
                                    </option>
                                ))
                            }
                        </optgroup>
                    ))
                }
            </select>
        </>
    )
}

export default QuantifierSelector
