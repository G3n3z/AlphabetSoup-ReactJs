import "./letter.css";
import { useState, useEffect} from "react";

function Letter(props) {
    const [finalState, setFinalState] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const {line, col, mouseDown,onMouseDown, onMouseHover, onMouseUp} = props;
    let style = "";
    const isMouseHouver = (event) =>{
        if(mouseDown){
            onMouseHover(props.children, line, col, handleSetSelected);
            
        }
        
    }
    const isMouseDown = (event) =>{
        onMouseDown(props.children, line, col,handleSetSelected);
        
    }
    
    const handleSetSelected = (bool) => {

        if(bool === true){
            setSelectedState("selected");
        }else if(bool === "final"){
            setSelectedState("final");
        }
        else{
            setSelectedState("");
        }
    }
    return (
        <div id="letter" className={`letter ${selectedState}`} onMouseDown = {isMouseDown} onMouseUp={onMouseUp} >
            <p id="char"  onMouseOver = {isMouseHouver} >{props.children}</p>
        </div>
    );
}

export default Letter;