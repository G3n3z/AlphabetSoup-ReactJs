import "./assets/styles/App.css";
import {ControlPanel, GamePanel, InputWord, Modal} from "./components/index"
import { useState, useRef, useEffect } from "react";
import {WORDS} from './constants/index'



function colocaWord(tab,words, i, incX, incY, numLines, numCol){
  let isCorrect = false;
  let posLine, posCol, initX, initY;
  let j = 0, tries = 0;
  while(!isCorrect){
    if(tries === 1000){
      return;
    }
    tries++;
    initX = Math.floor(Math.random() * numLines)  
    initY = Math.floor(Math.random() * numCol);
    posLine = initX;
    posCol = initY;
    if(tab[posLine][posCol] !== " "){
      continue;
    }    
    for(j = 0; j < words[i].length; j++) {
      posLine+=incX;
      posCol+=incY;
      if(posLine < 0 || posLine >= numLines || posCol < 0 || posLine >= numCol){
        break;
      }
      if(tab[posLine][posCol] !== " "){
        break;
      }
      
    }
    if(j === words[i].length)
      isCorrect =true;
  }
  for(let j = 0; j< words[i].length; j++) {
    tab[initX][initY] = words[i][j];
    initX+=incX;
    initY+=incY;
  }
  
}

function fillWords(tab, words, nLin, nCol){
  let orientation; // 0 - horizontal E->D, 1 - horizontal E<-D , 2 - vertical C->B, 3 - vertical B->C, 
                  // 4 - Diagonal C->B E->D, 5 -> Diagonal C->B D->E, 6 -> Diagonal B->C E->D, 7 -> Diagonal B->C D->E
  for(let i = 0; i < words.length; i++){
    orientation = Math.floor(Math.random()*7);
    switch(orientation){
      case 0: colocaWord(tab,words, i,0,1,nLin, nCol);
              break;
      case 1: colocaWord(tab,words, i,0,-1,nLin, nCol);
              break;
      case 2: colocaWord(tab,words, i,1,0,nLin, nCol);
              break;
      case 3: colocaWord(tab,words, i,-1,0,nLin, nCol);
              break;
      case 4: colocaWord(tab,words, i, 1,1,nLin, nCol);
              break;
      case 5: colocaWord(tab,words, i, 1, -1,nLin, nCol);
              break;
      case 6: colocaWord(tab,words, i,-1, 1,nLin, nCol);
              break;
      case 7: colocaWord(tab,words, i, -1, -1,nLin, nCol);
              break;
      default: break;
    }
  }
}


function App() {
  const [estado, setEstado] = useState(0);
  const [level, setLevel] = useState(0); // 0 - inicio;  1 - jogar; 2 - Terminou
  const time = useRef();
  const pontuacao = useRef(0);
  const [wordAdd, setWordAdd] = useState([]);
  const [pont, setPont] = useState(0);
  let nLin = 10, nCol = 10,  grid = ""; 
  let tab, numberWords;
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let words = [];
  let handleUpdatePont;
  const handleStartGame = () => {
    if(estado === 0){
      setEstado(1);
    }
  }
  const handleStopGame = () => {
    if(estado === 1){
      console.log("Terminou");
      setEstado(0);
      setWordAdd([]);
    }
  }
  const handleSetLevel = (nivel) => {
    setLevel(nivel);
  }

  const handleAddWord = (word) => {
    console.log(word);
    let words = [];
    for(let w of wordAdd){
        words.push(w);
      if(w === word){
        return;
      }
    }
    
    words.push(word);
    setWordAdd(words);
  }


  /*  Geracao de Palavras*/
  const randomLetters = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  function generateTable() {
      tab = Array(nLin).fill(" ").map(row => new Array(nCol).fill(" "));
      fillWords(tab, words, nLin, nCol);
      for (let i = 0; i < nLin; i++) {
        for (let j = 0; j < nCol; j++){
          if(tab[i][j] === " ")  
            tab[i][j] = randomLetters();
        } 
      }
  }

  function getWords(){
    words = [];
    let word, random;
    let numberWordsAdd = wordAdd.length;
    
    for(let i = 0; i < numberWordsAdd && i < numberWords; i++){
      words.push(wordAdd[i]);
    }

    for(let i = 0; i < numberWords-numberWordsAdd; i++){
      random = Math.floor(Math.random() * WORDS.length);
      word = WORDS[random];
      if((level === 1 && word.length >6) || words.includes(word)){
        i--;
        continue;
      }

      words.push(word);
    }
  }

  (() => {
    if(level === 1){
      nLin = nCol = 10;
      grid = "gridprincipiante";
      numberWords = 4;
    }else if(level === 2){
      nLin = nCol = 15;
      grid ="gridmedio";
      numberWords = 6;
    }
    else if(level === 3){
      nLin = nCol = 20;
      grid ="gridavancado";
      numberWords = 8;
    }else{
      return;
    }
    getWords();
    generateTable();
    pontuacao.current = 0;  
  })();

  const receiveUpdatePont = (handle) => {
    handleUpdatePont = handle;
  }
  
  useEffect(() => {
    handleUpdatePont();
  },[pont])

  const setUpdatePont = (p) => {
    console.log("In app.js" + p);
    handleUpdatePont();
  }

  return (
    <div id = "container">
        <ControlPanel estado = {estado} onStartGame = {handleStartGame} onStopGame = {handleStopGame} level = {level} onLevel = {handleSetLevel} 
        time = {time} pontuacao = {pontuacao} handleUpdatePont= {receiveUpdatePont}></ControlPanel>
        <GamePanel estado = {estado} level = {level} onStartGame = {handleStartGame} onStopGame = {handleStopGame}
        nLin = {nLin} nCol = {nCol} grid = {grid} words={words} tab = {tab} pontuacao ={pontuacao} time = {time} handleSetPont = {setUpdatePont}/>
        
        {estado === 0 ? <InputWord word = {wordAdd} handleAddWord = {handleAddWord}/> : <div></div>}
        
    </div>
  );
}

export default App;
