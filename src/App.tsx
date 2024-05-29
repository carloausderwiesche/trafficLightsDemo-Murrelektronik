// const lightSequence: LightSequence[] = [
//   { color: "red", duration: 500 },
//   { color: "redYellow", duration: 500 },
//   { color: "green", duration: 500 },
//   { color: "yellow", duration: 500 },
//   { color: "red", duration: 500 },
//   // { color: "red", duration: 1000 },
//   // { color: "redYellow", duration: 2000 },
//   // { color: "green", duration: 5000 },
//   // { color: "yellow", duration: 1000 },
//   // { color: "red", duration: 1000 },
// ];

// const pedestrianSequence: LightSequence[] = [
//   // { color: "red", duration: 1000 },
//   // { color: "green", duration: 5000 },
//   // { color: "red", duration: 1000 },
//   { color: "red", duration: 500 },
//   { color: "green", duration: 500 },
//   { color: "red", duration: 500 },
// ];
import React, { useState, useEffect } from "react";
import TrafficLight from "./components/TrafficLight";
import { Button } from "@mui/material";
import PedestrianTrafficLight from "./components/PedestrianTrafficLight";

interface LightSequence {
  color: string;
  duration: number;
}

const lightSequence: LightSequence[] = [
  { color: "red", duration: 500 },
  { color: "redYellow", duration: 500 },
  { color: "green", duration: 500 },
  { color: "yellow", duration: 500 },
  { color: "red", duration: 500 },
];

const pedestrianSequence: LightSequence[] = [
  { color: "red", duration: 500 },
  { color: "green", duration: 500 },
  { color: "red", duration: 500 },
];

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [colorTrafficLight1, setColorTrafficLight1] = useState<string>("red");
  const [colorTrafficLight2, setColorTrafficLight2] = useState<string>("red");
  const [trafficLightsRunning, setTrafficLightsRunning] =
    useState<boolean>(false);
  const [colorPedestrianLight, setColorPedestrianLight] =
    useState<string>("red");
  const [isPedestrianSequence, setIsPedestrianSequence] =
    useState<boolean>(false);
  const [stopRequested, setStopRequested] = useState<boolean>(false);

  const runLightSequence = (
    sequence: LightSequence[],
    setColor: (color: string) => void,
    callback?: () => void
  ) => {
    setTrafficLightsRunning(true);
    let totalDuration = 0;
    sequence.forEach(({ color, duration }, index) => {
      setTimeout(() => {
        setColor(color);
        if (index === sequence.length - 1 && callback) {
          callback();
        }
      }, totalDuration);
      totalDuration += duration;
    });
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const runLoop = () => {
      runLightSequence(lightSequence, setColorTrafficLight1, () => {
        setTimeout(() => {
          runLightSequence(lightSequence, setColorTrafficLight2, () => {
            setTrafficLightsRunning(false);
          });
        }, 1000);
      });
    };

    const switchToPedestrianLight = () => {
      setStopRequested(false);
      setIsPedestrianSequence(true);

      runLightSequence(pedestrianSequence, setColorPedestrianLight, () => {
        setIsPedestrianSequence(false);
      });
    };

    if (isRunning && !stopRequested && !isPedestrianSequence) {
      const totalDuration =
        lightSequence.reduce((acc, curr) => acc + curr.duration, 0) * 2 + 1000;
      interval = setInterval(runLoop, totalDuration);
      runLoop(); // Initial run
    } else if (stopRequested && !trafficLightsRunning) {
      switchToPedestrianLight();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, stopRequested, isPedestrianSequence, trafficLightsRunning]);

  const pedestrianRequest = () => {
    setStopRequested(true);
  };

  return (
    <div className="w-screen h-screen p-10 bg-gray-300">
      <h1 className="text-center font-bold text-5xl mb-10">Traffic Lights</h1>
      <div className="flex justify-center gap-4">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStart}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Start"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={pedestrianRequest}
          disabled={!isRunning || isPedestrianSequence}
        >
          Stop for Pedestrian
        </Button>
      </div>

      <div className="m-10 flex gap-10">
        <TrafficLight color={colorTrafficLight1} />
        <TrafficLight color={colorTrafficLight2} />
      </div>

      <div className="m-10 flex justify-center">
        <PedestrianTrafficLight color={colorPedestrianLight} />
      </div>
    </div>
  );
};

export default App;
