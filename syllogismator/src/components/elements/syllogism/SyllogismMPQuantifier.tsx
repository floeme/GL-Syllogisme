import { useContext } from "react"
import QuantifierContext from "../../../contexts/QuantifierContext"

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
                {Object.keys(quantifiers).map((groupKey) => (
                    <optgroup key={groupKey} label={groupKey}>
                        {/* groupKey as keyof typeof quantifiers */}
                        {/* Permet de garantir à TypeScript que groupKey correspondra à l'une des clés de l'objet quantifiers */}
                        {/* Sinon y a un warning :) */}
                        {quantifiers[groupKey as keyof typeof quantifiers].map((item: string, index: number) => (
                            <option key={index} data-group={groupKey} value={item}>
                                {item}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </>
    )
}

export default SyllogismMPQuantifier
