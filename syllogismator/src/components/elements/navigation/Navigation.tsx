import { NavLink } from "react-router-dom";
import ChooserLanguage from "./ChooserLanguage";
import {useTranslation} from "react-i18next";

export const Navigation = () => {
  const onChange = (chars: string) => {
    console.log("Selected: "+chars);
  };
  const { t } = useTranslation('translation', { keyPrefix: 'navigation.menu' });
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
            <li>{t("home")}</li>
          </NavLink>
          <NavLink
            to="/syllogism"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("syllogism")}</li>
          </NavLink>
          <NavLink
            to="/polysyllogismes"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("polysyllogism")}</li>
          </NavLink>
        </ul>
      </div>
      <ChooserLanguage callbackLang={onChange}/>
    </div>
  );
};

export default Navigation;
