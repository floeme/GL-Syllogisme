import React from "react";

const FigureSelector = ({ onFigureSelect }) => {
  const handleFigureChange = (e) => {
    onFigureSelect(parseInt(e.target.value));
  };

  return (
    <div>
      <label>Choisir la figure :</label>
      <select onChange={handleFigureChange}>
        <option value="1">Figure 1 (M → P, S → M, S → P)</option>
        <option value="2">Figure 2 (P → M, S → M, S → P)</option>
        <option value="3">Figure 3 (M → P, M → S, S → P)</option>
        <option value="4">Figure 4 (P → M, M → S, S → P)</option>
      </select>
    </div>
  );
};

export default FigureSelector;
