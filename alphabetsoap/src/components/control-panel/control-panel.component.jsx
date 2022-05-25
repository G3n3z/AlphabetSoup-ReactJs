import "./control-panel.css";
import {ButtonLevel, ButtonStart, TimeLabel, PontuacaoLabel} from "../index";
//import { useState } from "react";
function ControlPanel(props) {
    
    const {estado, onStartGame, onStopGame, level, onLevel, time, pontuacao, handleUpdatePont, intervalRef, loseGameForTime} = props;
    //const [activeLevel, setActiveLevel] = useState(["","",""]);
    //const [levelClicked, setLevelClicked] = useState(0);
    const buttons = [
        {
            "class": "button-30",
            "id" : "principiante",
            "text" : "Nivel Principiante",
        },
        {
            "class": "button-30",
            "id" : "medio",
            "text" : "Nivel Médio", 
        },
        {
            "class": "button-30",
            "id" : "avancado",
            "text" : "Nivel Avançado",
        }
    ];
    const pressed = (id) =>{

   
        if(level === id){
            onLevel(0);
        }else
            onLevel(id);

    }

    /**
     * Funcao que faz começar ou terminar o jogo. Esta funcao e chamada pelo ButtonStart
     * Inicia o jogo ou termina consoante o estado atual do jogo
     */
    const play = () => {
        //console.log("lets Play")
        if(level !== 0 && estado === 0)
        { 
           onStartGame();

        }
        else{
            onStopGame();
            clearInterval(intervalRef.current);
        }
    }
    return(
        
        <section id="panel-control">
          <div className="Titulo">
            <h3 >Sopa de Letras</h3>
          </div>
          <form className="form">
            <ButtonLevel classStyle = {buttons[0].class} id={buttons[0].id} text = {buttons[0].text} number = {1} level = {level} estado = {estado} handlePress={pressed} />
            <ButtonLevel classStyle = {buttons[1].class} id={buttons[1].id} text = {buttons[1].text} number = {2} level = {level} estado = {estado} handlePress={pressed}/>
            <ButtonLevel classStyle = {buttons[2].class} id={buttons[2].id} text = {buttons[2].text} number = {3} level = {level} estado = {estado} handlePress={pressed} />
          </form>
          <div className="form-metadata">
            <div className="score-timeDiv">
                <TimeLabel estado = {estado} time = {time} level = {level} loseGameForTime= {loseGameForTime} intervalRef = {intervalRef}/>
                <PontuacaoLabel estado = {estado} pontuacao = {pontuacao} handleUpdatePont = {handleUpdatePont}></PontuacaoLabel>
            </div>
            <ButtonStart play= {play} estado = {estado} levelChoose = {level}></ButtonStart>
          </div>
        </section>
      
    );

    
}

export default ControlPanel;