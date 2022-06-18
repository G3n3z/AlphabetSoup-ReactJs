import {useState, useEffect} from 'react'
import './word.css'
import {BACKGROUNDCOLOR} from '../../constants/index'
function Word(props) {

    const [state, setState] = useState("")
    const [backgroundColor, setBackgroundColor] = useState(undefined);
    const {indexColor} = props;

    /**
     * Sempre que é renderizado, envia para o GamePanel a sua palavra e uma referencia para alterar um dos seu estados
     */
    useEffect(() =>{
        props.setHandleWordPanel(changeState, props.children);
    })
    /**
     * Sempre que e atualizado o nivel repoe os estados para os valores iniciais, pois senão quando pretendiamos alterar passar de nivel
     * ,mantinha as mesmas formações anteriores
     */
    useEffect(() => {        
        setState("");
        setBackgroundColor(undefined);
    },[props.level])

    /**
     * Funcao que altera o estado consoante o parametro. Se for true fica no estado terminal
     * @param {bool} bool valor para saber se é para alterar o estado para o terminal ou nao
     */
    const changeState = (bool) => {
        if(bool === true) {
            setState("done");
            indexColor.current = (indexColor.current + 1) % BACKGROUNDCOLOR.length;
            setBackgroundColor({
                color: `rgb(${BACKGROUNDCOLOR[indexColor.current]})`
            });
            //console.log("Word"  + indexColor.current);
            
        }
        else{
            setState("");
        }
        //console.log("Fui selecionada " + props.children);
    }

    return (
        <div className= {`${state}`} style={backgroundColor}>
            {props.children}
        </div>
    )
}

export default Word;