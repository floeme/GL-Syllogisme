import React, { useState } from "react";
import TermSelector from "./TermSelector";
import FigureSelector from "./FigureSelector";
import { PremiseForm1, PremiseForm2, ConclusionForm } from "./PremiseForm";
import ConclusionDisplay from "./ConclusionDisplay";

const Syllogism = () => {
  const [terms, setTerms] = useState({ S: "", M: "", P: "" });
  const [figure, setFigure] = useState(1);
  const [premises, setPremises] = useState({ major: {}, minor: {} });

  const handleTermsUpdate = (newTerms) => {
    setTerms(newTerms);
  };

  const handlePremiseUpdate = (premise, type) => {
    setPremises((prevPremises) => ({
      ...prevPremises,
      [type]: premise,
    }));
  };

  const handleFigureSelection = (selectedFigure) => {
    setFigure(selectedFigure);
  };

  return (
    <div className="syllogism-container">
      <h1>Create :</h1>

      {/* Partie 1 : Zone S, M, P avec sélection de la figure (à gauche sur l'étage 1) */}
      <div className="section-terms">
        <TermSelector onTermsChange={handleTermsUpdate} />
        <FigureSelector onFigureSelect={handleFigureSelection} />
      </div>

      {/* Partie 2 : Les trois phrases (à droite, sur l'étage 1 et 2) */}
      <div className="section-premises">
        <PremiseForm1
          className="premise-form"
          type="major"
          figure={figure}
          terms={terms}
          onPremiseSubmit={handlePremiseUpdate}
        />
        <PremiseForm2
          className="premise-form"
          type="minor"
          figure={figure}
          terms={terms}
          onPremiseSubmit={handlePremiseUpdate}
        />
        <ConclusionForm
          className="premise-form"
          terms={terms}
          figure={figure}
          onConclusionSubmit={(conclusion) => console.log(conclusion)}
        />
      </div>

      {/* Partie 3 : Conclusion (à gauche sur l'étage 2) */}
      <div className="section-conclusion">
        <ConclusionDisplay premises={premises} terms={terms} figure={figure} />
      </div>
    </div>
  );
};

export default Syllogism;
