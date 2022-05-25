import "./modal.css"
import {ButtonModal} from  "../index"
function Modal(props){

    const {isOpen, ganhou, pontuacao, tempo, handleCloseModal, level, handleNextGame, handleNewGame} = props;
    const modalClass = isOpen ? 'modal-open' : '';
    /**
     * Funcao a ser executada quando se pretende jogar o proximo nivel
     * Chama uma funcao do componente pai
     */
    const nextLevel = () => {
        handleNextGame();
    }
    /**
     * Funcao a ser executada quando se pretende jogar um novo Jogo
     * Chama uma funcao do componente pai
     */
    const newGame = () => {
        handleNewGame();
    }
    return (
        <div id="modal" className = {modalClass}>
            <div className = "titulo">
                {ganhou ? (
                <div>Ganhou</div>
                ):
                (<div>Perdeu</div>)
                }
                <div className = "buttonClose" onClick={handleCloseModal}>X</div>
            </div>
            <div className = "score">
                <div className = "pontuacao-modal">Pontuacao: {pontuacao.current}</div>
                <div className = "tempo">Tempo restante: {tempo.current}</div>      
            </div>  
            <div className = "buttonModal-container">
                <ButtonModal classN = "buttonNext " action = {newGame} >Novo Jogo</ButtonModal>
                {level < 3 && ganhou ?
                    (
                    <ButtonModal classN = "buttonNext nextLevel" action = {nextLevel} >Próximo Nivel</ButtonModal>):
                    (<div></div>)
                }
            </div>  
        </div>
    )
}
export default Modal;