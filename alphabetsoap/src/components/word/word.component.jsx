import {useState, useEffect} from 'react'
import './word.css'
import {BACKGROUNDCOLOR} from '../../constants/index'
function Word(props) {

    const [state, setState] = useState("")
    const [backgroundColor, setBackgroundColor] = useState(undefined);
    const {indexColor} = props;
    useEffect(() =>{
        props.setHandleWordPanel(changeState, props.children);
    })
    useEffect(() => {        
        setState("");
        setBackgroundColor(undefined);
    },[props.level])

    const changeState = (bool) => {
        if(bool === true) {
            setState("done");
            indexColor.current = (indexColor.current + 1) % BACKGROUNDCOLOR.length;
            setBackgroundColor({
                color: `rgb(${BACKGROUNDCOLOR[indexColor.current]})`
            });
            console.log("Word"  + indexColor.current);
            
        }
        else{
            setState("");
        }
        console.log("Fui selecionada " + props.children);
    }

    return (
        <div className= {`${state}`} style={backgroundColor}>
            {props.children}
        </div>
    )
}

export default Word;