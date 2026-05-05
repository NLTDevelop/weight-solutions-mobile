import { RefObject } from 'react';
import { TextInput } from 'react-native';

export type TRestorePasswordStep = 'email' | 'code' | 'password';

export interface ICodeBoxState {
    value: string;
    isActive: boolean;
}

export interface IEmailStepPresenter {
    shouldShowEmailError: boolean;
    isActionDisabled: boolean;
}

export interface ICodeStepPresenter {
    shouldShowCodeError: boolean;
    isActionDisabled: boolean;
    codeBoxStates: ICodeBoxState[];
}

export interface IPasswordStepPresenter {
    shouldShowConfirmPasswordError: boolean;
    shouldHighlightPasswordFields: boolean;
    isActionDisabled: boolean;
    hasPasswordMinLength: boolean;
    hasPasswordDigit: boolean;
    hasPasswordSpecialCharacter: boolean;
}

export interface IEmailStepComponentProps {
    email: string;
    shouldShowEmailError: boolean;
    onChangeEmail: (value: string) => void;
    onBlurEmail: () => void;
}

export interface ICodeStepComponentProps {
    code: string;
    codeBoxStates: ICodeBoxState[];
    shouldShowCodeError: boolean;
    codeInputRef: RefObject<TextInput | null>;
    onChangeCode: (value: string) => void;
    onFocusCodeInput: () => void;
    onBlurCodeInput: () => void;
    onPressCodeInput: () => void;
}

export interface IPasswordStepComponentProps {
    password: string;
    confirmPassword: string;
    isPasswordVisible: boolean;
    isConfirmPasswordVisible: boolean;
    shouldShowConfirmPasswordError: boolean;
    shouldHighlightPasswordFields: boolean;
    hasPasswordMinLength: boolean;
    hasPasswordDigit: boolean;
    hasPasswordSpecialCharacter: boolean;
    onChangePassword: (value: string) => void;
    onChangeConfirmPassword: (value: string) => void;
    onBlurPassword: () => void;
    onBlurConfirmPassword: () => void;
    onTogglePasswordVisibility: () => void;
    onToggleConfirmPasswordVisibility: () => void;
}
