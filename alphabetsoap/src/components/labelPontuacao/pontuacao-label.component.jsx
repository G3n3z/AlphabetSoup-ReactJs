import {useState, useEffect} from 'react';
import './pontuacao.css'
function PontuacaoLabel(props){

    const {pontuacao, estado, handleUpdatePont} = props;
    const [pont, setPont] = useState(0);
    /**
     * Atualiza a pontuacao com o valor da referencia passado pelo props
     */
    const updatePont = () => {
        setPont(pontuacao.current);
    }
    
    /**
     * Sempre que é renderizado atualiza a referencia no App para a funcao updatePont
     */
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