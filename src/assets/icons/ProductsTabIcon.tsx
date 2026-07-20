import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color: string;
}

export const ProductsTabIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                d='M6 9.5H18'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M6 14H18'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M5.75 4.75H18.25C18.9404 4.75 19.5 5.30964 19.5 6V18C19.5 18.6904 18.9404 19.25 18.25 19.25H5.75C5.05964 19.25 4.5 18.6904 4.5 18V6C4.5 5.30964 5.05964 4.75 5.75 4.75Z'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <Path
                d='M8 9.5V19'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </Svg>
    );
};
