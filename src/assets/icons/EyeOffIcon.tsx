import { useUiContext } from '@/UIProvider';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const EyeOffIcon = ({ width = 24, height = 24, color }: IProps) => {
    const { colors } = useUiContext();

    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 3L21 21"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.5842 10.5862C10.2081 10.9623 10 11.4725 10 12.0044C10 12.5364 10.2081 13.0466 10.5842 13.4227C10.9603 13.7988 11.4705 14.0069 12.0024 14.0069C12.5344 14.0069 13.0445 13.7988 13.4207 13.4227"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M9.88086 5.09094C10.5733 5.03067 11.2812 5 12 5C16.5406 5 20.1462 7.16439 22 11C21.4426 12.1538 20.7148 13.2013 19.8457 14.1134"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.6717 17.6736C15.9927 18.5206 14.0758 19 11.9999 19C7.45927 19 3.85364 16.8356 1.99988 13C2.84918 11.2426 4.09072 9.7092 5.62492 8.51318"
                stroke={color || colors.icon_strong}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
