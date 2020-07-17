import React from 'react';

export const DisplayContext = React.createContext({ width: 300, height: 150 });

export const Display = ({ height, width, children, ...funcs }) => {

    const styles = {
        position: 'relative',
        height: height,
        width: width
    }

    return (
        <DisplayContext.Provider value={{ width, height, ...funcs }}>
            <div style={styles}>
                {children}
            </div>
        </DisplayContext.Provider>
    );
}