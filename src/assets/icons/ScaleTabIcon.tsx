import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color: string;
}

export const ScaleTabIcon: FC<IProps> = ({ width = 32, height = 32, color }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                d='M12 5V18.5'
                stroke={color}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M5 7H19'
                stroke={color}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M7.25 7L5 13.5C5 14.7426 6.00736 15.75 7.25 15.75C8.49264 15.75 9.5 14.7426 9.5 13.5L7.25 7Z'
                stroke={color}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M16.75 7L14.5 13.5C14.5 14.7426 15.5074 15.75 16.75 15.75C17.9926 15.75 19 14.7426 19 13.5L16.75 7Z'
                stroke={color}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M9.5 19.25H14.5'
                stroke={color}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};
