import { IColors } from './IColors';

// TODO: цвета редактируются исключительно посогласованию
export const COLORS: { dark: IColors } = {
    dark: {
        background: '#FBFDFF',
        background_light: '#8C8F9A',
        background_strong: '#191F35',
        background_secondary: '#435A5F',
        background_dark: "#000000",

        card: '#FFFFFF',
        card_secondary: '#FFFFFF',
        card_middle: '#FFFFFF',

        notification: '',

        border: '#363B4E',
        border_light: '#666A78',
        border_strong: '#FCFCFC',

        shadow: '#06080D',

        text: '#14181F',
        text_strong: '#14181F',
        text_middle: '#14181F',
        text_light: '#14181F',
        text_secondary: '#14181F',
        text_inverted: '#FFFFFF',
        text_primary: '#8E68FF',
        text_error: '#FF4E2E',
        text_card: '#06080D',
        text_counter: '#131728',

        icon: '#161613',
        icon_strong: '#FCFCFC',
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

        // ------------------------------------
        pyro: '#EF4444',
        lime: '#00C617',
        blue_100: '#0062FF',
        light_blue_100: '#5AA1D7',
        violet_100: '#9D00FF',
        orange_100: '#FF9D00',
        tertiary_12: '#9368FF20',
        yellow_100: '#FACC15',
        yellow_25: '#FACC1540',
        mint_12: '#AFF5DE20',

        birthdayGradient: ['#3FB6AC40', '#9368FF40'],
        profileGradient: ['#AFF5DE', '#3FB6AC'],

        accent_primary: '#9368FF',
        accent_secondary: '#534093',
        neutral_900: '#3F4253',
        neutral_600: '#666A78',
        teal_primary: '#3FB6AC',
        teal_dark: '#2A676A',
        dark_cyan: '#DB277780',
    },
};
