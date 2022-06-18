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


  /**
   * Funcao que comeca o jogo 
   * @param {bool} nextGame Se for true mantem a pontuacao
   * 
   */ 
  const handleStartGame = (nextGame) => {
    if(nextGame !== true || nextGame === undefined) {
      pontuacao.current = 0;
      
    }
    handleUpdatePont();
    setEstado(1);
    
  };

  /**
   * Funçao para voltar o jogo ao estado inicial
   */
  const handleStopGame = () => {
    
    if (estado !== 0) {
      //console.log("Terminou");
      setEstado(0);
      setWordAdd([]);
      
    }
  };

  /**
   * Função chamada pelo TimeLabel para sinalizar que acabou o tempo
   */
  const loseGameForTime = () => {
    setOpenModal(true);
    setGanhou(false);
    setEstado(2);
  };

  /**
   * Funcao que altera o nivel
   * @param {int} nivel valor para o qual o nivel vai ser alterado
   */
  const handleSetLevel = (nivel) => {
    setLevel(nivel);
  };
  

  /**
   * Funcao que recebe uma palavra introduzida pelo jogador e armazena num estado para depois serem usadas
   * @param {string} word palavra introduzida no InputWord para ser armazenada
   * @returns 
   */
  const handleAddWord = (word) => {
    //console.log(word);
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


  
 /**
  * Funcao que armazena o handle para a funcao que faz update à pontuacao do PontuacaoLabel
  * @param {handle} handle handle para funcao de update 
  */
  const receiveUpdatePont = (handle) => {
    handleUpdatePont = handle;
  };

  /**
   * 
   * Funcao chamada pelo gamePanel quando é necessario atualizar a pontuacao
   */
  const setUpdatePont = () => {
    handleUpdatePont();
  };


  /**
   * Funcao para fechar o modal. Usada no botao de fecho do modal
   */
  const handleCloseModal =  () => {
    setOpenModal(false);
    setGanhou(false);
  }

  /**
   * Funcao para jogar o proximo nivel
   */
  const nextGame = () =>{
    setOpenModal(false);
    setLevel(level + 1);
    setGanhou(false);
    setEstado(1);
    
  }
   /**
    * Funcao para ir para um novo jogo. Coloca o estado a 0
    */
  const newGame = () => {
    setOpenModal(false);
    setGanhou(false);
    setEstado(0);
  }

  /**
   * Funcao chamada pelo GamePanel para sinalizar que o jogador passou o nivel
   */
  const win =() => {
    clearInterval(intervalRef.current);
    setGanhou(true);
    setOpenModal(true);
    setEstado(2);  
  }


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
        modalOpen={open}
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
