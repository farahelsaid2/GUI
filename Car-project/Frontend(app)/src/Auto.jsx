import { useState, useEffect, useRef } from "react";




function Auto (){
    const ws = useRef(null)

     useEffect(() => {
        ws.current= new WebSocket("ws://127.0.0.1:8080")

        ws.current.onopen = () => {
            console.log('Websocket connected for autonomous')
        }

        ws.current.onclose = () => {
            console.log('Websocket connection closed')
        }

        ws.current.onerror = (err) => {
            console.error ('Error:' , err);
            
        }

    return () => { 
      ws.current.close(); 
    }; 
 },[])



    const autoControl = () => {
        if (ws.current.readyState === WebSocket.OPEN){
            ws.current.send("MOD:AUTO");
            console.log("Auto command sent")
        }
        else {
            console.log('Command not sent')
        }
    }
     
        
    return(
        <button onClick={autoControl}> Autonomous </button>
    );
}
export default Auto;