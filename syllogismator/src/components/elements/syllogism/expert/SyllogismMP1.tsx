import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP1Props {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
}

function SyllogismMP1({ MP1FirstTerm, setMP1FirstTerm, MP1SecondTerm, setMP1SecondTerm }: SyllogismMP1Props) {
    const [verb, setVerb] = useState("")
    const [value, setValue] = useState("")

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} />
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
