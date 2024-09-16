import React from "react";
import Navigation from "../components/Navigation";
import Syllogism from "../components/Syllogism";

const Syllogismes = () => {
  return (
    <div className="Syllogism">
      <Navigation />
      <div className="content">
        <Syllogism />
      </div>
    </div>
  );
};

export default Syllogismes;
