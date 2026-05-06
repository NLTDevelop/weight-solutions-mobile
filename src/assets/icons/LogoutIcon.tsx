import React, { FC } from 'react';
import { useUiContext } from '@/UIProvider';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const LogoutIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    const { colors } = useUiContext();

    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                strokeWidth={2}
                stroke={color || colors.icon_strong}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16 17 5-5-5-5M21 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
            />
        </Svg>
    );
};
