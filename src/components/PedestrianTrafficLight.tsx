import React from "react";
import { Box } from "@mui/material";

type Props = {
  color: string;
  rotate?: boolean;
};

const PedestrianTrafficLight = (props: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        width: "fit-content",
        height: "112px",
        padding: "8px",
        gap: "1px",
        display: "grid",
        placeItems: "center",
        borderRadius: "8px",
        transform: props.rotate ? "rotate(90deg)" : "none",
      }}
    >
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
          backgroundColor: props.color === "green" ? "green" : "gray",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};

export default PedestrianTrafficLight;
