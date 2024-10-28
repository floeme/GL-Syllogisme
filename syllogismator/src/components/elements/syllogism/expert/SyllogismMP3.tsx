import { useState } from "react"
import SyllogismMPQuantifier from "../SyllogismMPQuantifier"

interface SyllogismMP3Props {
    subject: string
    predicate: string
}

function SyllogismMP3({ subject, predicate }: SyllogismMP3Props) {
    const [verb, setVerb] = useState("")
    // const [selected1, setSelected1] = useState<string | null>(null)
    // const [selected2, setSelected2] = useState<string | null>(null)

    // const handleChange1 = (e: string) => {
    //     setSelected1(e)

    //     switch (e) {
    //         case "subject":
    //             setSelected2("predicate")
    //             break
    //         case "predicate":
    //             setSelected2("subject")
    //             break
    //         default:
    //             setSelected2(null)
    //             break
    //     }
    // }

    // const handleChange2 = (e: string) => {
    //     setSelected2(e)

    //     switch (e) {
    //         case "subject":
    //             setSelected1("predicate")
    //             break
    //         case "predicate":
    //             setSelected1("subject")
    //             break
    //         default:
    //             setSelected1(null)
    //             break
    //     }
    // }

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <SyllogismMPQuantifier setVerb={setVerb} />
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



                {/* Bizarre ? la conclusion est tjrs la même --> S->P donc pk laisser le choix à l'utilisateur ? */}

                {/* <div className="subject">
                    <select
                        onChange={(e) => handleChange1(e.target.value)}
                        value={selected1 || ""}
                    >
                        <option value="">-- Select a term --</option>
                        <option value="subject" hidden={selected2 === "subject"}>
                            {subject}
                        </option>
                        <option value="predicate" hidden={selected2 === "predicate"}>
                            {predicate}
                        </option>
                    </select>
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="middle">
                    <select
                        onChange={(e) => handleChange2(e.target.value)}
                        value={selected2 || ""}
                    >
                        <option value="">-- Select a term --</option>
                        <option value="subject" hidden={selected1 === "subject"}>
                            {subject}
                        </option>
                        <option value="predicate" hidden={selected1 === "predicate"}>
                            {predicate}
                        </option>
                    </select>
                </div> */}
            </div>
        </div>
    )
}

export default SyllogismMP3
