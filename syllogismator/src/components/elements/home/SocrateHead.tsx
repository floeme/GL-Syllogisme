import {useTranslation} from "react-i18next";

export const SocrateHead = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'home.socrate' });
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
