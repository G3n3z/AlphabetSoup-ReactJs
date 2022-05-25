
function ButtonModal(props) {

    return(
        <div className={props.classN} onClick = {props.action}> {props.children}</div>
    );
}
export default ButtonModal;