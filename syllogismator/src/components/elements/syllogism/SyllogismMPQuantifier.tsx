import { useContext } from "react"
import QuantifierContext from "../../../contexts/QuantifierContext"
import { QuantifierType } from "../../../model/QuantifierType"
import { Quantifier } from "../../../model/Quantifier"

interface SyllogismMPQuantifierProps {
    setVerb: (value: string) => void
    quantifier: Quantifier
    setPropQuantifier: (value: Quantifier) => void
}

function SyllogismMPQuantifier({ setVerb, quantifier, setPropQuantifier }: SyllogismMPQuantifierProps) {
    const { quantifiers } = useContext(QuantifierContext)

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

    return (
        <>
            <select onChange={handleChange}>
                {/* Grouping quantifiers by type */}
                {[QuantifierType.A, QuantifierType.E, QuantifierType.I, QuantifierType.O].map((type) => (
                    <optgroup key={type.code} label={type.code}>
                        {quantifiers.filter((quantifier) => quantifier.type === type)
                            .map((quantifier, index) => (
                                <option key={index} data-group={type.code} value={quantifier.name}>
                                    {quantifier.name}
                                </option>
                            ))}
                    </optgroup>
                ))}
            </select>
        </>
    )
}

export default SyllogismMPQuantifier
