import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"
import { Quantifier } from "../../../../model/Quantifier"

interface SyllogismMP3Props {
    subject: string
    predicate: string
    quantifier: Quantifier
	setProp3Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

function SyllogismMP3({
    subject,
    predicate,
    quantifier, setProp3Quantifier,
	verb, setVerb
}: SyllogismMP3Props) {
    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} quantifier={quantifier} setPropQuantifier={setProp3Quantifier} />
                </div>

                <div className="subject">
                    <label>{subject}</label>
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder="Enter a verb"
                        value={verb}
                        onChange={(e) => {
                            setVerb(e.target.value)
                        }}
                    />
                </div>

                <div className="predicate">
                    <label>{predicate}</label>
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP3
