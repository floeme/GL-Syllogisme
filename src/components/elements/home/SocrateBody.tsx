import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

export const SocrateBody = () => {

    const { t } = useTranslation(I18N_NS, { keyPrefix: 'home.socrate' });

  return (
    <div className="socratebody">
      <img
        src="./images/socrate_body.png"
        alt={t("body")}
        className="socrates-image"
      />
    </div>
  );
};

export default SocrateBody;
