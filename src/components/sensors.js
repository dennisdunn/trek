import React, { useState } from 'react';
import { shortRangeScan } from 'trek-engine';
import { Context, Frame, FrameButton, FrameButtonBar, FrameTitle, LrsDisplay, SrsDisplay } from '.';
import { CelPanel } from './cel';

export const Sensors = props => {
    const [title, setTitle] = useState('Sensor Scan');
    const [layers, setLayers] = useState(<SrsDisplay />);

    const srs = (context) => {
        const scan = shortRangeScan(context.game, context.sectors, context.ship);
        // const markers = drawMarkers(scan.objs);
        setTitle(scan.sector.name);
        setLayers(<SrsDisplay />);
    }

    const lrs = (context) => {
        setTitle('Long Range Scan')
        setLayers(<LrsDisplay />);
    }

    return (
        <Context.Consumer>
            {context => {
                return (
                    <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
                        <FrameTitle title={title} />
                        <FrameButtonBar>
                            <FrameButton onClick={() => srs(context)} className='lcars-hopbush-bg' text='Short Range Scan' />
                            <FrameButton onClick={() => lrs(context)} className='lcars-hopbush-bg' text='Long Range Scan' />
                        </FrameButtonBar>
                        <CelPanel height={450} width={450} >
                            {layers}
                        </CelPanel>
                    </Frame>)
            }}
        </Context.Consumer>
    )
}