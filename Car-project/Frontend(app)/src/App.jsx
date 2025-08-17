import React from "react"
import Connection from "./connection"
import Sensors_Reading from "./Sensors_Reading.jsx";
import Manual from "./Manual.jsx";

function App() {

  return (
    <>
      <div>
      <h1 className="header"> Control Panel </h1>
      <Connection/>
      <Manual/>
      <Sensors_Reading/>
      
      </div>
    </>
  )
}

export default App;
