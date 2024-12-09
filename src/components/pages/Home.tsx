import ButtonSyllogismes from "../elements/home/ButtonSyllogismes";
import {useTranslation} from "react-i18next";
import LewisBody from "../elements/home/LewisBody";
import {I18N_NS} from "../../i18n.ts";
import {TextSlider} from "../elements/home/TextSlider.tsx";

export const Home = () => {
  const { t } = useTranslation(I18N_NS, { keyPrefix: 'home' });

  return (
      <div className="home">
        <div className="content-home">
          <div className="left-section">
            <div className="left-container">
              <div className="title">
                <h1>{t("discover")}</h1>
                <h1 className="color2">{t("discover2")}</h1>
              </div>
              <ButtonSyllogismes/>
            </div>
          </div>
          <div className="right-section">
            <TextSlider/>
            <LewisBody/>
          </div>
        </div>
      </div>
  );
};

export default Home;
