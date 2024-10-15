import SyllogismTerms from "./basic/SyllogismTerms";
import SyllogismPropositions from "./basic/SyllogismPropositions";
import SyllogismFigures from "./basic/SyllogismFigures";
import { useState } from "react";

interface Expert_SyllogismProps {
  subject: string;
  setSubject: (value: string) => void;
  predicate: string;
  setPredicate: (value: string) => void;
  middle: string;
  setMiddle: (value: string) => void;
  figure: string;
  setFigure: (value: string) => void;
  expertMode: boolean;
  setExpertMode: (value: boolean) => void;
}

export const Expert_Syllogism = ({subject, setSubject, predicate, setPredicate, middle, setMiddle, figure, setFigure, expertMode, setExpertMode}: Expert_SyllogismProps) => {
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

export default Expert_Syllogism;
