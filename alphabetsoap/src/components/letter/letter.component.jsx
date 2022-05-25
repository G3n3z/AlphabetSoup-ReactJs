import "./letter.css";
import { useState, useEffect} from "react";
import {BACKGROUNDCOLOR} from "../../constants/index"
function Letter(props) {
    const [selectedState, setSelectedState] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(undefined);
    const [mouseOverClass, setMouseOverClass] = useState(false);
    const {line, col, mouseDown,onMouseDown, onMouseHover, onMouseUp, indexColor, estado} = props;

    const isMouseHouver = (event) =>{
        if(selectedState === "final" ){
            return;
        }
        if(mouseDown){
            onMouseHover(props.children, line, col, handleSetSelected); 
        }
        
    }
    const isMouseDown = (event) =>{
        if(selectedState === "final" ){
            return;
        }
        onMouseDown(props.children, line, col,handleSetSelected);
        
    }
    
    const handleSetSelected = (bool) => {

        if(bool === true){
            setSelectedState("selected");
        }else if(bool === "final"){
            setSelectedState("final");
            setBackgroundColor({
                backgroundColor: `rgb(${BACKGROUNDCOLOR[indexColor.current]})`
            });
            console.log(indexColor.current);
        }
        else{
            setSelectedState("");
        }
    }
    useEffect(() => {
        setSelectedState("");
        setBackgroundColor(undefined);
        setMouseOverClass("");
    }, [props.level])
    
    useEffect(() => {
        if(estado === 2){
            setMouseOverClass("");
        }
    }, [estado])

    const styleMouseOver = () => {
        if(mouseDown)
            return;
        if(selectedState === "final" ){
            return;
        }
        if(estado === 2){
            return;
        }
        setMouseOverClass("hover");
    }
    const styleMouseLeave = () => {

        if(selectedState === "final" ){
            return;
        }
        if(estado === 2){
            return;
        }
        setMouseOverClass("");
    }

    return (
        <div id="letter" className={`letter ${selectedState} ${mouseOverClass}`} style={backgroundColor} onMouseDown = {isMouseDown} onMouseUp={onMouseUp} 
        onMouseOver = {styleMouseOver} onMouseLeave={styleMouseLeave} >
            <p id="char"  onMouseOver = {isMouseHouver} >{props.children}</p>
        </div>
    );
}

export default Letter;