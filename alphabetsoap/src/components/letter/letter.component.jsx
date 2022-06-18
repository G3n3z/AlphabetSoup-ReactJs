import "./letter.css";
import { useState, useEffect} from "react";
import {BACKGROUNDCOLOR} from "../../constants/index"
function Letter(props) {
    const [selectedState, setSelectedState] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(undefined);
    const [mouseOverClass, setMouseOverClass] = useState(false);
    const {line, col, mouseDown,onMouseDown, onMouseHover, onMouseUp, indexColor, estado} = props;

    /**
     * Detecta quando existe um mouseOver e caso o estado de mouseClick esteja pressionado envia para o componente pai
     * a sua letra, linha, coluna, e um handle para modificar o seu estado
     * @param {*} event 
     * @returns 
     */
    const isMouseHouver = (event) =>{
        if(selectedState === "final" ){
            return;
        }
        if(mouseDown){
            onMouseHover(props.children, line, col, handleSetSelected); 
        }
        
    }

    /**
     * É executada quando é pressionado o botao do rato e envia para o componente pai 
     * a sua letra, linha, coluna, e um handle para modificar o seu estado
     * Ira corresponder a primeira letra de uma palavra
     * @param {*} event 
     * @returns 
     */
    const isMouseDown = (event) =>{
        if(selectedState === "final" ){
            return;
        }
        onMouseDown(props.children, line, col,handleSetSelected);
        
    }
    

    /**
     * 
     * @param {bool or string} bool consoante o valor enviado, altera o estado interno do componente para mudar o seu estilo 
     */
    const handleSetSelected = (bool) => {

        if(bool === true){
            setSelectedState("selected");
        }else if(bool === "final"){
            setSelectedState("final");
            setBackgroundColor({
                backgroundColor: `rgb(${BACKGROUNDCOLOR[indexColor.current]})`
            });
            //console.log(indexColor.current);
        }
        else{
            setSelectedState("");
        }
    }

    /** 
     * Sempre que o nivel é alterado, repoe os seus estados
     */
    useEffect(() => {
        setSelectedState("");
        setBackgroundColor(undefined);
        setMouseOverClass("");
    }, [props.level])
    
    /**
     * Quando termina o jogo, modifica um dos estados para nao ficar um letra com o estilo de mouseOver
     */
    useEffect(() => {
        if(estado === 2){
            setMouseOverClass("");
        }
    }, [estado])


    /**
     * Funcao que deteta o mouseOver e atribui um estilo
     * @returns 
     */
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
    /**
     * Funcao que deteta o mouseLeave e remove o estilo
     * @returns 
     */
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