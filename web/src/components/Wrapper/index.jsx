import React, { useMemo } from 'react';

// background color
const BACKGROUND_COLOR = ['#606470', '#3c79ce', '#F9CE00', '#4CAF50', '#FF9800'];

const STYLE = {
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export function Wrapper(props) {
    const { children = null } = props;
    const backgroundColor = useMemo(() => {
        return BACKGROUND_COLOR[Math.floor(Math.random() * 5) % 5];
    }, []);

    return (
        <div style={{ backgroundColor: backgroundColor, ...STYLE }} >
            {children}
        </div>
    );
}