import { useState } from "react"

interface SyllogismMPQuantifierProps {
    setVerb: (value: string) => void
}

function SyllogismMPQuantifier({ setVerb }: SyllogismMPQuantifierProps) {
    const [quantifierA, setQuantifierA] = useState(["All", "Every", "Each", "Every single"])
    const [quantifierE, setQuantifierE] = useState(["None", "No one"])
    const [quantifierI, setQuantifierI] = useState(["Some", "A few"])
    const [quantifierO, setQuantifierO] = useState(["Not some", "Not all"])

    const quantifiers = {
        A: quantifierA,
        E: quantifierE,
        I: quantifierI,
        O: quantifierO,
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0]
        const group = selectedOption.getAttribute("data-group")

        switch (group) {
            case "A":
                setVerb("are")
                break
            case "E":
                setVerb("are not")
                break
            case "I":
                setVerb("are some")
                break
            case "O":
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
