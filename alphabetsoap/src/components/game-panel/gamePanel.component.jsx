import {GameTable, WordsPanel} from "../index"
import { useState, useEffect, useRef} from "react";
import { WORDS } from "../../constants";
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

function colocaWord(tab, words, i, incX, incY, numLines, numCol) {
  let isCorrect = false;
  let posLine, posCol, initX, initY;
  let j = 0,
    tries = 0;
  while (!isCorrect) {
    if (tries === 1000) {
      return;
    }
    tries++;
    initX = Math.floor(Math.random() * numLines);
    initY = Math.floor(Math.random() * numCol);
    posLine = initX;
    posCol = initY;
    if (tab[posLine][posCol] !== " ") {
      continue;
    }
    for (j = 0; j < words[i].length; j++) {
      posLine += incX;
      posCol += incY;
      if (
        posLine < 0 ||
        posLine >= numLines ||
        posCol < 0 ||
        posLine >= numCol
      ) {
        break;
      }
      if (tab[posLine][posCol] !== " ") {
        break;
      }
    }
    if (j === words[i].length) isCorrect = true;
  }
  for (let j = 0; j < words[i].length; j++) {
    tab[initX][initY] = words[i][j];
    initX += incX;
    initY += incY;
  }
}

function fillWords(tab, words, nLin, nCol) {
  let orientation; // 0 - horizontal E->D, 1 - horizontal E<-D , 2 - vertical C->B, 3 - vertical B->C,
  // 4 - Diagonal C->B E->D, 5 -> Diagonal C->B D->E, 6 -> Diagonal B->C E->D, 7 -> Diagonal B->C D->E
  for (let i = 0; i < words.length; i++) {
    orientation = Math.floor(Math.random() * 7);
    switch (orientation) {
      case 0:
        colocaWord(tab, words, i, 0, 1, nLin, nCol);
        break;
      case 1:
        colocaWord(tab, words, i, 0, -1, nLin, nCol);
        break;
      case 2:
        colocaWord(tab, words, i, 1, 0, nLin, nCol);
        break;
      case 3:
        colocaWord(tab, words, i, -1, 0, nLin, nCol);
        break;
      case 4:
        colocaWord(tab, words, i, 1, 1, nLin, nCol);
        break;
      case 5:
        colocaWord(tab, words, i, 1, -1, nLin, nCol);
        break;
      case 6:
        colocaWord(tab, words, i, -1, 1, nLin, nCol);
        break;
      case 7:
        colocaWord(tab, words, i, -1, -1, nLin, nCol);
        break;
      default:
        break;
    }
  }
}





function GamePanel(props, ref) {

  const [wordss, setWords] = useState([]);
  const [nLines, setNlines] = useState(10);
  const [nColls, setNColls] = useState(10);
  const [cGrid, setCGrid] = useState("");
  const [tabuleiro, setTabuleiro] = useState([]);
  let wordsChildren = [];
  let rightWords = 0;
  let nLin = 10, nCol = 10, grid = "";
  let tab, numberWords;
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let words = [];

  const {estado, level, pontuacao, time, handleSetPont, handleWin, ganhou, wordAdd} = props;
  //const [open , setOpenModal] = useState(false);
  //const [ganhou, setGanhou] = useState(false);
  const indexColor = useRef(0);

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
        handleWin();
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

   /*  Geracao de Palavras*/
   const randomLetters = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  function generateTable() {
    tab = Array(nLin)
      .fill(" ")
      .map((row) => new Array(nCol).fill(" "));
    fillWords(tab, words, nLin, nCol);
    for (let i = 0; i < nLin; i++) {
      for (let j = 0; j < nCol; j++) {
        if (tab[i][j] === " ") tab[i][j] = randomLetters();
      }
    }
  }

  function getWords() {
    words = [];
    let word, random;
    let numberWordsAdd = wordAdd.length;

    for (let i = 0; i < numberWordsAdd && i < numberWords; i++) {
      words.push(wordAdd[i]);
    }

    for (let i = 0; i < numberWords - numberWordsAdd; i++) {
      random = Math.floor(Math.random() * WORDS.length);
      word = WORDS[random];
      if ((level === 1 && word.length > 6) || words.includes(word)) {
        i--;
        continue;
      }

      words.push(word);
    }
  }
  const preparaTabuleiro = () => {
    if (level === 1) {
      nLin = nCol = 10;
      grid = "gridprincipiante";
      numberWords = 4;
    } else if (level === 2) {
      nLin = nCol = 15;
      grid = "gridmedio";
      numberWords = 6;
    } else if (level === 3) {
      nLin = nCol = 20;
      grid = "gridavancado";
      numberWords = 8;
    } else {
      return;
    }

    getWords();
    generateTable();
    
  };





  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // }

  // const nextGame = () => {
  //   handleSetLevel(level + 1)
  //   onStopGame();
  //   onStartGame(true);
  //   setGanhou(false);
  //   setOpenModal(false);
  // };
  // const newGame = () => {
  //   onStopGame();
  //   setGanhou(false);
  //   setOpenModal(false);
  // }


  useEffect(() => {
    if(estado !== 1)
    return
    preparaTabuleiro();
    console.log(tab)
    setTabuleiro(tab);
    setWords(words);
    setCGrid(grid);
    setNColls(nCol);
    setNlines(nLin);
    
  }, [estado]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="gameContainer">
                  { (estado !== 0) ? ( <div className="GamePanel">
                      <GameTable  id = "gameTable" lines = {nLines} columns = {nColls} grid = {cGrid}  tabela = {tabuleiro} words = {wordss} level = {level}
                      handleWordSelect = {putWordSelect} estado = {estado} time = {time} ganhou={ganhou} indexColor = {indexColor}/>
                      <WordsPanel id = "wordsPanel" words = {wordss} ganhou = {ganhou} setHandleWordPanel={getHandleWordPanel} level = {level} indexColor = {indexColor}/>
                    </div>)
                    :( <div></div> )
                  }
                  {/* <Modal isOpen = {open} ganhou = {ganhou} pontuacao = {pontuacao} tempo = {time} level = {level} handleCloseModal = {handleCloseModal}
                  handleNextGame = {nextGame} handleNewGame = {newGame}/> */}
    </div>
  );
}
export default GamePanel;