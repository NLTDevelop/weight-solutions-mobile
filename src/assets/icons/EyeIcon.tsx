import { useUiContext } from '@/UIProvider';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const EyeIcon = ({ width = 24, height = 24, color }: IProps) => {
    const { colors } = useUiContext();

    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M2 12C3.85375 8.16439 7.45937 6 12 6C16.5406 6 20.1462 8.16439 22 12C20.1462 15.8356 16.5406 18 12 18C7.45937 18 3.85375 15.8356 2 12Z"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
