import "./modal.css"
function Modal(props){

    const {isOpen, ganhou, pontuacao, tempo} = props;
    const modalClass = isOpen ? 'modal-open' : '';
    return (
        <div id="modal" className = {modalClass}>
            <div className = "title">
                {ganhou ? (
                <div>Ganhou</div>
                ):
                (<div>Perdeu</div>)
                }
                <div className = "buttonClose">X</div>
            </div>
            <div>Pontuacao: {pontuacao.current}</div>
            <div>Tempo restante: {tempo.current}</div>           
        </div>
    )
}
export default Modal;