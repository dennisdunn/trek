import React from 'react'
import { FederationShipMarker, StarMarker, PlayerContext } from '.';
import './srs.css'
import { toRect, heading } from 'star-trek-game';
import cloneDeep from 'lodash.clonedeep';

const CANVAS_WIDTH = 350;
const CANVAS_HEIGHT = 200;

// const getCanvasCoordinates = polarCoord => {
//   const xy = toRect(polarCoord);
//   xy.x *= CANVAS_WIDTH;
//   xy.y *= CANVAS_HEIGHT;
//   return xy;//[0, 0];
// }

// const makeStarMarker = obj => {
//   const coord = getCanvasCoordinates(obj.position);
//   return (<StarMarker {...coord} />);
// }

// const getMarkers = items => {
//   console.log(items);
//   let markers = [<FederationShipMarker x={CANVAS_WIDTH / 2} y={CANVAS_HEIGHT / 2} title='USS Enterprise' />];
//   markers = markers.concat(items.filter(obj => obj.type === 'star').map(makeStarMarker));
//   return markers;
// }

export const Srs = ({ items }) => {
  let markers = [<FederationShipMarker key={-1} x={CANVAS_WIDTH / 2} y={CANVAS_HEIGHT / 2} title='USS Enterprise' />];
  let key = 0;
  return (
    <PlayerContext.Consumer>
      {player => {
        const translate = obj => {
          const clone = cloneDeep(obj);
          clone.position = heading(player.ship.position, obj.position);
          clone.position.r *= 5;
          clone.position = toRect(clone.position);
          clone.position.x *= CANVAS_WIDTH;
          clone.position.y *= CANVAS_HEIGHT;
          clone.position.x += CANVAS_WIDTH / 2;
          clone.position.y += CANVAS_HEIGHT / 2;
          return clone;
        }
        const objs = items.map(translate);
        markers = markers.concat(objs.filter(obj => obj.type === 'star').map(obj => (<StarMarker key={key++} {...obj.position} />)))
        return (
          <div className='srs'>{markers}</div>
        );
      }}
    </PlayerContext.Consumer>
  );
}
