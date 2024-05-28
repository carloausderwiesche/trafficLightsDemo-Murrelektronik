import React from "react";

type Props = {
  color: string;
  rotate?: boolean;
};

const TrafficLight = (props: Props) => {
  return (
    <div
      className={`bg-black w-fit h-36 p-2 gap-1 grid place-items-center rounded-lg ${
        props.rotate ? "rotate-90" : ""
      }`}
    >
      {props.color === "redYellow" ? (
        <>
          <div className="size-10 bg-red-500 rounded-full" />
          <div className="size-10 bg-yellow-500 rounded-full" />
          <div className="size-10 bg-gray-500 rounded-full" />
        </>
      ) : (
        <>
          <div
            className={`size-10 rounded-full ${
              props.color === "red" ? "bg-red-500" : "bg-gray-500"
            }`}
          />
          <div
            className={`size-10 rounded-full ${
              props.color === "yellow" ? "bg-yellow-500" : "bg-gray-500"
            }`}
          />
          <div
            className={`size-10 rounded-full ${
              props.color === "green" ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </>
      )}
    </div>
  );
};

export default TrafficLight;
