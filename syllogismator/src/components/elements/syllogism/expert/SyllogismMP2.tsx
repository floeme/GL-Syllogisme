import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP2Props {
    MP1FirstTerm: string
    MP1SecondTerm: string
    subject: string
    setSubject: (value: string) => void
    setMiddle: (value: string) => void
    setPredicate: (value: string) => void
}

function SyllogismMP2({ MP1FirstTerm, MP1SecondTerm, subject, setSubject, setMiddle, setPredicate}: SyllogismMP2Props) {
    const [verb, setVerb] = useState("")
    const [selected1, setSelected1] = useState<string | null>(null)
    const [selected2, setSelected2] = useState<string | null>(null)

    const handleChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelected1(value)
        setSelected2(null)

        switch (value) {
            case "MP1FirstTerm":
                // Figure 3
                setMiddle(MP1FirstTerm)
                setPredicate(MP1SecondTerm)
                break
            case "MP1SecondTerm":
                // Figure 4
                setPredicate(MP1FirstTerm)
                setMiddle(MP1SecondTerm)
                break
            default:
                break
        }
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelected2(value)
        setSelected1(null)

        switch (value) {
            case "MP1FirstTerm":
                // Figure 1
                setMiddle(MP1FirstTerm)
                setPredicate(MP1SecondTerm)
                break
            case "MP1SecondTerm":
                // Figure 2
                setPredicate(MP1FirstTerm)
                setMiddle(MP1SecondTerm)
                break
            default:
                break
        }
    }

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} />
                </div>

                <div className="first-term">
                    {selected2 ? (
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter a term"
                        />
                    ) : (
                        <select onChange={handleChange1} value={selected1 || ""}>
                            <option value="">-- Select a term --</option>
                            <option value="MP1FirstTerm">{MP1FirstTerm}</option>
                            <option value="MP1SecondTerm">{MP1SecondTerm}</option>
                        </select>
                    )}
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="second-term">
                    {selected1 ? (
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter a term"
                        />
                    ) : (
                        <select onChange={handleChange2} value={selected2 || ""}>
                            <option value="">-- Select a term --</option>
                            <option value="MP1FirstTerm">{MP1FirstTerm}</option>
                            <option value="MP1SecondTerm">{MP1SecondTerm}</option>
                        </select>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP2
