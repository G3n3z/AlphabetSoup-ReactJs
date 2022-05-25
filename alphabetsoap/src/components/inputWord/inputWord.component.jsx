

function InputWord (props){
    const {word} = props;

    /**
     * Sempre que é clicado uma tecla, verifica se é a tecla enter e envia para o componente pai
     * o valor do seu input. Tambem reseta esse mesmo valor
     * @param {*} e evento
     */
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