import { useContext } from "react"
import QuantifierContext from "../../../contexts/QuantifierContext"
import { QuantifierType } from "../../../model/QuantifierType"
import {DEFAULT_QUANTIFIERS_I18N_NAMESPACE, isDefaultQuantifierName, Quantifier} from "../../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

interface SyllogismMPQuantifierProps {
    setVerb: (value: string) => void
    quantifier: Quantifier
    setPropQuantifier: (value: Quantifier) => void
}

function SyllogismMPQuantifier({ setVerb, quantifier, setPropQuantifier }: SyllogismMPQuantifierProps) {
    const { quantifiers } = useContext(QuantifierContext)

    const { t } = useTranslation(I18N_NS, { keyPrefix: DEFAULT_QUANTIFIERS_I18N_NAMESPACE });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const group = selectedOption.getAttribute("data-group")

        switch (group) {
            case "A":
                quantifier.type = QuantifierType.A
                setPropQuantifier({...quantifier})
                setVerb("are")
                break
            case "E":
                quantifier.type = QuantifierType.E
                setPropQuantifier({...quantifier})
                setVerb("are not")
                break
            case "I":
                quantifier.type = QuantifierType.I
                setPropQuantifier({...quantifier})
                setVerb("are some")
                break
            case "O":
                quantifier.type = QuantifierType.O
                setPropQuantifier({...quantifier})
                setVerb("are not some")
                break
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

export default SyllogismMPQuantifier
