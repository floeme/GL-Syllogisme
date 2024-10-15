import {useTranslation} from "react-i18next";

export const Texte1 = () => {

  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  return (
    <div className="socratetext">
      <p className="explanation-text">
        {t("text1")}
      </p>
    </div>
  );
};

export default Texte1;
