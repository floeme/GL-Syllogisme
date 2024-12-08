import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

export const Texte1 = () => {

  const { t } = useTranslation(I18N_NS, { keyPrefix: 'home' });
  return (
    <div className="text">
      <p className="explanation-text">
        {t("text1")}
      </p>
    </div>
  );
};

export default Texte1;
