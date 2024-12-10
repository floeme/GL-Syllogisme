import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Lang = {
  name: string;
  val: string;
  flagUrl: string; 
};

type FuncType = {
  callbackLang: (lang: string) => void;
};

const langList: Lang[] = [
  { name: 'Français', val: 'fr', flagUrl: 'images/flagFR.svg' },
  { name: 'English', val: 'en', flagUrl: 'images/flagUK.svg' },
];

const LanguageSelector: React.FC<FuncType> = ({ callbackLang }) => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<Lang>(
    langList.find((lang) => lang.val === i18n.language) || langList[0]
  );

  const handleLanguageChange = (lang: Lang) => {
    i18n.changeLanguage(lang.val); 
    setSelectedLang(lang); 
    callbackLang(lang.val); 
  };

  return (
    <div className="langue">
      <div
        className="select"
        style={{ backgroundImage: `url(${selectedLang.flagUrl})` }}
        onClick={() => {
          const nextLang = selectedLang.val === 'fr' ? langList[1] : langList[0];
          handleLanguageChange(nextLang);
        }}
      ></div>
    </div>
  );
};

export default LanguageSelector;