import "./control-panel.css";
import {ButtonLevel, ButtonStart, TimeLabel, PontuacaoLabel} from "../index";
import { useState } from "react";
function ControlPanel(props) {
    
    const {estado, onStartGame, onStopGame, level, onLevel, time, pontuacao, handleUpdatePont} = props;
    const [activeLevel, setActiveLevel] = useState(["","",""]);
    //const [levelClicked, setLevelClicked] = useState(0);
    const buttons = [
        {
            "class": "button-30",
            "id" : "principiante",
            "text" : "Nivel Principiante",
            "active" : ""
        },
        {
            "class": "button-30",
            "id" : "medio",
            "text" : "Nivel Médio", 
            "active" : ""
        },
        {
            "class": "button-30",
            "id" : "avancado",
            "text" : "Nivel Avançado",
            "active" : ""
        }
    ];
    const pressed = (id) =>{

        console.log(id);
        let arr = [];
        for(let i = 0; i < buttons.length; i++){
            if(buttons[i].id === id){
                //arr.push("active"); 
                if(activeLevel[i]=== "active"){
                    arr.push("");
                    onLevel(0);
                }
                else{
                    arr.push("active")
                    onLevel(i+1);
                }               
            }
            else
                arr.push("");

        }
        // for (let i = 0; i < 3 ; i++){
        //     if(activeLevel[i] === )
        // }
        setActiveLevel(arr);
        //setLevelClicked(true);
    }
    const play = () => {
        //console.log("lets Play")
        if(level !== 0 && estado === 0)
            onStartGame();
        else if(estado === 1){
            onStopGame();
        }
    }
    return(
        
        <section id="panel-control">
          <div className="Titulo">
            <h3 >Sopa de Letras</h3>
          </div>
          <form className="form">
            <ButtonLevel classStyle = {buttons[0].class} id={buttons[0].id} text = {buttons[0].text} active = {activeLevel[0]} estado = {estado} handlePress={pressed} />
            <ButtonLevel classStyle = {buttons[1].class} id={buttons[1].id} text = {buttons[1].text} active = {activeLevel[1]} estado = {estado} handlePress={pressed}/>
            <ButtonLevel classStyle = {buttons[2].class} id={buttons[2].id} text = {buttons[2].text} active = {activeLevel[2]} estado = {estado} handlePress={pressed} />
          </form>
          <div className="form-metadata">
            <TimeLabel time = {time}/>
            <PontuacaoLabel estado = {estado} pontuacao = {pontuacao} handleUpdatePont = {handleUpdatePont}></PontuacaoLabel>
            <ButtonStart play= {play} estado = {estado} levelChoose = {level}></ButtonStart>
          </div>
        </section>
      
    );

    
}

export default ControlPanel;