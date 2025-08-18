/* import useSensor from "./useSensor";

function Sensors_Reading(){
    const sensors = useSensor("ws://127.0.0.1:8080/ws")
    const ultrasonic = useSensor('ultrasonic', "ws://127.0.0.1:8080") 

        const getColorClass = (value) => {
        if (value < 4) return 'low';
        if (value < 11) return 'medium';
        else return 'high';
        }

        const getColor= (value) => {
        if (value < 2) return 'low';
        if (value < 5) return 'medium';
        else return 'high';
        }

        const getClass = (value) => {
        if (value < -90) return 'low';
        if (value < 90) return 'medium';
        else return 'high';
        }

return(
        <>
        <div className="sensor">
        <div className="sensor-content">
        <p className={`${getColorClass(sensors.volt)}`}> Voltage into the car = {sensors.volt ?? 'Not connected'}</p>
        <p className={`${getColor(sensors.current)}`}> Current consumed by car = {sensors.current ??'Not connected'}  </p>
        <p className={`${getClass(sensors.IMU)}`}> IMU reading = {sensors.IMU ??'Not connected'}</p>
        </div>
        </div>
        </>
       );

}
export default Sensors_Reading; */