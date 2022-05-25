//import React, { useState } from "react";
function ButtonLevel(props) {

    const {level, number} = props;
    /**
     * Funcao executada quando existe um click e que caso o estado do jogo esteja a 0,
     *  envia o seu identificador para alterar o nivel
     */
    const clicado = () =>{
        if(props.estado === 0)
            props.handlePress(number);      
    }
    return (
         
        <div  id = {props.id} className={`${props.classStyle} ${level === number ? "active" : ""} ${props.estado !== 0 ? " disabled" : " "}`} onClick={clicado}>{props.text}</div>
    );
}
export default ButtonLevel;