import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";
import React from "react";

export const Texte1 = () => {

  const { t } = useTranslation(I18N_NS, { keyPrefix: 'home' });
  return (
      <div className="text">
          {t("text2").split('\n').map((line, index) => (
              <React.Fragment key={index}>
                  {line}
                  <br />
              </React.Fragment>
          ))}
      </div>
  );
};

export default Texte1;
