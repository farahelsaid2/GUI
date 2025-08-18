/*import { useState, useEffect, useRef} from "react";

function Manual() {
  const [manualActive, setManualActive] = useState(false);
  const socket= useRef (null);
  const alertTimeout = useRef(null);
  const [alert, setAlert] = useState(""); // single alert

  const Alert = (msg) => {
    setAlert(msg);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    alertTimeout.current = setTimeout(() => setAlert(""), 1000); 
  };


  useEffect(() => {
    socket.current = new WebSocket ("ws://127.0.0.1:8080/ws");

    socket.current.onopen = () => console.log("Connected successfully");
    socket.current.onmessage = (event) => console.log("From Arduino:", event.data);
    return () => {
      socket.current.close(); 
      console.log('Connection closed');
    }
  }, []);


  const manual = () => setManualActive(!manualActive);

  
  const Forward = () => {
    if (manualActive && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send("F");
      console.log("GOING FORWARD");
      Alert("GOING FORWARD");
    }
  };

  const Back = () => {
    if (manualActive && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send("B");
      Alert("GOING BACKWARD");
      console.log('GOING BACKWARD')
    }
  };

  const Left = () => {
    if (manualActive && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send("L");
      Alert("GOING LEFT");
      console.log('GOING LEFT')
    }
  };

  const Right = () => {
    if (manualActive && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send("R");
      Alert("GOING RIGHT");
      console.log('GOING RIGHT')
    }
  };

  const Stop = () => {
    if (manualActive && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send("S");
      Alert("CAR STOPPED");
      console.log('CAR STOPPED')
    }
  };
  const exitManual = () => {
    if (manualActive) {
        setManualActive(false);
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send("E");
        console.log("EXITING MANUAL MODE");
        Alert('EXITING MANUAL MODE')
        } }
    else{
        console.log('Manual mode is already deactivated')
        Alert("Manual mode is already deactivated")
    }
    };

  return (
    <>
      <button className="Buttons" onClick={manual}>
        {manualActive ? "Manual Mode ON" : "Manual Control"}
      </button>
      <button className="Buttons" onClick={Forward}>Forward</button>
      <button className="Buttons" onClick={Back}>Backward</button>
      <button className="Buttons" onClick={Left}>Left</button>
      <button className="Buttons" onClick={Right}>Right</button>
      <button className="Buttons" onClick={Stop}>Stop</button>
      <button className="Buttons" onClick={exitManual}>Exit Manual</button>
    {alert && (
    <div style={{
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'yellow',
    padding: '10px 20px',
    border: '1px solid black',
    borderRadius: '5px',
    fontWeight: 'bold',
    zIndex: 1000,
    transition: 'opacity 0.3s'
  }}>
    {alert}
  </div>
)}
    </>
  );
}

export default Manual; */