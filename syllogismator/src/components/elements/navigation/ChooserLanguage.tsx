import {useTranslation} from "react-i18next";
import {I18N_NS} from "../../../i18n.ts";

type FuncType = {
    callbackLang : CallableFunction
}
type Lang = {
    name: string;
    val: string;
}

const langList = [
    {
        name : "Français",
        val: "fr"
    },
    {
        name : "English",
        val : "en"
    }];

export const chooserLanguage = (props: FuncType) => {

    const {i18n} = useTranslation(I18N_NS, { keyPrefix: 'navigation' });
    let selected: string = localStorage.getItem("lang") ?? "en";

    localStorage.setItem("lang", selected);

    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        props.callbackLang(e.currentTarget.value);
        localStorage.setItem("lang", e.currentTarget.value);
        selected = e.currentTarget.value;
        i18n.changeLanguage(e.currentTarget.value);
    };

  return (
    <div className="langue">
        <select className="select" defaultValue={selected} onChange={onChange}>
            {
                langList.map((lang: Lang) => {
                    return (<option key={lang.val} value={lang.val}>{lang.name}</option>)
                })
            }
        </select>
    </div>
  );
};

export default chooserLanguage;
