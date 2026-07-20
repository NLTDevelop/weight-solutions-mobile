import { ICodeStepPresenter } from '../types/IRestorePassword';

const CODE_LENGTH = 6;

interface IProps {
    code: string;
    isLoading: boolean;
    isCodeSubmitted: boolean;
    isCodeInputFocused: boolean;
}

export const useRestorePasswordCodeStep = ({
    code,
    isLoading,
    isCodeSubmitted,
    isCodeInputFocused,
}: IProps): ICodeStepPresenter => {
    const isCodeComplete = code.length === CODE_LENGTH;
    const shouldShowCodeError = isCodeSubmitted && !isCodeComplete;
    const codeDigits = Array.from({ length: CODE_LENGTH }, (_, index) => code[index] || '');
    const codeBoxStates = codeDigits.map((value, index) => ({
        value,
        isActive: Boolean(value) || (isCodeInputFocused && index === code.length && code.length < CODE_LENGTH),
    }));

    return {
        shouldShowCodeError,
        isActionDisabled: isLoading || !isCodeComplete,
        codeBoxStates,
    };
};
