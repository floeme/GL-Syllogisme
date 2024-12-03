import {Figure} from "../../../../model/Figure"

interface SyllogismFigureProps {
    figure: Figure
    setFigure: (value: Figure) => void
}

function SyllogismTerms({figure, setFigure}: SyllogismFigureProps) {
    return (
        <div className="section-figures">
            <SyllogismFigureItem figure={Figure.Figure1} checked={figure === Figure.Figure1} onChecked={setFigure}/>
            <SyllogismFigureItem figure={Figure.Figure2} checked={figure === Figure.Figure2} onChecked={setFigure}/>
            <SyllogismFigureItem figure={Figure.Figure3} checked={figure === Figure.Figure3} onChecked={setFigure}/>
            <SyllogismFigureItem figure={Figure.Figure4} checked={figure === Figure.Figure4} onChecked={setFigure}/>
        </div>
    )
}

export default SyllogismTerms


interface SyllogismFigureItemProps {
    figure: Figure;
    checked: boolean
    onChecked: (f: Figure) => void;
}

function SyllogismFigureItem({figure, checked, onChecked}: SyllogismFigureItemProps) {
    const checkFigureItem = () => onChecked(figure);

    const classNames = "figure" + (checked ? " figure--selected" : "");

    return <div className={classNames} onClick={checkFigureItem}>
        <label>Figure {figure + 1}</label>
        <div>
            <div>{figure === Figure.Figure2 || figure === Figure.Figure4 ? "P    →    M" : "M    →    P"}</div>
            <div>{figure === Figure.Figure1 || figure === Figure.Figure2 ? "S    →    M" : "M    →    S"}</div>
            <div>S    →    P</div>
        </div>
        <input type="radio"
               name="radioFigure"
               value={figure}
               checked={checked}
               onChange={checkFigureItem}
        />
    </div>
}