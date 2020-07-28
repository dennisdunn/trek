import { useContext, useEffect } from 'react';
import { CommsContext } from './context';

const defaultDialog = [
    "SPOCK: Captain on deck.",
    "SCOTT: The warp core has breached!",
    "MCCOY: Spock, you green-blooded, pointy-eared...",
    "SPOCK: Doctor McCoy, I raise my eybrows at you.",
    "SCOTT: Is'a no one listening? The warp core is'a not doing well!",
    "MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!"
]

export const Introduction = ({ log = defaultDialog }) => {
    const [_, setComms] = useContext(CommsContext)

    useEffect(() => {
        // const updates = dialog.map((msg) => () => actions.setter(prev => ({ log: [...prev.log, msg] })))
        setComms({ log })
    }, [])

    return null;
}