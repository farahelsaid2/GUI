import { useEffect, useState, useRef } from "react";

function useSensor (name,url){

const socketRef = useRef (null);
    const [sensors, setSensors ]= useState(null);

    useEffect( () => {

        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log('Connected to display sensors');
        };
        
       socketRef.current.onmessage = (event) => {
        console.log('Message : ', event.data);
        const data = JSON.parse(event.data);
        if (data[name] !== undefined) {
            setSensors(data[name])
        }
       };

       socketRef.current.onclose = () => {
        console.log('sensor not connected');
       };

           return () => {
           socketRef.current.close();
           };
    }, [name,url] )

return{
    name,
    sensors
}
}
export default useSensor;