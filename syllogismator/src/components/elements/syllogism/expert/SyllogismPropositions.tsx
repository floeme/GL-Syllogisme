import { Fragment, useEffect, useState } from "react"
import SyllogismMP1 from "./SyllogismMP1"
import SyllogismMP2 from "./SyllogismMP2"
import SyllogismMP3 from "./SyllogismMP3"

interface SyllogismPremisesProps {
    MP1FirstTerm: string
    setMP1FirstTerm: (value: string) => void
    MP1SecondTerm: string
    setMP1SecondTerm: (value: string) => void
    MP2FirstTerm: string
    setMP2FirstTerm: (value: string) => void
    MP2SecondTerm: string
    setMP2SecondTerm: (value: string) => void
    subject: string
    setSubject: (value: string) => void
    predicate: string
    setPredicate: (value: string) => void
    middle: string
    setMiddle: (value: string) => void
    figure: string
    setFigure: (value: string) => void
    expertMode: boolean
    setExpertMode: (value: boolean) => void
}

function SyllogismPropositions({
    MP1FirstTerm,
    setMP1FirstTerm,
    MP1SecondTerm,
    setMP1SecondTerm,
    MP2FirstTerm,
    setMP2FirstTerm,
    MP2SecondTerm,
    setMP2SecondTerm,
    subject,
    setSubject,
    predicate,
    setPredicate,
    middle,
    setMiddle,
    expertMode,
    setExpertMode
}: SyllogismPremisesProps) {
    // Références pour stocker les valeurs précédentes
    // const prevMP1FirstTerm = useRef(MP1FirstTerm)
    // const prevMP1SecondTerm = useRef(MP1SecondTerm)
    // const prevMP2FirstTerm = useRef(MP2FirstTerm)
    // const prevMP2SecondTerm = useRef(MP2SecondTerm)

    const [errorMessage1, setErrorMessage1] = useState("")
    const [errorMessage2, setErrorMessage2] = useState("")

    const handleTermConflict = (term1: string, term2: string) => {
        if (term1 === term2 && term1 !== "" && term2 !== "") {
            console.warn("Duplicate terms detected. Adjusting terms to ensure unique syllogism structure.")
            return true
        }
        return false
    }

    useEffect(() => {
        if (handleTermConflict(MP1FirstTerm, MP1SecondTerm)) {
            setErrorMessage1("Conflit - Proposition 1 : Les deux termes ne peuvent pas être identiques.")
        } else {
            setErrorMessage1("")
        }

        if (handleTermConflict(MP2FirstTerm, MP2SecondTerm)) {
            setErrorMessage2("Conflit - Proposition 2 : Les deux termes ne peuvent pas être identiques.")
        } else {
            setErrorMessage2("")
        }

        // Figure 3
        if (MP1FirstTerm === MP2FirstTerm) {
            setSubject(MP2SecondTerm)
            setMiddle(MP1FirstTerm)
            setPredicate(MP1SecondTerm)
        }

        // Figure 1
        if (MP1FirstTerm === MP2SecondTerm) {
            setSubject(MP2FirstTerm)
            setMiddle(MP1FirstTerm)
            setPredicate(MP1SecondTerm)
        }

        // Figure 4
        if (MP1SecondTerm === MP2FirstTerm) {
            setSubject(MP2SecondTerm)
            setMiddle(MP1SecondTerm)
            setPredicate(MP1FirstTerm)
        }

        // Figure 2
        if (MP1SecondTerm === MP2SecondTerm) {
            setSubject(MP2FirstTerm)
            setMiddle(MP1SecondTerm)
            setPredicate(MP1FirstTerm)
        }
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm])


    const checkSyllogism = () => {
        console.log("check")
    }

    const clearSyllogism = () => {
        setSubject("")
        setPredicate("")
        setMiddle("")
        setMP1FirstTerm("")
        setMP1SecondTerm("")
        setMP2FirstTerm("")
        setMP2SecondTerm("")
        console.log("clear")
    }

    const help = () => {
        console.log("help")
    }

    const goSettings = () => {
        console.log("goSettings")
    }

    const [propositions, setPropositions] = useState([
        <SyllogismMP1
            MP1FirstTerm={MP1FirstTerm}
            setMP1FirstTerm={setMP1FirstTerm}
            MP1SecondTerm={MP1SecondTerm}
            setMP1SecondTerm={setMP1SecondTerm}
        />,
        <SyllogismMP2
            MP1FirstTerm={MP1FirstTerm}
            MP1SecondTerm={MP1SecondTerm}
            MP2FirstTerm={MP2FirstTerm}
            setMP2FirstTerm={setMP2FirstTerm}
            MP2SecondTerm={MP2SecondTerm}
            setMP2SecondTerm={setMP2SecondTerm}
        />,
        <SyllogismMP3
            subject={subject}
            predicate={predicate}
        />
    ])

    useEffect(() => {
        setPropositions([
            <SyllogismMP1
                MP1FirstTerm={MP1FirstTerm}
                setMP1FirstTerm={setMP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                setMP1SecondTerm={setMP1SecondTerm}
            />,
            <SyllogismMP2
                MP1FirstTerm={MP1FirstTerm}
                MP1SecondTerm={MP1SecondTerm}
                MP2FirstTerm={MP2FirstTerm}
                setMP2FirstTerm={setMP2FirstTerm}
                MP2SecondTerm={MP2SecondTerm}
                setMP2SecondTerm={setMP2SecondTerm}
            />,
            <SyllogismMP3
                subject={subject}
                predicate={predicate}
            />
        ])
    }, [MP1FirstTerm, MP1SecondTerm, MP2FirstTerm, MP2SecondTerm, subject, predicate, middle])

    // Pour la synchro mais trop compliqué pour rien
    // useEffect(() => {
    //     console.log("aaaaaa")
    //     if (prevMP1FirstTerm.current === MP2FirstTerm) {
    //         setMP2FirstTerm(MP1FirstTerm)
    //     }
    //     if (prevMP1FirstTerm.current === MP2SecondTerm) {
    //         setMP2SecondTerm(MP1FirstTerm)
    //     }
    //     if (prevMP1SecondTerm.current === MP2FirstTerm) {
    //         setMP2FirstTerm(MP1SecondTerm)
    //     }
    //     if (prevMP1SecondTerm.current === MP2SecondTerm) {
    //         setMP2SecondTerm(MP1SecondTerm)
    //     }

    //     prevMP1FirstTerm.current = MP1FirstTerm
    //     prevMP1SecondTerm.current = MP1SecondTerm
    // }, [MP1FirstTerm, MP1SecondTerm])

    // useEffect(() => {
    //     if (MP2FirstTerm !== prevMP2FirstTerm.current) {
    //         if (prevMP2FirstTerm.current === MP1FirstTerm && MP1FirstTerm !== "") {
    //             console.log("1")
    //             setMP1FirstTerm(MP2FirstTerm)
    //         }
    //         if (prevMP2FirstTerm.current === MP1SecondTerm && MP1SecondTerm !== "") {
    //             console.log("2")
    //             setMP1SecondTerm(MP2FirstTerm)
    //         }
    //     }

    //     console.log("prevMP2SecondTerm.current", prevMP2SecondTerm.current)
    //     console.log("MP1SecondTerm", MP1SecondTerm)
    //     console.log("MP2SecondTerm", MP2SecondTerm)

    //     if (MP2SecondTerm !== prevMP2SecondTerm.current) {
    //         if (prevMP2SecondTerm.current === MP1FirstTerm && MP1FirstTerm !== "") {
    //             console.log("3")
    //             setMP1FirstTerm(MP2SecondTerm)
    //         }
    //         if (prevMP2SecondTerm.current === MP1SecondTerm && MP1SecondTerm !== "") {
    //             console.log("4")
    //             setMP1SecondTerm(MP2SecondTerm)
    //         }
    //     }

    //     prevMP2FirstTerm.current = MP2FirstTerm
    //     prevMP2SecondTerm.current = MP2SecondTerm
    // }, [MP2FirstTerm, MP2SecondTerm])

    return (
        <div className="section-premises">
            <div className="button-row">
                <button type="button" name="clearSyllogismButton" onClick={clearSyllogism}><img src="images/delete_icon.svg" alt="delete"></img></button>
                <button type="button" name="helpButton" onClick={help}><img src="images/help_icon.svg" alt="help"></img></button>
                <button type="button" name="settingsButton" onClick={goSettings}><img src="images/settings_icon.svg" alt="settings"></img></button>
                <label>Guided</label>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={expertMode}
                        onChange={() => setExpertMode(!expertMode)}
                    />
                    <span className="slider"></span>
                </label>
                <label>Expert</label>
            </div>

            <div className="syllogism-grid">
                {errorMessage1 && <p style={{ color: "red" }}>{errorMessage1}</p>}
                {errorMessage2 && <p style={{ color: "red" }}>{errorMessage2}</p>}
                {propositions.map((proposition, index) => (
                    <Fragment key={index}>
                        <div className={"label-" + (index+1)}>
                            <label>Proposition {index + 1}</label>
                        </div>
                        <div className={"proposition-" + (index+1)}>
                            {proposition}
                        </div>
                    </Fragment>
                ))}

                <div className="hypothesis">
                    <label>Existence Hypothesis</label>
                    <input type="checkbox" name="existenceHypothesis" />
                    <button type="button" name="checkButton" onClick={checkSyllogism}>Check</button>
                </div>
            </div>
        </div>
    )
}

export default SyllogismPropositions
