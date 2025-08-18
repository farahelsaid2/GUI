import { useState, useEffect, useRef } from "react";

function Manual() {
  const [manualActive, setManualActive] = useState(false);
  const socket = useRef(null);
  const alertTimeout = useRef(null);
  const [alert, setAlert] = useState(""); // single alert

  const Alert = (msg) => {
    setAlert(msg);
    if (alertTimeout.current) clearTimeout(alertTimeout.current);
    alertTimeout.current = setTimeout(() => setAlert(""), 1000); // show for 1s
  };

  useEffect(() => {
    socket.current = new WebSocket("ws://127.0.0.1:8080/ws");

    socket.current.onopen = () => console.log("Connected successfully");
    socket.current.onmessage = (event) => console.log("From Arduino:", event.data);

    return () => socket.current.close();
  }, []);

  const manual = () => setManualActive(!manualActive);

  const sendCommand = (cmd, msg) => {
    if (manualActive && socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(cmd);
      console.log(msg);
      Alert(msg);
    } else {
      Alert("Cannot send: Manual mode inactive or not connected");
    }
  };

  return (
    <>
      <button className="Buttons" onClick={manual}>
        {manualActive ? "Manual Mode ON" : "Manual Control"}
      </button>
      <button className="Buttons" onClick={() => sendCommand("F", "GOING FORWARD")}>Forward</button>
      <button className="Buttons" onClick={() => sendCommand("B", "GOING BACKWARD")}>Backward</button>
      <button className="Buttons" onClick={() => sendCommand("L", "GOING LEFT")}>Left</button>
      <button className="Buttons" onClick={() => sendCommand("R", "GOING RIGHT")}>Right</button>
      <button className="Buttons" onClick={() => sendCommand("S", "CAR STOPPED")}>Stop</button>
      <button className="Buttons" onClick={() => {
        if (manualActive) sendCommand("E", "EXITING MANUAL MODE");
        else Alert("Manual mode is already deactivated");
        setManualActive(false);
      }}>Exit Manual</button>

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
          fontWeight: 'bold'
        }}>
          {alert}
        </div>
      )}
    </>
  );
}

export default Manual;

