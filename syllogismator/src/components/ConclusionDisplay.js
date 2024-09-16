import React from "react";

const ConclusionDisplay = ({ premises, terms }) => {
  const { major, minor } = premises;

  return (
    <div>
      <h2>Conclusion :</h2>
      <p>
        Sujet (S) : {terms.S || "S"} <br />
        Médiane (M) : {terms.M || "M"} <br />
        Prédicat (P) : {terms.P || "P"}
      </p>
      {major && (
        <p>
          Prémisse majeure : {major.quantifier} {major.subject} {major.verb}{" "}
          {major.predicate}
        </p>
      )}
      {minor && (
        <p>
          Prémisse mineure : {minor.quantifier} {minor.subject} {minor.verb}{" "}
          {minor.predicate}
        </p>
      )}
    </div>
  );
};

export default ConclusionDisplay;
