function Connection(){
    const start = async () => {
        try {
            const response = await fetch('/api/start');
            const data = await response.json();
            alert(data.message);
        }
        catch (error){
            console.error('Error while starting', error)
        }
    }

    const end = async () => {
        try {
            const response = await fetch('/api/end');
            const data = await response.json();
            alert(data.message)
        }
        catch (error){
            console.error('Error while shut down',error)
        }
    }
    
    return(
        <>
        <div>
        <button onClick={start} className="Buttons"> Start Connection </button>
        <button onClick={end} className="Buttons"> End Connection </button>
        </div>
        </>
    );
}
export default Connection;