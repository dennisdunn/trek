import { toRect, Vector } from 'coordinates';
import React from 'react';
import { DisplayContext } from './display';

const FEDERATION_SHIP = '/images/icons8-star-trek-united-federation-ship-50.png';
const KLINGON_SHIP = '/images/icons8-star-trek-klingon-ship-50.png';
const STAR = '/images/icons8-star-50.png';
const BASE = '/images/icons8-military-base-50.png';

export const Marker = ({ src, position, size, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(position);
        }
    }

    return (
        <DisplayContext.Consumer>
            {display => {
                const p = Vector.Polar.scale(position, display.height / 2);
                const { x, y } = toRect(p);

                const styles = {
                    left: (display.width - size) / 2,
                    top: (display.height - size) / 2,
                    height: size,
                    width: size,
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`
                };
                return (
                    <img src={src} style={styles} onClick={handleClick} title={`Range: ${position.r.toFixed(2)} Bearing: ${position.theta.toFixed(3)}`} alt='' />
                );
            }}

        </DisplayContext.Consumer>
    );
}

export const FederationShipMarker = props => {
    return (
        <Marker {...props} src={FEDERATION_SHIP} size={50} />
    );
}

export const KlingonShipMarker = props => {
    return (
        <Marker {...props} src={KLINGON_SHIP} size={50} />
    );
}

export const StarMarker = props => {
    return (
        <Marker {...props} src={STAR} size={16} />
    );
}

export const StarbaseMarker = props => {
    return (
        <Marker {...props} src={BASE} size={25} />
    );
}