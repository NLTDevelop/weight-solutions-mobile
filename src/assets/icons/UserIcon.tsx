import React, { FC } from 'react';
import { useUiContext } from '@/UIProvider';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const UserIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    const { colors } = useUiContext();

    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                strokeWidth={2}
                stroke={color || colors.icon_middle}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
            />
            <Path
                strokeWidth={2}
                stroke={color || colors.icon_middle}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 21a8 8 0 0 0-16 0"
            />
        </Svg>
    );
};
