import {Word} from '../index'
function WordsPanel(props) {
    
    const {words, setHandleWordPanel, level, indexColor} = props;

    return(
        <div className="words">
            {(() => {
                let wordsShow =[];
                for (let word of words) {
                    wordsShow.push(<Word key = {word} setHandleWordPanel = {setHandleWordPanel} level = {level} indexColor = {indexColor}>
                                        {word}
                                    </Word>);
                }
                return wordsShow;
            })()}
        </div>
    );
}

export default WordsPanel