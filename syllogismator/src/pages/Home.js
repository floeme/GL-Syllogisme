import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Navigation from "../components/Navigation";
import SocrateBody from "../components/SocrateBody";
import ButtonSyllogismes from "../components/ButtonSyllogismes";
import Texte1 from "../components/Texte1";
import Texte2 from "../components/Texte2";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [<Texte1 />, <Texte2 />];

  useEffect(() => {
    // changer l'élément
    const changeItem = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    // intervalle de temps pour changer le texte. 1000 = 1s
    const intervalId = setInterval(changeItem, 15000);
    //on clear quand on detruit le composant.
    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="home">
      <Navigation />
      <div className="content">
        <div class="left-section">
          <div className="title">
            <h1>À la découverte des </h1>
            <h1 className="color2">syllogismes</h1>
          </div>
          <ButtonSyllogismes />
        </div>
        <div className="right-section">
          <div>{items[currentIndex]}</div>
          <SocrateBody />
        </div>
      </div>
    </div>
  );
};

export default Home;
