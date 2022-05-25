import "./assets/styles/App.css";
import { ControlPanel, GamePanel, InputWord, Modal } from "./components/index";
import { useState, useRef } from "react";




function App() {
  const [estado, setEstado] = useState(0); // 0 - inicio;  1 - jogar; 2 -fim de jogo
  const [level, setLevel] = useState(0); 
  const time = useRef();
  const pontuacao = useRef(0);
  const intervalRef = useRef();
  const [wordAdd, setWordAdd] = useState([]);
  
  const [ganhou, setGanhou] = useState(false);
  const [open , setOpenModal] = useState(false);

  let handleUpdatePont;



  const handleStartGame = (nextGame) => {
    if(nextGame !== true || nextGame === undefined) {
      pontuacao.current = 0;
      
    }
    handleUpdatePont();
    setEstado(1);
    
  };
  const handleStopGame = () => {
    
    if (estado !== 0) {
      console.log("Terminou");
      setEstado(0);
      setWordAdd([]);
      
    }
  };

  const loseGameForTime = () => {
    setOpenModal(true);
    setGanhou(false);
    setEstado(2);
  };

  const handleSetLevel = (nivel) => {
    setLevel(nivel);
  };
  

  const handleAddWord = (word) => {
    console.log(word);
    let words = [];
    for (let w of wordAdd) {
      words.push(w);
      if (w === word) {
        return;
      }
    }

    words.push(word);
    setWordAdd(words);
  };



 

  // (() => {
  //   if(estado === 0)
  //     return;
  //   if(level === 1){
  //     nLin = nCol = 10;
  //     grid = "gridprincipiante";
  //     numberWords = 4;
  //   }else if(level === 2){
  //     nLin = nCol = 15;
  //     grid ="gridmedio";
  //     numberWords = 6;
  //   }
  //   else if(level === 3){
  //     nLin = nCol = 20;
  //     grid ="gridavancado";
  //     numberWords = 8;
  //   }else{
  //     return;
  //   }
  //   getWords();
  //   generateTable();
  //   //pontuacao.current = 0;

  // })();

  

  const receiveUpdatePont = (handle) => {
    handleUpdatePont = handle;
  };


  const setUpdatePont = (p) => {
    handleUpdatePont();
  };

  const handleCloseModal =  () => {
    setOpenModal(false);
    setGanhou(false);
  }

  const nextGame = () =>{
    setOpenModal(false);
    setLevel(level + 1);
    setGanhou(false);
    setEstado(1);
    
  }

  const newGame = () => {
    setOpenModal(false);
    setGanhou(false);
    setEstado(0);
  }

  const win =() => {
    clearInterval(intervalRef.current);
    setGanhou(true);
    setOpenModal(true);
    setEstado(2);  
  }

  // useEffect(() => {

  //   if(estado === 1){
  //     if(stateNextGame === true){
  //       handleStartGame(true); 
  //       setNextGame(false);
  //     }
  //     else{
  //       handleStartGame();
  //     }
  //       handleUpdatePont();
  //   }
  // }, [estado, stateNextGame,handleUpdatePont])
  return (
    <div id="container">
      <ControlPanel
        estado={estado}
        onStartGame={handleStartGame}
        onStopGame={handleStopGame}
        level={level}
        onLevel={handleSetLevel}
        time={time}
        pontuacao={pontuacao}
        handleUpdatePont={receiveUpdatePont}
        intervalRef = {intervalRef}
        loseGameForTime = {loseGameForTime}
      ></ControlPanel>
      <GamePanel 
        estado={estado}
        level={level}
        pontuacao={pontuacao}
        time={time}
        handleSetPont={setUpdatePont}
        handleWin = {win}
        ganhou= {ganhou}
        wordAdd = {wordAdd}
      />

      {estado === 0 ? (
        <InputWord word={wordAdd} handleAddWord={handleAddWord} />
      ) : (
        <div></div>
      )}
      <Modal isOpen = {open} ganhou = {ganhou} pontuacao = {pontuacao} tempo = {time} level = {level} handleCloseModal = {handleCloseModal}
                  handleNextGame = {nextGame} handleNewGame = {newGame}/>
      
    </div>
  );
}

export default App;
