import { useEffect, useState, useRef } from "react";

function useSensor (url){

    const socketRef = useRef (null);
    const [sensors, setSensors ]= useState({});

    useEffect( () => {

        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log('Connected to display sensors');
        };
        
       socketRef.current.onmessage = (event) => {
          try {
        const data = JSON.parse(event.data);
        setSensors(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to parse sensor data:", err);
        }
       };

       socketRef.current.onclose = () => {
        console.log('sensor not connected');
       };

           return () => {
           socketRef.current.close();
           };
    }, [url] )

return sensors;
}
export default useSensor; 