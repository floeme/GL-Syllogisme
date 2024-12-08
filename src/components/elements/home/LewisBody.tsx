import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

export const LewisBody = () => {

    const { t } = useTranslation(I18N_NS, { keyPrefix: 'home.lewis' });

  return (
    <div className="lewisbody">
      <img
        src="./images/lewis_caroll_body.png"
        alt={t("body")}
        className="lewis-image"
      />
    </div>
  );
};

export default LewisBody;