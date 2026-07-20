import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color: string;
}

export const PlusIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                d='M12 5V19'
                stroke={color}
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M5 12H19'
                stroke={color}
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};
