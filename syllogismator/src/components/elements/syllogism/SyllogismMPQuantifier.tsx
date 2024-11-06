import { useContext } from "react"
import QuantifierContext from "../../../contexts/QuantifierContext"
import { QuantifierType } from "../../../model/QuantifierType"

interface SyllogismMPQuantifierProps {
    setVerb: (value: string) => void
    setPropQuantifier: (value: string) => void
}

function SyllogismMPQuantifier({ setVerb, setPropQuantifier }: SyllogismMPQuantifierProps) {
    const { quantifiers } = useContext(QuantifierContext)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const group = selectedOption.getAttribute("data-group")

        switch (group) {
            case "A":
                setPropQuantifier("A")
                setVerb("are")
                break
            case "E":
                setPropQuantifier("E")
                setVerb("are not")
                break
            case "I":
                setPropQuantifier("I")
                setVerb("are some")
                break
            case "O":
                setPropQuantifier("O")
                setVerb("are not some")
                break
            default:
                setVerb("Please select a quantifier")
                break
        }
    }

    return (
        <>
            <select onChange={handleChange}>
                <option value="">-- Select a quantifier --</option>
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
    );
}

export default SyllogismMPQuantifier;
