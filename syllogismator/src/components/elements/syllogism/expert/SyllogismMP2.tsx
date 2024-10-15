import { useState } from "react";

interface SyllogismMPProps {
    firstTerm: string;
    secondTerm: string;
}

function SyllogismMP({ firstTerm, secondTerm }: SyllogismMPProps) {
    const [verb, setVerb] = useState("")

    const handleChange = (quantifier: string) => {
        switch (quantifier) {
            case "A":
                setVerb("are");
                break;
            case "E":
                setVerb("are not");
                break;
            case "I":
                setVerb("are some");
                break;
            case "O":
                setVerb("are not some");
                break;
            default:
                setVerb("are");
                return <div>Please select a quantifier</div>;
        }
    };

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <select onChange={(e) => handleChange(e.target.value)}>
                        <option value="">-- Select a quantifier --</option>
                        <option value="A">A: All</option>
                        <option value="E">E: None</option>
                        <option value="I">I: Some</option>
                        <option value="O">O: Some Not</option>
                    </select>
                </div>

                <div className="subject">
                    <select>
                        <option></option>
                        <option></option>
                    </select>
                </div>

                <div className="verb">
                    <label>{verb}</label>
                </div>

                <div className="predicate">
                    <select>
                        <option></option>
                        <option></option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SyllogismMP;
