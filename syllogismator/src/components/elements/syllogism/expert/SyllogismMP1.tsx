import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP1Props {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
	setProp1Quantifier: (value: string) => void
}

function SyllogismMP1({
    MP1FirstTerm, setMP1FirstTerm,
    MP1SecondTerm, setMP1SecondTerm,
    setProp1Quantifier
}: SyllogismMP1Props) {
    const [verb, setVerb] = useState("Please select a quantifier")

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} setPropQuantifier={setProp1Quantifier} />
                </div>

                <div className="first-term">
                    <input
                        type="text"
                        name="firstTerm"
                        placeholder="Enter a first term"
                        value={MP1FirstTerm}
                        onChange={(e) => setMP1FirstTerm(e.target.value)}
                    />
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="second-term">
                    <input
                        type="text"
                        name="secondTerm"
                        placeholder="Enter a second term"
                        value={MP1SecondTerm}
                        onChange={(e) => setMP1SecondTerm(e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP1
