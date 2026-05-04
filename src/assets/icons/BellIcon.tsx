import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const BellIcon: FC<IProps> = ({ width = 24, height = 24, color = '#334155' }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                strokeWidth={2}
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.268 21a2 2 0 0 0 3.464 0M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 1 0 6 8c0 4.499-1.411 5.956-2.738 7.326Z"
            />
        </Svg>
    );
};
