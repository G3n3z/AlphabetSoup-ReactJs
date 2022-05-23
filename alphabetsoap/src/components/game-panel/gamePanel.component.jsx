import {GameTable, WordsPanel, Modal} from "../index"
import { useState } from "react";
import "./gamePanel.css"

class Word{
  constructor(word, handleState){
    this.word = word;
    this.handleState = handleState;
  }
  get word(){
    return this._word;
  }
  set word(val){
    this._word = val;
  }
  get handleState(){
    return this._handleState;
  }
  set handleState(val){
    this._handleState = val;
  }
}



function GamePanel(props) {

  let wordsChildren = [];
  let rightWords = 0;


  const {estado, level, onStartGame, onStopGame, nLin, nCol, grid, tab, words, pontuacao, time, handleSetPont} = props;
  const [open , setOpenModal] = useState(false);
  const [ganhou, setGanhou] = useState(false);
 
  function putWordSelect(w){
    console.log("putWordSelect");
    for(let i=0; i<wordsChildren.length; i++){
      if(w === wordsChildren[i].word){
        wordsChildren[i].handleState(true);
      }
    }
    //console.log(w);
    rightWords++;
    pontuacao.current = pontuacao.current + (w.length * 5);
    console.log(pontuacao.current);
    handleSetPont(pontuacao.current);
    console.log(rightWords + " - " + wordsChildren.length)
    if(rightWords === wordsChildren.length){
        setOpenModal(true); 
        setGanhou(true); 
    }
  }
  function includes(aux){
    for(let w of wordsChildren){
      if(w.word === aux.word){
        return true;
      }
    }
    return false;
  }
  function getHandleWordPanel( handleWordState, word){
    const aux = new Word(word, handleWordState);
    if(!includes(aux))
      wordsChildren.push(aux);
  }
  

  return (
    <div className="gameContainer">
                  { (estado !== 0) ? ( <div className="GamePanel">
                      <GameTable id = "gameTable" lines = {nLin} columns = {nCol} grid = {grid}  tabela = {tab} words = {words}
                      handleWordSelect = {putWordSelect}/>
                      <WordsPanel id = "wordsPanel" words = {words} setHandleWordPanel={getHandleWordPanel}/>
                    </div>)
                    :( <div></div> )
                  }
                  <Modal isOpen = {open} ganhou = {ganhou} pontuacao = {pontuacao} tempo = {time}/>
    </div>
  );
}
export default GamePanel;