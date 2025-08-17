function Manual (){

const manual = () => {}
const Forward = () => {
    if (manualActive) {}
}
const Back = () => {
    if (manualActive) {}
}
const Left = () => {
    if (manualActive) {}
}
const Right = () => {
    if (manualActive) {}
}


    return(
        <>
        <button className="Buttons" onClick={manual}> Manual Control </button>
        <button className="Buttons" onClick={Forward}> Forward </button>
        <button className="Buttons" onClick={Back}> Backward </button>
        <button className="Buttons" onClick={Left}> Left </button>
        <button className="Buttons" onClick={Right}> Right </button>
        </>
    )
}
export default Manual;