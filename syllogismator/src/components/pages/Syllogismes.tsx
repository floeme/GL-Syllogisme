import SyllogismTerms from "../elements/SyllogismTerms";
import SyllogismPremises from "../elements/SyllogismPremises";
import SyllogismFigures from "../elements/SyllogismFigures";
import { useState } from "react";

export const Syllogismes = () => {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [middle, setMiddle] = useState("");
  const [figure, setFigure] = useState("");

  return (
    <div className="syllogism-container">
      <div className="section-terms">
        <SyllogismTerms setSubject={setSubject} setPredicate={setPredicate} setMiddle={setMiddle} />
        <SyllogismFigures setFigure={setFigure} />
      </div>
        <SyllogismPremises subject={subject} predicate={predicate} middle={middle} figure={figure} />
    </div>
  );
};

export default Syllogismes;
