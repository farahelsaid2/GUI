import useSensor from "./useSensor";

function Sensors_Reading(){
    const sensors = useSensor("ws://localhost:8080")

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

    console.log("Current sensors state:", sensors);

return(
        <>
        <div className="sensor-content">
        <p className={`${getColorClass(sensors.volt) ?? 0}`}> Voltage into the car = {sensors.volt ?? 'Not connected'}</p>
        <p className={`${getColor(sensors.current)}`}> Current consumed by car = {sensors.current ??'Not connected'}  </p>
        <p> IMU reading = {sensors.IMU ? sensors.IMU.join(", ") : "Not connected"}</p>
        </div>
        </>
       );

}
export default Sensors_Reading; 