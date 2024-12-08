import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

export const SocrateHead = () => {
    const { t } = useTranslation(I18N_NS, { keyPrefix: 'home.socrate' });
  return (
    <div className="socratehead">
      <img
        src="./images/socrate_head.png"
        alt={t("head")}
        className="socrates-image"
      />
      <p className="explanation-text">explication</p>
    </div>
  );
};

export default SocrateHead;
