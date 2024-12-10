import { useState } from "react";
import { useTranslation } from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

export const TextSlider = () => {
    const { t } = useTranslation(I18N_NS, { keyPrefix: 'home' });

    // Récupérer tous les textes depuis i18n
    const texts = [
        t("text1"),
        t("text2"),
        t("text3")
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? texts.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === texts.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="text-slider">
            <div className="group">
                {/* Flèche gauche */}
                <button className="arrow left" onClick={goToPrevious}>
                    &#8592; {/* Flèche gauche */}
                </button>

                {/* Conteneur central */}
                <div className="center">
                    <div className="text">{texts[currentIndex]}</div>
                    <div className="dots">
                        {texts.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                            ></span>
                        ))}
                    </div>
                </div>

                {/* Flèche droite */}
                <button className="arrow right" onClick={goToNext}>
                    &#8594; {/* Flèche droite */}
                </button>
            </div>
        </div>
    );
};
