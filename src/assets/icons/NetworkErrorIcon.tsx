import Svg, { Path } from 'react-native-svg';
import { scaleHorizontal } from '@/utils';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const NetworkErrorIcon = ({ width, height, color }: IProps) => (
    <Svg width={scaleHorizontal(width || 24)} height={scaleHorizontal(height || 24)} viewBox="0 0 24 24">
        <Path
            stroke={color || '#FCFCFC'}
            fill={'transparent'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m2.5 2 20 20M6.282 5.781A7 7 0 0 0 9.5 19H18a4.5 4.5 0 0 0 1.307-.193M22.032 16.5A4.5 4.5 0 0 0 18 10h-1.79a7.008 7.008 0 0 0-5.71-4.93"
        />
    </Svg>
);
