import Svg, { Path, Rect } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const InfoIcon = ({ width = 32, height = 32 }: IProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
            <Rect width={32} height={32} fill="#FAB500" rx={16} />
            <Path
                stroke="#14181F"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.833 15.167v5M21.833 16.833H23.5M7.667 23.5a6.667 6.667 0 0 1 10.723-5.29"
            />
            <Path
                stroke="#14181F"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.333 16.833a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333ZM21.833 23.5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
            />
        </Svg>
    );
};
