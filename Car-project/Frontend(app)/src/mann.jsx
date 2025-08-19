import { useState, useEffect, useRef } from "react"; 

function Manual() { 
  const [manualActive, setManualActive] = useState(false); 
  const [connectionStatus, setConnectionStatus] = useState("Disconnected"); 
  const [alert, setAlert] = useState(""); 
  const socket = useRef(null); 
  const alertTimeout = useRef(null); 

  const Alert = (msg) => { 
    setAlert(msg); 
    if (alertTimeout.current) clearTimeout(alertTimeout.current); 
    alertTimeout.current = setTimeout(() => setAlert(""), 3000); 
  }; 

  useEffect(() => { 
    socket.current = new WebSocket("ws://127.0.0.1:8080/ws"); 

    socket.current.onopen = () => { 
      console.log("Connected successfully"); 
      setConnectionStatus("Connected"); 
    }; 

    socket.current.onmessage = (event) => console.log("From Arduino:", event.data); 

    socket.current.onerror = (err) => { 
      console.error("WebSocket error:", err); 
      Alert("WebSocket error"); 
      setConnectionStatus("Error"); 
    }; 

    socket.current.onclose = () => { 
      console.log("Connection closed"); 
      Alert("WebSocket disconnected"); 
      setConnectionStatus("Disconnected"); 
    }; 

    return () => { 
      socket.current.close(); 
      if (alertTimeout.current) clearTimeout(alertTimeout.current); 
    }; 
  }, []); 

  const sendCommand = (cmd, msg, ignoreManual = false) => { 
    if ((manualActive || ignoreManual) && socket.current?.readyState === WebSocket.OPEN) { 
      socket.current.send(cmd); 
      console.log(msg); 
      Alert(msg); 
    } else { 
      Alert("Cannot send command: Not connected or manual mode off"); 
    } 
  }; 

  const enterManual = () => { 
    if (!manualActive) { 
      setManualActive(true); 
      sendCommand("MOD:M", "MANUAL MODE IS ACTIVATED", true); 
    } else { 
      Alert("Manual mode is already activated"); 
    } 
  }; 

  const exitManual = () => { 
    if (manualActive) { 
      sendCommand("MOT:E", "EXITING MANUAL MODE"); 
      setManualActive(false); 
    } else { 
      Alert("Manual mode already deactivated"); 
    } 
  }; 

  useEffect(() => { 
    const handleKeyDown = (e) => { 
      const key = e.key.toLowerCase(); 
      if (key === "mod:m") enterManual(); 
      else if (key === "mot:e") exitManual(); 
      else if (!manualActive) return; 

      switch (key) { 
        case "w": sendCommand("MOT:F", "GOING FORWARD"); break; 
        case "s": sendCommand("MOT:B", "GOING BACKWARD"); break; 
        case "a": sendCommand("MOT:L", "GOING LEFT"); break; 
        case "d": sendCommand("MOT:R", "GOING RIGHT"); break; 
        case " ": sendCommand("MOT:S", "CAR STOPPED"); break; 
        case "h": sendCommand("SPE:H", "HIGH SPEED ACTIVATED"); break;
        case "l": sendCommand("SPE:L", "LOW SPEED ACTIVATED"); break;
        case "m": sendCommand("SPE:M", "MED SPEED ACTIVATED"); break;
        default: break; 
      } 
    }; 

    window.addEventListener("keydown", handleKeyDown); 
    return () => window.removeEventListener("keydown", handleKeyDown); 
  }, [manualActive]); 

  return ( 
    <> 
      <div> 
        <div>Manual Mode: {manualActive ? "ON" : "OFF"}</div> 
        <div>Connection: {connectionStatus}</div> 
        <div> 
          {[ 
            { label: manualActive ? "Manual Mode ON" : "Manual Control", onClick: enterManual, disabled: false }, 
            { label: "Forward", onClick: () => sendCommand("MOT:F", "GOING FORWARD") }, 
            { label: "Backward", onClick: () => sendCommand("MOT:B", "GOING BACKWARD") }, 
            { label: "Left", onClick: () => sendCommand("MOT:L", "GOING LEFT") }, 
            { label: "Right", onClick: () => sendCommand("MOT:R", "GOING RIGHT") }, 
            { label: "Stop", onClick: () => sendCommand("MOT:S", "CAR STOPPED") }, 
            { label: 'HIGH SPEED', onClick: () => sendCommand("SPE:H", "HIGH SPEED ACTIVATED") }, 
            { label: 'LOW SPEED', onClick: () => sendCommand("SPE:L", "LOW SPEED ACTIVATED") }, 
            { label: 'MED SPEED', onClick: () => sendCommand("SPE:M", "MED SPEED ACTIVATED") }, 
            { label: "Exit Manual", onClick: exitManual } 
          ].map((btn, i) => ( 
            <button key={i} className="Buttons" onClick={btn.onClick} disabled={btn.disabled ?? (!manualActive || connectionStatus !== "Connected")}> 
              {btn.label} 
            </button> 
          ))} 
        </div> 
        {alert && <div>{alert}</div>} 
      </div> 
    </> 
  ); 
} 

export default Manual;