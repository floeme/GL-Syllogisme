import SyllogismTerms from "./basic/SyllogismTerms";
import SyllogismPropositions from "./basic/SyllogismPropositions";
import SyllogismFigures from "./basic/SyllogismFigures";
import { useState } from "react";

interface Basic_SyllogismProps {
  expertMode: boolean;
  setExpertMode: (value: boolean) => void;
}

export const Basic_Syllogism = ({expertMode, setExpertMode}: Basic_SyllogismProps) => {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [middle, setMiddle] = useState("");
  const [figure, setFigure] = useState("");

  return (
    <>
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
        <SyllogismPropositions
          subject={subject}
          setSubject={setSubject}
          predicate={predicate}
          setPredicate={setPredicate}
          middle={middle}
          setMiddle={setMiddle}
          figure={figure}
          setFigure={setFigure}
          expertMode={expertMode}
          setExpertMode={setExpertMode}
        />
    </>
  );
};

export default Basic_Syllogism;
