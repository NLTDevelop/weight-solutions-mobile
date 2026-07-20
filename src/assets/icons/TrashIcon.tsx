import React, { FC } from 'react';
import { useUiContext } from '@/UIProvider';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const TrashIcon: FC<IProps> = ({ width = 24, height = 24, color }) => {
    const { colors } = useUiContext();

    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                strokeWidth={1.6}
                stroke={color || colors.icon_error}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 11v6M14 11v6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            />
        </Svg>
    );
};
