export type TTheme = 'light' | 'dark';

export type IColors = {
    background: string;
    card: string;

    text_strong: string;
    text_middle: string;
    text_light: string;

    icon_strong: string;
    icon_middle: string;

    disabled: string;

    error: string;


    white: string;
    primary: string;
    accent: string;
    border: string;

    text_additional: string;
    text_secondary: string;
    text_main: string;


    semantic_success: string;
    semantic_success_background: string;
    semantic_error: string;
    semantic_error_background: string;
    semantic_error_background_button: string;
    warning_background: string;

    warning: string;
    success: string;
    info: string;
};

export type FontStyle = {
    fontFamily: string;
    fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '900';
};

export interface IFonts {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
}
