import React from "react"
import Connection from "./connection"
import Sensors_Reading from "./Sensors_Reading.jsx";

function App() {

  return (
    <>
      <div>
      <h1> Dashboard </h1>
      <Connection/>
      <Sensors_Reading/>
      </div>
    </>
  )
}

export default App;
