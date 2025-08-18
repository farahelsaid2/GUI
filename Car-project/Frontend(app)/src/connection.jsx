/* function Connection(){
    
    const start = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/start');
            const data = await response.json();
            alert(data.message);
        }
        catch (error){
            console.error('Error while starting', error);
        }
    }

          wsRef.current = new WebSocket("ws://127.0.0.1:8080/ws");

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        console.log("From Arduino:", event.data);
      };

      wsRef.current.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
    } catch (error) {
      console.error("Error starting communication:", error);
    }
  };

    const end = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/end');
            const data = await response.json();
            alert(data.message);
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
export default Connection; */