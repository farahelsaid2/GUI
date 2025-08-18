
/* import {useRef} from 'react'

function Cone() {

  const startConnection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/start");
      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error("Error starting communication:", error);
    }
  };

  const endConnection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/end");
      const data = await response.json();
      alert(data.message);
    
    } catch (error) {
      console.error("Error shutting down communication:", error);
    }
  };

  return (
    <div>
      <button onClick={startConnection}>
        Start Communication
      </button>
      <button onClick={endConnection}>
        End Communication
      </button>
    </div>
  );
}

export default Cone; */
