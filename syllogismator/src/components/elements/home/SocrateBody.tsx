import {useTranslation} from "react-i18next";

export const SocrateBody = () => {

    const { t } = useTranslation('translation', { keyPrefix: 'home.socrate' });

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
