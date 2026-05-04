import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const DashboardIcon: FC<IProps> = ({ width = 24, height = 24, color = '#101828' }) => {
    return (
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <Path
                d='M4 6.8C4 5.80589 4.80589 5 5.8 5H10.2C11.1941 5 12 5.80589 12 6.8V10.2C12 11.1941 11.1941 12 10.2 12H5.8C4.80589 12 4 11.1941 4 10.2V6.8Z'
                stroke={color}
                strokeWidth='1.8'
            />
            <Path
                d='M12 13.8C12 12.8059 12.8059 12 13.8 12H18.2C19.1941 12 20 12.8059 20 13.8V18.2C20 19.1941 19.1941 20 18.2 20H13.8C12.8059 20 12 19.1941 12 18.2V13.8Z'
                stroke={color}
                strokeWidth='1.8'
            />
            <Path
                d='M12 6.8C12 5.80589 12.8059 5 13.8 5H18.2C19.1941 5 20 5.80589 20 6.8V8.2C20 9.19411 19.1941 10 18.2 10H13.8C12.8059 10 12 9.19411 12 8.2V6.8Z'
                stroke={color}
                strokeWidth='1.8'
            />
            <Path
                d='M4 15.8C4 14.8059 4.80589 14 5.8 14H10.2C11.1941 14 12 14.8059 12 15.8V18.2C12 19.1941 11.1941 20 10.2 20H5.8C4.80589 20 4 19.1941 4 18.2V15.8Z'
                stroke={color}
                strokeWidth='1.8'
            />
        </Svg>
    );
};
