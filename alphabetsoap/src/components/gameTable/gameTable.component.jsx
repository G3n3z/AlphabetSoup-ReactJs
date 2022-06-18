import "./gameTable.css"
import {Letter} from "../index"
import { useState} from "react";

class Cell{
    constructor(line, column, char, select){
        this.line = line;
        this.column = column;
        this.character = char;
        this.select = select;
    }
    set line(l){
        this._line = l;
    }
    get line(){
        return this._line;
    }
    set column(c){
        this._column = c;
    }
    get column(){
        return this._column;
    }

    get  char(){
        return this._character;
    }
    set char(c){
        this._character = c;
    }
    getSelect(){
        return this.select;
    }
}
                  // 0 - horizontal E->D, 1 - horizontal E<-D , 2 - vertical C->B, 3 - vertical B->C, 
                  // 4 - Diagonal C->B E->D, 5 -> Diagonal C->B D->E, 6 -> Diagonal B->C E->D, 7 -> Diagonal B->C D->E
function findOrientation(letterSelected1, letterSelected0){
    let dy = letterSelected1.line - letterSelected0.line;
    let dx = letterSelected1.column - letterSelected0.column;
    
    if(dx === 1 && dy === 0){
        return 0;
    }else if(dx === -1 && dy ===0){
        return 1;
    }else if(dx === 0 && dy ===1){
        return 2;
    }else if(dx === 0 && dy === -1){
        return 3;
    }else if(dx === 1 && dy ===1){
        return 4;
    }else if(dx === -1 && dy ===1){
        return 5;
    }else if(dx === 1 && dy ===-1){
        return 6;
    }else if(dx === -1 && dy === -1){
        return 7;
    }else{
        return -1;
    }

}

function GameTable(props){
    const {grid, tabela, words, handleWordSelect, level, estado, ganhou, time, indexColor} = props;
    //const {lines, columns, grid} = props;
    const [mouseDown, setMouseDown] = useState(false);

    let letters = [];
    const letterSelected = [];
    const [lettersSelected, setLettersSelected] = useState([]);
    let orientacao;

    /**
     * Funcao que recebe valores de um Letter quando o mesmo é pressionado com o rato e altera o estado do botao pressionado para true
     * @param {*} char character
     * @param {*} lin linha
     * @param {*} col coluna
     * @param {*} handleSelect handle para funcao que altera altera o estado
     * @returns 
     */
    const handleMouseDown = (char, lin, col, handleSelect) => {
        //console.log(char);
        if(ganhou === true || time.current === 0){
            return;
        }
        setMouseDown(true);
        setLettersSelected([lin, col, char, handleSelect]);
        handleSelect(true);
        //console.log(letterSelected);
    }

    /**
     * Funcao que verifica se a palvavra recolhida é alguma das pretendidas.
     * Verifica a palavra de frente para tras e de tras para a frente
     * @returns retorna a palavra pela ordem correta ou uma string vazia caso não tenha correspondecia com nenhuma palavra
     */
    const checkWord = () => {
        let word1="", word2="";
        for(let l of letterSelected) {
            word1 += l.character;   
                        
        }
        word2 = word1.split("").reverse().join("");
        for(let w of words){
            if(w === word1){
                return word1;
            }
            if(w === word2){
                return word2;
            }
        }
        return "";
    }

    /**
     * Funcao que do qual é avisada que houve um mouseUp num Letter, logo tem de se verificar a palavra selecionada
     * Altera o estado do mouseDown para false
     * @returns 
     */
    const handleMouseUp = () => {
        if(ganhou === true || time.current === 0){
            return;
        }
        let result;
        let word = checkWord();
        if(word !== ""){
            result = "final";
            handleWordSelect(word);
        }else{
            result = false;
            lettersSelected[3]("");
            setLettersSelected([]);
        }
        for(let l of letterSelected) {
            const handle = l.getSelect();
            handle(result); 
        }
        setMouseDown(false);
    }

    /**
     * É executada quando existe um mouseExit no gameTable para se o utilizador tiver a selecionar uma palavra
     * e sair com o rato do tabuleiro, resetar o estado das Letter pelas quais passou
     */
    const mouseExit = () => {
        for(let l of letterSelected) {
            const handle = l.getSelect();
            handle(""); 
        }
        setMouseDown(false);
    }

    /**
     * Funcao que verifica se já existe aquele Letter no array de letras selecionadas
     * @param {Cell} aux Class que contem informacoes sobre um Letter
     * @returns true se nao existir
     */
    const includes = (aux) => {
        for (let i = 0; i < letterSelected.length; i++) {

            if((letterSelected[i].line === aux.line) && (letterSelected[i].column === aux.column)){
                return false;
            }
        }
        return true;
    }

    /**
     * Funcao que verifica se a orientacao da Nova Letter corresponde à correta
     * @param {Cell} aux nova Letter selecionada 
     * @returns true se a orientacao calculada corresponder À anterior
     */
    const isCorrectOrientation = (aux) => {
        const o = orientacao;
        if(o === findOrientation(aux, letterSelected[letterSelected.length - 1])){
            return true;
        }
        return false;
        
    }

    /**
     * Funcao que invocada por ter ocorrido um mouseOver em uma Letter, do qual recebe informação sobre a mesma
     * @param {*} char caracter
     * @param {*} lin linha
     * @param {*} col coluna
     * @param {*} handleSelect handle para funcao que altera o estado da Letter
     */
    const handleMouseHover = (char, lin, col, handleSelect) => {
        const aux = new Cell(lin, col, char, handleSelect);
        let o;
        if(letterSelected.length === 0){
            letterSelected.push(new Cell(lettersSelected[0],lettersSelected[1],lettersSelected[2], lettersSelected[3]));
            
        }
        if(includes(aux)) {   
            
            if(letterSelected.length > 1)
            {   if(letterSelected.length === 2){
                    //console.log("erro");
                }
                if(isCorrectOrientation(aux)){
                    letterSelected.push(aux);
                    handleSelect(true);
                }
                
            }else{
                letterSelected.push(aux);
                handleSelect(true);
            }        
        }
        if(letterSelected.length === 2){
            o = findOrientation(letterSelected[1], letterSelected[0]);
            if(o === -1){
                //erro  na orientacao
                //console.log("erro na orientacao");
            }
            else{ 
               orientacao = o;
               //console.log("ssadsaadasads");
            }    
        }
        //console.log(letterSelected);
    }

    

    return (
        <div className="table" >
            <div className = {grid} onMouseLeave = {mouseExit}>
              {(() => {
                if(estado === 0 || tabela === undefined || tabela.length === 0){
                    return <div></div>;
                }
                //console.log(" Game Table" + props.lines +  " - " - props.columns)
                for(let i = 0; i < props.lines; i++){
                    for(let j = 0; j < props.columns;j++){
                        letters.push(<Letter line = {i} col = {j} key ={`${i} + ${j}`} mouseDown = {mouseDown} onMouseDown = {handleMouseDown} onMouseUp = {handleMouseUp} 
                        onMouseHover={handleMouseHover} level = {level} indexColor = {indexColor} estado = {estado}> 
                                         {tabela[i][j]}
                                    </Letter>);
                    }
                }
                
                return letters;
              })()}
              </div>
        </div>
    );


}
export default GameTable;