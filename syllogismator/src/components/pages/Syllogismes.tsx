import SyllogismTerms from "../elements/syllogism/SyllogismTerms";
import SyllogismPremises from "../elements/syllogism/SyllogismPremises";
import SyllogismFigures from "../elements/syllogism/SyllogismFigures";
import { useState } from "react";

export const Syllogismes = () => {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [middle, setMiddle] = useState("");
  const [figure, setFigure] = useState("");

  return (
    <div className="syllogism-container">
      <div className="section-terms-figures">
        <SyllogismTerms
          subject={subject}
          setSubject={setSubject}
          predicate={predicate}
          setPredicate={setPredicate}
          middle={middle}
          setMiddle={setMiddle}
          figure={figure}
          setFigure={setFigure}
        />
        <SyllogismFigures
          figure={figure}
          setFigure={setFigure}
        />
      </div>
        <SyllogismPremises
          subject={subject}
          setSubject={setSubject}
          predicate={predicate}
          setPredicate={setPredicate}
          middle={middle}
          setMiddle={setMiddle}
          figure={figure}
          setFigure={setFigure}
        />
    </div>
  );
};

export default Syllogismes;
