import React from "react"
import Sensors_Reading from "./Sensors_Reading.jsx";
import Manual from "./Manual.jsx";
import Camera from "./Camera.jsx";
import Auto from "./Auto.jsx"



function App() {

  return (
    <>
    <div>
    <h1 className="header"> Control Panel </h1>
    <Manual/>
    <div className="panel">
    <Sensors_Reading/>
    <Camera/>
    </div> 
    <Auto/>
    </div>
    </>
  )
}

export default App;
