import React, { useEffect } from "react";
import { Comms, Frame, FrameTitle, Sensors, Status, WarpControl } from ".";
import { PhaserControl } from "./phasers";
import { ShieldControl } from "./shields";
import { useDispatch, useGame, useShip } from "./store";
import { TorpedoControl } from "./torpedos";

export const Bridge = (props) => {
  const game = useGame();
  const ship = useShip();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ sys: "sensors", type: "lrs-scan", payload: { game, ship } });
  }, []);

  return (
    <div className="bridge">
      <Frame
        className="comms lcars-atomic-tangerine-border"
        type="bottom"
        justify="left"
      >
        <FrameTitle title="Comms" className="lcars-atomic-tangerine-color" />
        <Comms />
      </Frame>

      <Frame
        className="status lcars-atomic-tangerine-border"
        type="bottom"
        justify="left"
      >
        <FrameTitle title="Status" className="lcars-atomic-tangerine-color" />
        <Status />
      </Frame>

      <Frame className="sensors lcars-atomic-tangerine-border" type="bracket">
        <FrameTitle title="Sciences" className="lcars-atomic-tangerine-color" />
        <Sensors />
      </Frame>

      <Frame className="shields lcars-atomic-tangerine-border" type="left">
        <FrameTitle title="Shields" className="lcars-atomic-tangerine-color" />
        <ShieldControl />
      </Frame>

      <Frame className="warp lcars-atomic-tangerine-border" type="left">
        <FrameTitle
          title="Drive"
          className="lcars-atomic-tangerine-color"
        />
        <WarpControl />
      </Frame>

      <Frame className="phasers lcars-atomic-tangerine-border" type="top">
        <FrameTitle title="Phasers" className="lcars-atomic-tangerine-color" />
        <PhaserControl />
      </Frame>

      <Frame className="torpedos lcars-atomic-tangerine-border" type="top">
        <FrameTitle
          title="Torpedos"
          className="lcars-atomic-tangerine-color"
        />
        <TorpedoControl />
      </Frame>
    </div>
  );
};
