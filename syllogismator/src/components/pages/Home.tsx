import { useState } from "react";
import { useEffect } from "react";

import SocrateBody from "../elements/SocrateBody";
import ButtonSyllogismes from "../elements/ButtonSyllogismes";
import Texte1 from "../elements/Texte1";
import Texte2 from "../elements/Texte2";

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [<Texte1 />, <Texte2 />];

  useEffect(() => {
    // changer l'élément
    const changeItem = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    // intervalle de temps pour changer le texte. 1000 = 1s
    const intervalId = setInterval(changeItem, 15000);
    // on clear quand on detruit le composant.
    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="home">
      <div className="content">
        <div className="left-section">
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
