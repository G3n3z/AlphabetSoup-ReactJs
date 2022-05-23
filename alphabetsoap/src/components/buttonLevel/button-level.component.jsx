//import React, { useState } from "react";
function ButtonLevel(props) {
    const clicado = () =>{
        if(props.estado === 0)
        props.handlePress(props.id);      
    }
    return (
         
        <div  id = {props.id} className={`${props.classStyle} ${props.active} ${props.estado !== 0 ? " disabled" : " "}`} onClick={clicado}>{props.text}</div>
    );
}
export default ButtonLevel;