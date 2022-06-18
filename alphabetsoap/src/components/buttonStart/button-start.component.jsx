import "./button-start.css"
import { useState, useEffect } from "react";
function ButtonStart(props) {
    const {estado, modalOpen} = props;
    
    const [clicked, setClicked] = useState("");

    /**
     * Funcao despertada quando existe um click e que avisa o controlPanel da 
     * intencao de inicio de jogo
     */
    const click = () =>{
        if(modalOpen === true){
            return;
        }
        props.play();     
    }

    useEffect(() => {
        if(modalOpen){
            setClicked("activeButton");   
        }else{
            setClicked("");
        }
    }, [modalOpen])
    return(
        <div className={`buttonStart ${clicked}`} onClick = {click}>{estado === 0 ? "Iniciar Jogo" : "Terminar Jogo"}</div>
    );
}

export default ButtonStart;