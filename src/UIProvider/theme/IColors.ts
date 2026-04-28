export type TTheme = 'light' | 'dark';

export type IColors = {
    background: string;
    background_light: string;
    background_strong: string;
    background_secondary: string;
    background_dark: string;

    card: string;
    card_secondary: string;
    card_middle: string;
    
    notification: string;

    border: string;
    border_light: string;
    border_strong: string;

    shadow: string;

    text: string;
    text_strong: string;
    text_middle: string;
    text_light: string;
    text_secondary: string;
    text_inverted: string;
    text_primary: string;
    text_error: string;
    text_card: string;
    text_counter: string;

    icon: string;
    icon_strong: string;
    icon_middle: string;
    icon_light: string;
    icon_primary: string;
    icon_error: string;

    primary: string;
    primary_secondary: string;
    primary_secondary_dark: string;
    error: string;
    warning: string;
    success: string;
    info: string;
    error_strong: string;
    // ------------------------------------
    pyro: string;
    lime: string; //done
    blue_100: string; //done
    light_blue_100: string;
    violet_100: string; //done
    orange_100: string; //done
    tertiary_12: string; //done
    yellow_100: string; //done
    yellow_25: string; //done
    mint_12: string; //done

    birthdayGradient: string[];
    profileGradient: string[];

    accent_primary: string,      
    accent_secondary: string,    
    neutral_900: string,         
    neutral_600: string,         
    teal_primary: string,        
    teal_dark: string,
    dark_cyan: string,
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
    | '800'
    | '900';
};

export interface IFonts {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
}
