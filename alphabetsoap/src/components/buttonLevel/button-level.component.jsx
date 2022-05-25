//import React, { useState } from "react";
function ButtonLevel(props) {

    const {level, number} = props;
    const clicado = () =>{
        if(props.estado === 0)
            props.handlePress(number);      
    }
    return (
         
        <div  id = {props.id} className={`${props.classStyle} ${level === number ? "active" : ""} ${props.estado !== 0 ? " disabled" : " "}`} onClick={clicado}>{props.text}</div>
    );
}
export default ButtonLevel;