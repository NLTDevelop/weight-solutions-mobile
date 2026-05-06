import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color: string;
}

export const HomeTabIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                d='M9 20V14.5C9 13.9477 9.44772 13.5 10 13.5H14C14.5523 13.5 15 13.9477 15 14.5V20'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M4.5 10.5813C4.5 10.1093 4.70918 9.66159 5.07123 9.35761L10.5712 4.73856C11.3868 4.05353 12.5762 4.05353 13.3918 4.73856L18.8918 9.35761C19.2538 9.66159 19.463 10.1093 19.463 10.5813V17.75C19.463 18.9926 18.4556 20 17.213 20H6.75C5.50736 20 4.5 18.9926 4.5 17.75V10.5813Z'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};
