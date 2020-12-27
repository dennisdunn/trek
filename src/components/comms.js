import React from "react";
import { useComms } from "./store";
import "../styles/comms.css";

export const Comms = (props) => {
  const comms = useComms();

  return (
    <div className="commsDisplay">
      {comms.log.map((m) => (
        <div>{m}</div>
      ))}
    </div>
  );
};
