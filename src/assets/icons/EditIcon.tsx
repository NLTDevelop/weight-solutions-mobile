import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const EditIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                strokeWidth={1.6}
                color={color}
                stroke="#14181F"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.276 2.276 0 0 0-3.222.001l-9.507 9.519Z"
            />
        </Svg>
    );
};
