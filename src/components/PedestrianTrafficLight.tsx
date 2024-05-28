import React from "react";

type Props = {
  color: string;
  rotate?: boolean;
};

const PedestrianTrafficLight = (props: Props) => {
  return (
    <div
      className={`bg-black w-fit h-28 p-2 gap-1 grid place-items-center rounded-lg ${
        props.rotate ? "rotate-90" : ""
      }`}
    >
      <div
        className={`size-10 rounded-full ${
          props.color === "red" ? "bg-red-500" : "bg-gray-500"
        }`}
      />
      <div
        className={`size-10 rounded-full ${
          props.color === "green" ? "bg-green-500" : "bg-gray-500"
        }`}
      />
    </div>
  );
};

export default PedestrianTrafficLight;
