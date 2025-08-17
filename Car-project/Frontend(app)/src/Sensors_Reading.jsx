import useSensor from "./useSensor";

function Sensors_Reading(){
    const volt = useSensor('volt',"ws://127.0.0.1:8080")
    const current = useSensor('current', "ws://127.0.0.1:8080")
    const IMU = useSensor('IMU', "ws://127.0.0.1:8080")
    /* const ultrasonic = useSensor('ultrasonic', "ws://127.0.0.1:8080") */

        const getColorClass = (value) => {
        if (volt.sensors < 4) return 'low';
        if (volt.sensors < 11) return 'medium';
        else return 'high';
        }

        const getColor= (value) => {
        if (current.sensors < 2) return 'low';
        if (current.sensors < 5) return 'medium';
        else return 'high';
        }

        const getClass = (value) => {
        if (IMU.sensors < -90) return 'low';
        if (IMU.sensors < 90) return 'medium';
        else return 'high';
        }

return(
        <>
        <div className="sensor">
        <div className="sensor-content">
        <p className={`${getColorClass(volt.sensors)}`}> Voltage into the car = {volt.sensors ?? 'Not connected'}</p>
        <p className={`${getColor(current.sensors)}`}> Current consumed by car = {current.sensors ??'Not connected'}  </p>
        <p className={`${getClass(IMU.sensors)}`}> IMU reading = {IMU.sensors ??'Not connected'}</p>
        </div>
        </div>
        </>
       );

}
export default Sensors_Reading;