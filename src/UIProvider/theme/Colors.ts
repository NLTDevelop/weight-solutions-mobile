import { IColors } from './IColors';

// TODO: цвета редактируются исключительно посогласованию
export const COLORS: { dark: IColors } = {
    dark: {
        background: '#EFF5FB',
        background_light: '#A1A3A5',
        background_strong: '#191F35',
        background_secondary: '#435A5F',
        background_dark: '#000000',

        card: '#FFFFFF',
        card_secondary: '#FFF0F0',
        card_middle: '#F9F9F9',

        notification: '#FCFCFC',

        border: '#E2E8F0',
        border_light: '#F6F7F8',
        border_strong: '#14181F',

        shadow: '#000000',

        text: '#14181F',
        text_strong: '#0F172A',
        text_middle: '#334155',
        text_light: '#94A3B8',
        text_secondary: '#14181F',
        text_inverted: '#FFFFFF',
        text_primary: '#8E68FF',
        text_error: '#EF4444',

        icon: '#161613',
        icon_strong: '#14181F',
        icon_middle: '#94A3B8',
        icon_light: '#8C8F9A',
        icon_primary: '#8E68FF',
        icon_error: '#EF4444',

        primary: '#FAB500',
        primary_secondary: '#AFF5DE',
        primary_secondary_dark: '#66BDA1',
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#4CAF50',
        info: '#2563EB',

        error_strong: '#DC2626',
    },
};
