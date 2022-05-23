import {useState} from 'react'

function InputWord (props){
    const {word} = props;

    function addWord(e){
        
        if(e.key ==="Enter"){
            props.handleAddWord(e.target.value);    
            document.getElementById('inputText').value = "";         
        }
    }
    //props.ref.current = word;
    //word.map(w => <p>{w}</p>);
    
    return (
        <div className="input">
            <div className="input-words" >{
                (() => {
                    let output = [];
                    let i = '1';
                    for(let w of word){
                        output.push(<p key = {i++}>{w}</p>)
                    }
                    return output;
                })()
            }</div>
            <input id="inputText" onKeyPress = {addWord} type="text"
            placeholder="Palavra a adicionar:"></input>
        </div>
    );
};

export default InputWord;