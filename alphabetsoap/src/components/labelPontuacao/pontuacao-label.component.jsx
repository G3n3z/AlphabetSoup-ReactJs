import {useState, useEffect} from 'react';
import './pontuacao.css'
function PontuacaoLabel(props){

    const {pontuacao, estado, handleUpdatePont} = props;
    const [pont, setPont] = useState(0);

    const updatePont = () => {
        setPont(pontuacao.current);
    }
    
    useEffect(() => {
        handleUpdatePont(updatePont);
    })


    return (
        <>
            {estado !== 0 ? 
                (<div className="pontuacao-container">
                    <div>Pontuacao:  </div>
                    <div>{pont}</div>
                </div>):
                (<div></div>)
            }
        </>
    )

}

export default PontuacaoLabel