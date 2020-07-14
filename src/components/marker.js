import React from 'react'
const FEDERATION_SHIP = '/images/icons8-star-trek-united-federation-ship-50.png';
const KLINGON_SHIP = '/images/icons8-star-trek-klingon-ship-50.png';
const STAR = '/images/icons8-star-50.png';
const BASE = '/images/icons8-military-base-50.png';

export const Marker = ({ src, x, y, size, anchor, title, alt }) => {
    const adj = anchor === 'center' ? size / 2 : 0;
    const styles = {
        left: x - adj,
        top: y - adj,
        height: size,
        width: size,
        position: 'absolute'
    };

    return (
        <img src={src} style={styles} title={title || ''} alt={alt || ''} />
    );
}

export const FederationShipMarker = props => {
    return (
        <Marker {...props} src={FEDERATION_SHIP} size={16} anchor='center' />
    );
}

export const KlingonShipMarker = props => {
    return (
        <Marker {...props} src={KLINGON_SHIP} size={16} anchor='center' />
    );
}

export const StarMarker = props => {
    return (
        <Marker {...props} src={STAR} size={16} anchor='center' />
    );
}

export const StarbaseMarker = props => {
    return (
        <Marker {...props} src={BASE} size={16} anchor='center' />
    );
}