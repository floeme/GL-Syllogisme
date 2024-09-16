import React, { useState } from "react";

const TermSelector = ({ onTermsChange }) => {
  const [terms, setTerms] = useState({ S: "", M: "", P: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedTerms = { ...terms, [name]: value };
    setTerms(updatedTerms);
    onTermsChange(updatedTerms);
  };

  return (
    <form className="form-terms">
      <label>Sujet (S):</label>
      <input
        type="text"
        name="S"
        value={terms.S}
        onChange={handleInputChange}
        required
      />

      <label>Médiane (M):</label>
      <input
        type="text"
        name="M"
        value={terms.M}
        onChange={handleInputChange}
        required
      />

      <label>Prédicat (P):</label>
      <input
        type="text"
        name="P"
        value={terms.P}
        onChange={handleInputChange}
        required
      />
    </form>
  );
};

export default TermSelector;
