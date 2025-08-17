import { useState, useEffect, useRef } from "react";

function Sensors_Reading(){
    const socketRef = useRef (null);
    const [sensors, setSensors ]= useState({volt:null, ampere: null, tiltation: null});

    useEffect( () => {

        socketRef.current = new WebSocket("ws://127.0.0.1:8080");

        socketRef.current.onopen = () => {
            console.log('Connected to display sensors');
        };
        
       socketRef.current.onmessage = (event) => {
        console.log('Message : ', event.data);
        if (message.type==='sensors') {
            setSensors(message.data);
        }
       };

       socketRef.current.onclose = () => {
        console.log('sensor not connected');
       };

           return () => {
           socketRef.current.close();
           };
    }, [] )

return(
        <>
        <h1> Voltage into the car = {sensors.volt} </h1>
        <h1> Current consumed by car = {sensors.ampere} </h1>
        <h1> IMU reading = {sensors.tiltation} </h1>
        </>
       );

}
export default Sensors_Reading;