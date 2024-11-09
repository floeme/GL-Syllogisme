import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"
import { Quantifier } from "../../../../model/Quantifier"

interface SyllogismMPProps {
    firstTerm: string
    secondTerm: string
    quantifier: Quantifier
    setPropQuantifier: (value: Quantifier) => void
}

function SyllogismMP({ firstTerm, secondTerm, quantifier, setPropQuantifier }: SyllogismMPProps) {
    const [verb, setVerb] = useState("are")

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} quantifier={quantifier} setPropQuantifier={setPropQuantifier} />
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
