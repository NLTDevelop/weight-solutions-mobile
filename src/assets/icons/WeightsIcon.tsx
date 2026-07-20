
import Svg, { Path, Rect } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

export const WeightIcon = ({ width = 32, height = 32 }: IProps) => {
    return (
       <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" >
<Rect width={width} height={height} rx="16" fill="#FAB500"/>
<Path d="M16 8.5V23.5" stroke="#14181F" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M21.834 12.6667L24.334 19.3334C23.6128 19.8743 22.7355 20.1667 21.834 20.1667C20.9324 20.1667 20.0552 19.8743 19.334 19.3334L21.834 12.6667ZM21.834 12.6667V11.8334" stroke="#14181F" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M8.5 11.8333H9.33333C11.6587 11.8333 13.9482 11.2609 16 10.1666C18.0518 11.2609 20.3413 11.8333 22.6667 11.8333H23.5" stroke="#14181F" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M10.166 12.6667L12.666 19.3334C11.9448 19.8743 11.0676 20.1667 10.166 20.1667C9.26447 20.1667 8.38725 19.8743 7.66602 19.3334L10.166 12.6667ZM10.166 12.6667V11.8334" stroke="#14181F" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M11.834 23.5H20.1673" stroke="#14181F" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
    );
};
