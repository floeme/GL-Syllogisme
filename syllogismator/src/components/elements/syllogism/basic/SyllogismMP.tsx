import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMPProps {
    firstTerm: string
    secondTerm: string
}

function SyllogismMP({ firstTerm, secondTerm }: SyllogismMPProps) {
    const [verb, setVerb] = useState("Please select a quantifier")

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} />
                </div>

                <div className="subject">
                    <label>{firstTerm}</label>
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="predicate">
                    <label>{secondTerm}</label>
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP
