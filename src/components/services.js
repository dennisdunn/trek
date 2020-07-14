import cloneDeep from 'lodash.clonedeep';

export const logMessage = (playerContext, msg) => {
    const newState = cloneDeep(playerContext.ship);
    newState.log.push(msg);
    playerContext.setShip(newState);
}