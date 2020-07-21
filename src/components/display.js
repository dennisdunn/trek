import React from 'react';

export const DisplayContext = React.createContext({ width: 300, height: 150 });

export const Display = ({ height, width, children, ...rest }) => {

    const styles = {
        position: 'relative',
        height: height,
        width: width
    }

    return (
        <DisplayContext.Provider value={{ width, height, ...rest }}>
            <div style={styles}>
                {children}
            </div>
        </DisplayContext.Provider>
    );
}