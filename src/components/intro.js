import { useEffect } from 'react';
import { useComms } from './store';

const defaultDialog = [
    "SPOCK: Captain on deck.",
    "SCOTT: The warp core has breached!",
    "MCCOY: Spock, you green-blooded, pointy-eared...",
    "SPOCK: Doctor McCoy, I raise my eybrows at you.",
    "SCOTT: Is'a no one listening? The warp core is'a not doing well!",
    "MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!"
]

export const Introduction = ({ msgs = defaultDialog }) => {
    const comms = useComms()

    useEffect(() => {
        // const updates = dialog.map((msg) => () => actions.setter(prev => ({ log: [...prev.log, msg] })))
        comms.dispatch({ action: 'set', msgs })
    }, [])

    return null;
}