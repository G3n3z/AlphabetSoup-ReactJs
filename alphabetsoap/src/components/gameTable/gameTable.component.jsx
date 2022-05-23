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
    const {lines, columns, grid, tabela, words, handleWordSelect} = props;
    //const {lines, columns, grid} = props;
    const [mouseDown, setMouseDown] = useState(false);

    let letters = [];
    const letterSelected = [];
    const [lettersSelected, setLettersSelected] = useState([]);
    let orientacao;
    const handleMouseDown = (char, lin, col, handleSelect) => {
        //console.log(char);
        setMouseDown(true);
        setLettersSelected([lin, col, char, handleSelect]);
        handleSelect(true);
        //console.log(letterSelected);
    }
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
    const handleMouseUp = () => {
        let result;
        let word = checkWord();
        if(word !== ""){
            result = "final";
            handleWordSelect(word);
        }else{
            result = false;
        }
        for(let l of letterSelected) {
            const handle = l.getSelect();
            handle(result); 
        }
        setMouseDown(false);
    }
    const includes = (aux) => {
        for (let i = 0; i < letterSelected.length; i++) {

            if((letterSelected[i].line === aux.line) && (letterSelected[i].column === aux.column)){
                return false;
            }
        }
        return true;
    }
    const isCorrectOrientation = (aux) => {
        const o = orientacao;
        if(o === findOrientation(aux, letterSelected[letterSelected.length - 1])){
            return true;
        }
        return false;
        
    }
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
                console.log("erro na orientacao");
            }
            else{ 
               orientacao = o;
               //console.log("ssadsaadasads");
            }    
        }
        //console.log(letterSelected);
    }



    return (
        <div className="table">
            <div className = {grid}>
              {(() => {
                
                //console.log(" Game Table" + props.lines +  " - " - props.columns)
                for(let i = 0; i < props.lines; i++){
                    for(let j = 0; j < props.columns;j++){
                        letters.push(<Letter line = {i} col = {j} mouseDown = {mouseDown} onMouseDown = {handleMouseDown} onMouseUp = {handleMouseUp} onMouseHover={handleMouseHover}> 
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