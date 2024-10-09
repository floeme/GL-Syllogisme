import React from "react";
import { useNavigate } from "react-router-dom";

export const ButtonSyllogismes = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/syllogismes");
  };

  return (
    <div className="button" onClick={handleClick}>
      <h1>Vérifier Un Syllogisme</h1>
    </div>
  );
};

export default ButtonSyllogismes;
