import { useContext } from "react"
import QuantifierContext from "../../contexts/QuantifierContext"
import { QuantifierType } from "../../model/QuantifierType"
import {DEFAULT_QUANTIFIERS_I18N_NAMESPACE, isDefaultQuantifierName, Quantifier} from "../../model/Quantifier"
import {useTranslation} from "react-i18next";

interface QuantifierSelectorProps {
    quantifier: Quantifier | undefined
}

function QuantifierSelector({ quantifier }: QuantifierSelectorProps) {
    const { quantifiers } = useContext(QuantifierContext)

    const { t } = useTranslation('translation', { keyPrefix: DEFAULT_QUANTIFIERS_I18N_NAMESPACE });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const group = selectedOption.getAttribute("data-group")

        if (quantifier) {
            switch (group) {
                case "A":
                    quantifier.type = QuantifierType.A
                    break
                case "E":
                    quantifier.type = QuantifierType.E
                    break
                case "I":
                    quantifier.type = QuantifierType.I
                    break
                case "O":
                    quantifier.type = QuantifierType.O
                    break
            }
        }
    }

    const quantifierTypes = [QuantifierType.A, QuantifierType.E, QuantifierType.I, QuantifierType.O];

    return (
        <>
            <select onChange={handleChange}>
                { // Grouping quantifiers by type
                    quantifierTypes.map((type) => (
                        <optgroup key={type.code} label={`${type.code} – ${t(type.code)}`}>
                            { quantifiers.filter((quantifier) => quantifier.type === type)
                                .map((quantifier, index) => (
                                    <option key={index} data-group={type.code} value={quantifier.name}>
                                        {isDefaultQuantifierName(quantifier.name) ? t(quantifier.name) : quantifier.name}
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
