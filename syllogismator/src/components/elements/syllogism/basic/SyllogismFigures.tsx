import { Figure } from "../../../../model/Figure"

interface SyllogismFigureProps {
    figure: Figure
    setFigure: (value: Figure) => void
}

function SyllogismTerms({ figure, setFigure }: SyllogismFigureProps) {
    return (
        <div className="section-figures">
            {/* FIGURE 1 */}
            <div className="figure">
                <label>Figure 1</label>
                <img src="/images/figure1.png" alt="Figure 1" />
                <input type="radio"
                    name="radioFigure"
                    value={Figure.Figure1}
                    checked={figure === Figure.Figure1}
                    onChange={() => {setFigure(Figure.Figure1)}}
                />
            </div>

            {/* FIGURE 2 */}
            <div className="figure">
                <label>Figure 2</label>
                <img src="/images/figure2.png" alt="Figure 2" />
                <input type="radio"
                    name="radioFigure"
                    value={Figure.Figure2}
                    checked={figure === Figure.Figure2}
                    onChange={() => setFigure(Figure.Figure2)}
                />
            </div>

            {/* FIGURE 3 */}
            <div className="figure">
                <label>Figure 3</label>
                <img src="/images/figure3.png" alt="Figure 3" />
                <input type="radio"
                    name="radioFigure"
                    value={Figure.Figure3}
                    checked={figure === Figure.Figure3}
                    onChange={() => setFigure(Figure.Figure3)}
                />
            </div>

            {/* FIGURE 4 */}
            <div className="figure">
                <label>Figure 4</label>
                <img src="/images/figure4.png" alt="Figure 4" />
                <input type="radio"
                    name="radioFigure"
                    value={Figure.Figure4}
                    checked={figure === Figure.Figure4}
                    onChange={() => setFigure(Figure.Figure4)}
                />
            </div>
        </div>
    )
}

export default SyllogismTerms
