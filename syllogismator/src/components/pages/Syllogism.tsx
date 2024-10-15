import Basic_Syllogism from "../elements/syllogism/Basic_Syllogism.tsx"
import Expert_Syllogism from "../elements/syllogism/Expert_Syllogism.tsx"
import { useState } from "react";

export const Syllogism = () => {
  const [subject, setSubject] = useState("Socrate");
  const [predicate, setPredicate] = useState("Mortel");
  const [middle, setMiddle] = useState("Homme");
  const [figure, setFigure] = useState("figure1");
  const [expertMode, setExpertMode] = useState(false);

  return (
    <div className="syllogism-container">
      {expertMode == false ?
        <Basic_Syllogism
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
        /> :
        <Expert_Syllogism
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
        />}
    </div>
  );
};

export default Syllogism;
