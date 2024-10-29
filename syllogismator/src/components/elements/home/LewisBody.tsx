import {useTranslation} from "react-i18next";

export const LewisBody = () => {

    const { t } = useTranslation('translation', { keyPrefix: 'home.lewis' });

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