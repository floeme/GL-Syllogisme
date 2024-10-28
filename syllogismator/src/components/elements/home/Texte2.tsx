import {useTranslation} from "react-i18next";

export const Texte2 = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'home' });
  return (
    <div className="text">
      <p className="explanation-text">
          {t("text2")}
      </p>
    </div>
  );
};

export default Texte2;
