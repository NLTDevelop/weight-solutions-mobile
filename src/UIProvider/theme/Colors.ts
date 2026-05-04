import { IColors } from './IColors';

// TODO: цвета редактируются исключительно посогласованию
export const COLORS: { dark: IColors } = {
    dark: {
        background: '#FBFDFF',
        background_light: '#8C8F9A',
        background_strong: '#191F35',
        background_secondary: '#435A5F',
        background_dark: "#000000",

        card: '#F9F9F9',
        card_secondary: '',
        card_middle: '',

        notification: '',

        border: '#E2E8F0',
        border_light: '',
        border_strong: '',

        shadow: '#06080D',

        text: '#14181F',
        text_strong: '#14181F',
        text_middle: '#14181F',
        text_light: '#64748B',
        text_secondary: '#14181F',
        text_inverted: '#FFFFFF',
        text_primary: '#8E68FF',
        text_error: '#FF4E2E',

        icon: '#161613',
        icon_strong: '#14181F',
        icon_middle: '#C5C7CD',
        icon_light: '#8C8F9A',
        icon_primary: '#8E68FF',
        icon_error: '#FF4E2E',

        primary: '#FAB500',
        primary_secondary: '#AFF5DE',
        primary_secondary_dark: '#66BDA1',
        error: '#FF4E2E',
        warning: '#F59E0B',
        success: '#4CAF50',
        info: '#2563EB',

        error_strong: '#DC2626',
    },
};
