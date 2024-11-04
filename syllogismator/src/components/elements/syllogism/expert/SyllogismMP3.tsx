import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP3Props {
    subject: string
    predicate: string
	setProp3Quantifier: (value: string) => void
}

function SyllogismMP3({ subject, predicate, setProp3Quantifier }: SyllogismMP3Props) {
    const [verb, setVerb] = useState("Please select a quantifier")

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} setPropQuantifier={setProp3Quantifier} />
                </div>

                <div className="subject">
                    <label>{subject}</label>
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="predicate">
                    <label>{predicate}</label>
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP3
