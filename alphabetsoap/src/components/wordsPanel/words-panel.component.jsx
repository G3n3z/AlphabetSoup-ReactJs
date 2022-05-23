import {Word} from '../index'
function WordsPanel(props) {
    
    const {words, setHandleWordPanel} = props;
    
    

    return(
        <div className="words">
            {(() => {
                let wordsShow =[];
                for (let word of words) {
                    wordsShow.push(<Word setHandleWordPanel = {setHandleWordPanel}>{word}</Word>);
                }
                return wordsShow;
            })()}
        </div>
    );
}

export default WordsPanel