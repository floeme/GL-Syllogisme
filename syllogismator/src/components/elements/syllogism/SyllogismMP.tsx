import React, { useState } from "react";

interface SyllogismMPProps {
    firstTerm: string;
    secondTerm: string;
  }

function SyllogismMP({ firstTerm, secondTerm }: SyllogismMPProps) {
    const [verb, setVerb] = useState("")

    const handleChange = (event: { target: { value: any; }; }) => {
        const quantifier = event.target.value[0];

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
                    <select onChange={handleChange}>
                        <option>A: All</option>
                        <option>E: None</option>
                        <option>I: Some</option>
                        <option>O: Some Not</option>
                    </select>
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
    );
}

export default SyllogismMP;
