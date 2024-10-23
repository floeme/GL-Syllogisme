import { NavLink } from "react-router-dom";
import ChooserLanguage from "./ChooserLanguage";

export const Navigation = () => {
  const onChange = (chars: string) => {
    console.log("Selected: "+chars);
  };
  return (
    <div className="container-nav">
      <h1 className="Name">Syllogismator</h1>
      <div className="navigation">
        <ul>
          {/* je fais l'action de la barre lors de la selection ici pour invoquer le css */}
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to="/syllogism"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Syllogismes</li>
          </NavLink>
          <NavLink
            to="/polysyllogismes"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Polysyllogismes</li>
          </NavLink>
          <NavLink
            to="/quantifiers"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Quantifiers</li>
          </NavLink>
        </ul>
      </div>
      <ChooserLanguage callbackLang={onChange}/>
    </div>
  );
};

export default Navigation;
