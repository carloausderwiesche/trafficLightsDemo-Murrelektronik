import React from "react";
import { Box } from "@mui/material";

type Props = {
  color: string;
  rotate?: boolean;
};

const TrafficLight = (props: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        width: "fit-content",
        height: "144px",
        padding: "8px",
        gap: "4px",
        display: "grid",
        placeItems: "center",
        borderRadius: "8px",
        transform: props.rotate ? "rotate(90deg)" : "none",
      }}
    >
      {props.color === "redYellow" ? (
        <>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#F7DA41",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "gray",
              borderRadius: "50%",
            }}
          />
        </>
      ) : (
        <>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: props.color === "red" ? "red" : "gray",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: props.color === "yellow" ? "#F7DA41" : "gray",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: props.color === "green" ? "#03FF00" : "gray",
              borderRadius: "50%",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default TrafficLight;
