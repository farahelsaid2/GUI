import React from "react"
import Sensors_Reading from "./Sensors_Reading.jsx";
import Manual from "./mann.jsx";

function App() {

  return (
    <>
      <div>
      <h1 className="header"> Control Panel </h1>
     <Manual/>
      <Sensors_Reading/>
      </div>
    </>
  )
}

export default App;
