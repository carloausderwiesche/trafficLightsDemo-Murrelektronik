import React, { useState, useEffect } from "react";
import TrafficLight from "./components/TrafficLight";
import { Box, Button, Container } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import PedestrianTrafficLight from "./components/PedestrianTrafficLight";

interface LightSequence {
  color: string;
  duration: number;
}

const lightSequence: LightSequence[] = [
  { color: "red", duration: 2000 },
  { color: "redYellow", duration: 2000 },
  { color: "green", duration: 5000 },
  { color: "yellow", duration: 1000 },
  { color: "red", duration: 2000 },
];

const pedestrianSequence: LightSequence[] = [
  { color: "red", duration: 1000 },
  { color: "green", duration: 5000 },
  { color: "red", duration: 2000 },
];

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [colorTrafficLight1, setColorTrafficLight1] = useState<string>("green");
  const [colorTrafficLight2, setColorTrafficLight2] = useState<string>("red");
  const [colorPedestrianLight, setColorPedestrianLight] =
    useState<string>("red");
  const [isPedestrianSequence, setIsPedestrianSequence] =
    useState<boolean>(false);
  const [stopRequested, setStopRequested] = useState<boolean>(false);
  const [trafficLightsRunning, setTrafficLightsRunning] =
    useState<boolean>(false);
  const [isFirstIteration, setIsFirstIteration] = useState<boolean>(true);

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

  const handlePedestrianRequest = () => {
    setStopRequested(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const runTrafficLightSequence = () => {
      runLightSequence(
        isFirstIteration ? lightSequence.slice(2) : lightSequence,
        setColorTrafficLight1,
        () => {
          setTimeout(() => {
            runLightSequence(lightSequence, setColorTrafficLight2, () => {
              setIsFirstIteration(false);
              setTrafficLightsRunning(false);
            });
          }, 1000);
        }
      );
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
        lightSequence.reduce((acc, curr) => acc + curr.duration, 0) * 2;
      interval = setInterval(runTrafficLightSequence, totalDuration);
      runTrafficLightSequence();
    } else if (stopRequested && !trafficLightsRunning) {
      switchToPedestrianLight();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isRunning,
    stopRequested,
    isPedestrianSequence,
    trafficLightsRunning,
    isFirstIteration,
  ]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "lightgray",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1 className="text-center font-bold text-5xl top-10 absolute">
          Traffic Lights Demo
        </h1>

        {/* <div className="flex justify-center gap-4">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStart}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Start"}
        </Button>
      </div> */}

        {/* <div className="m-10 flex gap-10">
        <TrafficLight color={colorTrafficLight1} />
        <TrafficLight color={colorTrafficLight2} />
      </div> */}

        {/* <div className="m-10 grid w-fit place-items-center">
        <PedestrianTrafficLight color={colorPedestrianLight} />
        <Button
          color={stopRequested ? "error" : "primary"}
          size="large"
          onClick={handlePedestrianRequest}
          disabled={!isRunning || isPedestrianSequence}
        >
          <AdjustIcon />
        </Button>
      </div> */}

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="50%"
          position="relative"
        >
          {/* START BUTTON */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
            disabled={isRunning}
            sx={{
              position: "absolute",
              top: "-100px",
              left: "10px",
              margin: "50px",
            }}
          >
            {isRunning ? "Running..." : "Start"}
          </Button>

          {/* Horizontal Road */}
          <Box
            position="absolute"
            top="50%"
            left="0"
            right="0"
            height="60px"
            bgcolor="gray"
            zIndex={1}
            style={{ transform: "translateY(-50%)" }}
          />
          <Box
            position="absolute"
            top="50%"
            left="0"
            right="0"
            height="1px"
            bgcolor="gray"
            zIndex={2}
            style={{
              background:
                "repeating-linear-gradient(to right, white, white 10px, transparent 10px, transparent 20px)",
              transform: "translateY(-50%)",
            }}
          />

          {/* Vertical Road */}
          <Box
            position="absolute"
            left="50%"
            top="0"
            bottom="0"
            width="60px"
            bgcolor="gray"
            zIndex={1}
            sx={{ transform: "translateX(-50%)" }}
          />
          <Box
            position="absolute"
            left="50%"
            top="0"
            bottom="0"
            width="1px"
            zIndex={2}
            bgcolor="gray"
            style={{
              background:
                "repeating-linear-gradient(to bottom, white, white 10px, transparent 10px, transparent 20px)",
              transform: "translateX(-50%)",
            }}
          />

          {/* PEDESTRIAL WALK */}
          <Box
            position="absolute"
            top="50%"
            right="7%"
            height="60px"
            width="12%"
            bgcolor="white"
            zIndex={3}
            display="grid"
            gridRow={3}
            alignItems="center"
            justifyItems="center"
            style={{ transform: "translateY(-50%)" }}
          >
            <Box width="98%" height="10px" bgcolor="gray" />
            <Box width="98%" height="10px" bgcolor="gray" />
            <Box width="98%" height="10px" bgcolor="gray" />
          </Box>

          {/* Traffic Lights */}

          <Box
            position="absolute"
            top="20%"
            left="40%"
            sx={{ transform: "translateX(-50%)" }}
          >
            <TrafficLight color={colorTrafficLight1} rotate />
          </Box>
          <Box
            position="absolute"
            top="75%"
            left="55%"
            style={{ transform: "translateY(-50%)" }}
          >
            <TrafficLight color={colorTrafficLight2} />
          </Box>
          <Box
            position="absolute"
            top="25%"
            right="10%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ transform: "translateY(-50%)" }}
          >
            <PedestrianTrafficLight color={colorPedestrianLight} />
            <Button
              color={stopRequested ? "error" : "primary"}
              size="large"
              onClick={handlePedestrianRequest}
              disabled={!isRunning || isPedestrianSequence}
            >
              <AdjustIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
