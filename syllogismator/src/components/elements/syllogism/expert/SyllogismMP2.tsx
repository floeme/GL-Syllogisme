import { useEffect, useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP2Props {
    MP1FirstTerm: string
    MP1SecondTerm: string
    MP2FirstTerm: string
    setMP2FirstTerm: (value: string) => void
    MP2SecondTerm: string
    setMP2SecondTerm: (value: string) => void
}

function SyllogismMP2({
    MP1FirstTerm,
    MP1SecondTerm,
    MP2FirstTerm,
    setMP2FirstTerm,
    MP2SecondTerm,
    setMP2SecondTerm,
}: SyllogismMP2Props) {
    const [verb, setVerb] = useState("Please select a quantifier")
    const [selected1, setSelected1] = useState(false)
    const [selected2, setSelected2] = useState(false)
    const [manual1, setManual1] = useState(false)
    const [manual2, setManual2] = useState(false)

    useEffect(() => {
        if ((selected1 || manual1) && MP2FirstTerm == "") {
            setSelected1(false)
            setSelected2(false)
            setManual1(false)
            setManual2(false)
            setMP2SecondTerm("")
        }
        if ((selected2 || manual2) && MP2SecondTerm == "") {
            setSelected1(false)
            setSelected2(false)
            setManual1(false)
            setManual2(false)
            setMP2FirstTerm("")
        }
    }, [MP2FirstTerm, MP2SecondTerm])

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setMP2FirstTerm(value)

        if (value !== MP1FirstTerm && value !== MP1SecondTerm) {
            setManual1(true)
            setManual2(false)
        } else {
            setSelected1(true)
            setSelected2(false)
        }
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setMP2SecondTerm(value)

        if (value !== MP1FirstTerm && value !== MP1SecondTerm) {
            setManual1(false)
            setManual2(true)
        } else {
            setSelected1(false)
            setSelected2(true)
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
                            value={MP2FirstTerm}
                            onChange={(e) => setMP2FirstTerm(e.target.value)}
                            placeholder="Enter a term"
                        />
                    ) : manual2 ? (
                        <select
                            value={MP2FirstTerm}
                            onChange={(e) => setMP2FirstTerm(e.target.value)}
                        >
                            <option value="" disabled>
                                Select a term
                            </option>
                            <option value={MP1FirstTerm}>{MP1FirstTerm}</option>
                            <option value={MP1SecondTerm}>{MP1SecondTerm}</option>
                        </select>
                    ) : (
                        <>
                            <input
                                list="first-term-list"
                                placeholder="Select or type a term"
                                value={MP2FirstTerm}
                                onChange={handleChange1}
                            />
                            <datalist id="first-term-list">
                                <option value={MP1FirstTerm} />
                                <option value={MP1SecondTerm} />
                            </datalist>
                        </>
                    )}
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="second-term">
                    {selected1 ? (
                        <input
                            type="text"
                            value={MP2SecondTerm}
                            onChange={(e) => setMP2SecondTerm(e.target.value)}
                            placeholder="Enter a term"
                        />
                    ) : manual1 ? (
                        <select
                            value={MP2SecondTerm}
                            onChange={(e) => setMP2SecondTerm(e.target.value)}
                        >
                            <option value="" disabled>
                                Select a term
                            </option>
                            <option value={MP1FirstTerm}>{MP1FirstTerm}</option>
                            <option value={MP1SecondTerm}>{MP1SecondTerm}</option>
                        </select>
                    ) : (
                        <>
                            <input
                                list="second-term-list"
                                placeholder="Select or type a term"
                                value={MP2SecondTerm}
                                onChange={handleChange2}
                            />
                            <datalist id="second-term-list">
                                <option value={MP1FirstTerm} />
                                <option value={MP1SecondTerm} />
                            </datalist>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP2
