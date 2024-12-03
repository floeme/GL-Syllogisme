import { NavLink } from "react-router-dom";
import FlagSelect from "./FlagSelect";
import {useTranslation} from "react-i18next";
import {ROUTES} from "../../../constants/routes.ts";
import {I18N_NS} from "../../../i18n.ts";

export const Navigation = () => {
  const onChange = (Lang: string) => {
    console.log("Selected: "+Lang);
  };
  const { t } = useTranslation(I18N_NS, { keyPrefix: 'navigation.menu' });
  return (
    <div className="container-nav">
      <h1 className="name">Syllogismator</h1>
      <div className="navigation">
        <ul>
          {/* je fais l'action de la barre lors de la selection ici pour invoquer le css */}
          <NavLink
            to={ROUTES.home}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("home")}</li>
          </NavLink>
          <NavLink
            to={ROUTES.syllogism}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("syllogism")}</li>
          </NavLink>
          <NavLink
            to={ROUTES.polysyllogisms}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("polysyllogism")}</li>
          </NavLink>
          <NavLink
            to={ROUTES.quantifiers}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("quantifiers")}</li>
          </NavLink>
          <NavLink
            to={ROUTES.table}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("syllogism_table")}</li>
          </NavLink>
          <NavLink
            to={ROUTES.documentation}
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>{t("documentation")}</li>
          </NavLink>
        </ul>
      </div>
      <FlagSelect callbackLang={onChange}/>
    </div>
  );
};

export default Navigation;
