type FuncType = {
    callbackLang : CallableFunction
}
type Lang = {
    name: string;
    val: string;
}

const langList = [
    {
        name : "Francais",
        val: "FR"
    },
    {
        name : "English",
        val : "EN"
    }];

export const chooserLanguage = (props: FuncType) => {

    let selected: string = localStorage.getItem("lang") ?? "EN";

    localStorage.setItem("lang", selected);

    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        props.callbackLang(e.currentTarget.value);
        localStorage.setItem("lang", e.currentTarget.value);
        selected = e.currentTarget.value;
    };

  return (
    <div>
      <h1>LANGUE</h1>
        <select defaultValue={selected} onChange={onChange}>
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
