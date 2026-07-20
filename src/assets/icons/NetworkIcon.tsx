import Svg, { Path } from 'react-native-svg';
import { scaleHorizontal } from '@/utils';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const NetworkIcon = ({ width, height, color }: IProps) => (
    <Svg width={scaleHorizontal(width || 24)} height={scaleHorizontal(height || 24)} viewBox="0 0 24 24">
        <Path
            stroke={color || '#FCFCFC'}
            fill={'transparent'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 19H9.5a7 7 0 1 1 6.71-9H18a4.5 4.5 0 1 1 0 9Z"
        />
    </Svg>
);
