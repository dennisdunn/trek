import React, { Fragment, useEffect } from "react";
import { getSectorContaining, shortRangeScan } from "../services";
import { useDispatch, useGame, useSensors, useShip } from "./store";

export const Game = ({ children }) => {
  const ship = useShip();
  const game = useGame();
  const sensors = useSensors();
  const dispatch = useDispatch();

  useEffect(() => {
    const sector = getSectorContaining(sensors.sectors, ship);
    dispatch({ sys: "sensors", type: "store-sector", payload: sector });
  }, [ship.position]);

  useEffect(() => {
    const objs = shortRangeScan(game, ship, sensors.sectors);
    if (objs.filter((o) => o.type === "base").length > 0) {
      dispatch({
        sys: "comms",
        type: "log-message",
        payload: "UHURU: Starbase reports refitting complete.",
      });
      dispatch({ sys: "damage", type: "repair-all" });
      dispatch({ sys: "torpedos", type: "set-inventory", payload: 10 });
      dispatch({ sys: "warp", type: "store-energy", payload: 3000 });
    }
  }, [sensors.sector]);

  useEffect(() => {
    const objs = shortRangeScan(game, ship, sensors.sectors);
    if (objs.filter((o) => o.type === "enemy").length > 0) {
      dispatch({
        sys: "comms",
        type: "log-message",
        payload: "CHEKOV: Enemy wessels detected.",
      });
      dispatch({ sys: "status", type: "set-alert", payload: "red" });
    }
  }, [sensors.sector]);

  useEffect(() => {
    const objs = shortRangeScan(game, ship, sensors.sectors);
    if (objs.filter((o) => o.type === "enemy").length === 0) {
      dispatch({ sys: "status", type: "set-alert", payload: "green" });
    }
  }, [sensors.srs]);

  useEffect(() => {
    [
      "SPOCK: Captain on deck.",
      "SCOTT: The warp core is'a not feeling well!",
      "MCCOY: Spock, you green-blooded, pointy-eared...",
      "SPOCK: Doctor McCoy, I raise my eybrows at you.",
      "SCOTT: Is'a no one listening? The warp core is aboot to breach!",
      "MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!",
    ].forEach((m, idx) =>
      setTimeout(
        () => dispatch({ sys: "comms", type: "log-message", payload: m }),
        2000 * idx
      )
    );
  }, []);

  return <Fragment>{children}</Fragment>;
};
