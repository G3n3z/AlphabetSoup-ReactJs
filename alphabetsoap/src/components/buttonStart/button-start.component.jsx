import "./button-start.css"
import { useState } from "react";
function ButtonStart(props) {
    const {estado} = props;
    
    const [clicked, setClicked] = useState("");

    /**
     * Funcao despertada quando existe um click e que avisa o controlPanel da 
     * intencao de inicio de jogo
     */
    const click = () =>{
        props.play();     
    }
    return(
        <div className={`buttonStart ${clicked}`} onClick = {click}>{estado === 0 ? "Iniciar Jogo" : "Terminar Jogo"}</div>
    );
}

export default ButtonStart;