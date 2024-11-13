import PolysyllogismQuantifierSelector from "../PolysyllogismQuantifierSelector"
import { Proposition } from "../../../model/Proposition"

interface PollysyllogismMPProps {
    verb: string
    setVerb: (value: string) => void
    proposition: Proposition
    onPropositionChange: (updatedProposition: Proposition) => void
}

function PolysyllogismMP({
    verb, setVerb,
    proposition, onPropositionChange
}: PollysyllogismMPProps) {
    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <PolysyllogismQuantifierSelector quantifier={proposition.quantifier} />
                </div>

                <div className="first-term">
                    <input
                        type="text"
                        name="firstTerm"
                        placeholder="Enter a first term"
                        value={proposition.subject?.value || ""}
                        onChange={(e) => {
                            if (proposition.subject?.value != undefined) {
                                proposition.subject.value = e.target.value
                                onPropositionChange(proposition)
                            }
                        }}
                    />
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

                <div className="second-term">
                    <input
                        type="text"
                        name="secondTerm"
                        placeholder="Enter a second term"
                        value={proposition.predicate?.value}
                        onChange={(e) => {
                            if (proposition.predicate?.value != undefined) {
                                proposition.predicate.value = e.target.value
                                onPropositionChange(proposition)
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PolysyllogismMP
