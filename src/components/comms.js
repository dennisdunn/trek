import React from "react";
import { useComms } from "./store";

export const Comms = (props) => {
  const comms = useComms();

  return (
    <div
      style={{
        marginLeft: "1rem",
        display: "flex",
        flexDirection: "column-reverse",
        marginTop: "1rem",
        overflow: "hidden",
      }}
    >
      {comms.log.map((m) => (
        <div>{m}</div>
      ))}
    </div>
  );
};
