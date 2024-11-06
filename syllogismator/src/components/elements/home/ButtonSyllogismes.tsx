import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {ROUTES} from "../../../constants/routes.ts";

export const ButtonSyllogismes = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const route: string = ROUTES.syllogism;
    navigate(route);
  };

  const { t } = useTranslation('translation', { keyPrefix: 'home.syllogism' });

  return (
    <div className="button" onClick={handleClick}>
      <h1>{t('check')}</h1>
    </div>
  );
};

export default ButtonSyllogismes;
