import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const ErrorIcon = ({ width = 24, height = 24, color }: IProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                fill={color || '#FCFCFC'}
                fillRule="evenodd"
                d="m13.73 4 8 14A2 2 0 0 1 20 21H4a2 2 0 0 1-1.75-3l8-14a2 2 0 0 1 3.48 0ZM13 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V9Zm-1 7a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                clipRule="evenodd"
            />
        </Svg>
    );
};
