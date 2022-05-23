import {useState, useEffect} from 'react'
import './word.css'
function Word(props) {

    const [state, setState] = useState("")

    useEffect(() =>{
        props.setHandleWordPanel(changeState, props.children);
    })
    
    const changeState = (bool) => {
        if(bool === true) {
            setState("done");
        }
        else{
            setState("");
        }
        console.log("Fui selecionada " + props.children);
    }
    return (
        <div className= {`${state}`}>
            {props.children}
        </div>
    )
}

export default Word;