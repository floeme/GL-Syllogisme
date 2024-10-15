import Basic_Syllogism from "../elements/syllogism/Basic_Syllogism.tsx"
import Expert_Syllogism from "../elements/syllogism/Expert_Syllogism.tsx"
import { useState } from "react";

export const Syllogism = () => {
  const [expertMode, setExpertMode] = useState(false);

  return (
    <div className="syllogism-container">
      {expertMode == true ?
        <Basic_Syllogism
          expertMode={expertMode}
          setExpertMode={setExpertMode}
        /> :
        <Expert_Syllogism
          // expertMode={expertMode}
          setExpertMode={setExpertMode}
        />}
    </div>
  );
};

export default Syllogism;
