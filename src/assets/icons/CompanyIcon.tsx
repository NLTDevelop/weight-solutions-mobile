import React, { FC } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const CompanyIcon: FC<IProps> = ({ width = 32, height = 32 }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 32 32' fill='none'>
            <Rect width={32} height={32} fill="#FAB500" rx={16} />
            <Path
                stroke="#1F2024"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 23.5v-9.167a.833.833 0 0 0-.833-.833h-8.334a.833.833 0 0 0-.833.833V23.5"
            />
            <Path
                stroke="#1F2024"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M24.333 21.833a1.667 1.667 0 0 1-1.666 1.667H9.333a1.667 1.667 0 0 1-1.666-1.667v-9.166a1.666 1.666 0 0 1 .943-1.503l6.625-3.312a1.667 1.667 0 0 1 1.53 0l6.624 3.312a1.667 1.667 0 0 1 .944 1.503v9.166ZM11 16.833h10M11 20.167h10"
            />
        </Svg>
    );
};
