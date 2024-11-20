import { useEffect, useState } from "react"
import QuantifierSelector from "../../QuantifierSelector"
import { Quantifier } from "../../../../model/Quantifier"
import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../../i18n.ts";

interface SyllogismMP2Props {
    MP1FirstTerm: string
    MP1SecondTerm: string
    MP2FirstTerm: string
    setMP2FirstTerm: (value: string) => void
    MP2SecondTerm: string
    setMP2SecondTerm: (value: string) => void
    quantifier: Quantifier
	setProp2Quantifier: (value: Quantifier) => void
	verb: string
	setVerb: (value: string) => void
}

function SyllogismMP2({
    MP1FirstTerm,
    MP1SecondTerm,
    MP2FirstTerm, setMP2FirstTerm,
    MP2SecondTerm, setMP2SecondTerm,
    quantifier, setProp2Quantifier,
	verb, setVerb
}: SyllogismMP2Props) {
    const [selected1, setSelected1] = useState(false)
    const [selected2, setSelected2] = useState(false)
    const [manual1, setManual1] = useState(false)
    const [manual2, setManual2] = useState(false)

    const { t } = useTranslation(I18N_NS);

    useEffect(() => {
        if ((selected1 || manual1) && MP2FirstTerm == "") {
            setSelected1(false)
            setSelected2(false)
            setManual1(false)
            setManual2(false)
            setMP2SecondTerm("")
        }
        if ((selected2 || manual2) && MP2SecondTerm == "") {
            setSelected1(false)
            setSelected2(false)
            setManual1(false)
            setManual2(false)
            setMP2FirstTerm("")
        }
    }, [MP2FirstTerm, MP2SecondTerm, manual1, manual2, selected1, selected2, setMP2FirstTerm, setMP2SecondTerm])

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setMP2FirstTerm(value)

        if (value !== MP1FirstTerm && value !== MP1SecondTerm) {
            setManual1(true)
            setManual2(false)
        } else {
            setSelected1(true)
            setSelected2(false)
        }
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setMP2SecondTerm(value)

        if (value !== MP1FirstTerm && value !== MP1SecondTerm) {
            setManual1(false)
            setManual2(true)
        } else {
            setSelected1(false)
            setSelected2(true)
        }
    }

    return (
        <div className="mp-container">
            <div className="mp-proposition">
                <div className="quantifier">
                    <QuantifierSelector quantifier={quantifier} setPropQuantifier={setProp2Quantifier} />
                </div>

                <div className="first-term">
                    {selected2 ? (
                        <input
                            type="text"
                            value={MP2FirstTerm}
                            onChange={(e) => setMP2FirstTerm(e.target.value)}
                            placeholder={t("input.type_term")}
                        />
                    ) : manual2 ? (
                        <select
                            value={MP2FirstTerm}
                            onChange={(e) => setMP2FirstTerm(e.target.value)}
                        >
                            <option value="" disabled>
                                {t("input.select_term")}
                            </option>
                            <option value={MP1FirstTerm}>{MP1FirstTerm}</option>
                            <option value={MP1SecondTerm}>{MP1SecondTerm}</option>
                        </select>
                    ) : (
                        <>
                            <input
                                list="first-term-list"
                                placeholder={t("input.select_type_term")}
                                value={MP2FirstTerm}
                                onChange={handleChange1}
                            />
                            <datalist id="first-term-list">
                                <option value={MP1FirstTerm} />
                                <option value={MP1SecondTerm} />
                            </datalist>
                        </>
                    )}
                </div>

                <div className="verb">
                    <input type="text"
                        name="verbTerm"
                        placeholder={t("input.enter_verb")}
                        value={verb}
                        onChange={(e) => {
                            setVerb(e.target.value)
                        }}
                    />
                </div>

                <div className="second-term">
                    {selected1 ? (
                        <input
                            type="text"
                            value={MP2SecondTerm}
                            onChange={(e) => setMP2SecondTerm(e.target.value)}
                            placeholder={t("input.enter_term")}
                        />
                    ) : manual1 ? (
                        <select
                            value={MP2SecondTerm}
                            onChange={(e) => setMP2SecondTerm(e.target.value)}
                        >
                            <option value="" disabled>
                                {t("input.select_term")}
                            </option>
                            <option value={MP1FirstTerm}>{MP1FirstTerm}</option>
                            <option value={MP1SecondTerm}>{MP1SecondTerm}</option>
                        </select>
                    ) : (
                        <>
                            <input
                                list="second-term-list"
                                placeholder={t("input.select_type_term")}
                                value={MP2SecondTerm}
                                onChange={handleChange2}
                            />
                            <datalist id="second-term-list">
                                <option value={MP1FirstTerm} />
                                <option value={MP1SecondTerm} />
                            </datalist>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SyllogismMP2
