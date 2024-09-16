import React, { useState } from "react";

// Composant pour la première prémisse
const PremiseForm1 = ({ figure, terms, onPremiseSubmit }) => {
  const [quantifier, setQuantifier] = useState("ALL");
  const [verb, setVerb] = useState("est");
  const [predicateInput, setPredicateInput] = useState("");

  const getSubject = () => {
    if (figure === 1 || figure === 3) {
      return terms.M || "M";
    } else if (figure === 2 || figure === 4) {
      return terms.P || "P";
    }
  };

  const getPredicate = () => {
    if (figure === 1 || figure === 3) {
      return terms.P || "P";
    } else if (figure === 2 || figure === 4) {
      return terms.M || "M";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const premise = {
      quantifier,
      subject: getSubject(),
      predicate: predicateInput || getPredicate(),
      verb,
    };
    onPremiseSubmit(premise, "major");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Première prémisse</h2>
      <label>Quantificateur :</label>
      <select
        value={quantifier}
        onChange={(e) => setQuantifier(e.target.value)}
      >
        <option value="ALL">Tous</option>
        <option value="SOME">Certains</option>
        <option value="NONE">Aucun</option>
        <option value="SOME_NOT">Certains ne</option>
      </select>

      <label>Sujet :</label>
      <input type="text" value={getSubject()} readOnly />

      <label>Verbe :</label>
      <input
        type="text"
        value={verb}
        onChange={(e) => setVerb(e.target.value)}
      />

      <label>Prédicat :</label>
      <input
        type="text"
        value={predicateInput || getPredicate()}
        onChange={(e) => setPredicateInput(e.target.value)}
      />

      <button type="submit">Soumettre</button>
    </form>
  );
};

// Composant pour la deuxième prémisse
const PremiseForm2 = ({ figure, terms, onPremiseSubmit }) => {
  const [quantifier, setQuantifier] = useState("ALL");
  const [verb, setVerb] = useState("est");
  const [predicateInput, setPredicateInput] = useState("");

  const getSubject = () => {
    if (figure === 1 || figure === 2) {
      return terms.S || "S";
    } else if (figure === 3 || figure === 4) {
      return terms.M || "M";
    }
  };

  const getPredicate = () => {
    if (figure === 1 || figure === 2) {
      return terms.M || "M";
    } else if (figure === 3 || figure === 4) {
      return terms.S || "S";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const premise = {
      quantifier,
      subject: getSubject(),
      predicate: predicateInput || getPredicate(),
      verb,
    };
    onPremiseSubmit(premise, "minor");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Deuxième prémisse</h2>
      <label>Quantificateur :</label>
      <select
        value={quantifier}
        onChange={(e) => setQuantifier(e.target.value)}
      >
        <option value="ALL">Tous</option>
        <option value="SOME">Certains</option>
        <option value="NONE">Aucun</option>
        <option value="SOME_NOT">Certains ne</option>
      </select>

      <label>Sujet :</label>
      <input type="text" value={getSubject()} readOnly />

      <label>Verbe :</label>
      <input
        type="text"
        value={verb}
        onChange={(e) => setVerb(e.target.value)}
      />

      <label>Prédicat :</label>
      <input
        type="text"
        value={predicateInput || getPredicate()}
        onChange={(e) => setPredicateInput(e.target.value)}
      />

      <button type="submit">Soumettre</button>
    </form>
  );
};

// Composant pour la conclusion
const ConclusionForm = ({ terms, onConclusionSubmit }) => {
  const [verb, setVerb] = useState("est");
  const handleSubmit = (e) => {
    e.preventDefault();
    const conclusion = {
      subject: terms.S,
      predicate: terms.P,
      verb,
    };
    onConclusionSubmit(conclusion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Conclusion</h2>
      <label>Sujet (S) :</label>
      <input type="text" value={terms.S} readOnly />

      <label>Verbe :</label>
      <input
        type="text"
        value={verb}
        onChange={(e) => setVerb(e.target.value)}
      />

      <label>Prédicat (P) :</label>
      <input type="text" value={terms.P} readOnly />

      <button type="submit">Soumettre</button>
    </form>
  );
};

export { PremiseForm1, PremiseForm2, ConclusionForm };
