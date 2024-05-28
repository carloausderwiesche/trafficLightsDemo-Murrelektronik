import React, { useState, useEffect } from "react";
import TrafficLight from "./components/TrafficLight";
import { Button, Box } from "@mui/material";
import { yellow } from "@mui/material/colors";

function App() {
  const [ColorTrafficLight1, setColorTrafficLight1] = useState("green");
  const [ColorTrafficLight2, setColorTrafficLight2] = useState("red");

  return (
    <div className="w-screen h-screen p-10 bg-gray-300">
      <h1 className="text-center font-bold text-5xl mb-10">Traffic Lights</h1>
      <Button variant="contained" color="primary" size="large">
        Start
      </Button>

      <div className="m-10">
        <TrafficLight color={ColorTrafficLight1} />
        <TrafficLight color={ColorTrafficLight2} />
      </div>
    </div>
  );
}

export default App;
