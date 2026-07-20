import Toast from 'react-native-toast-message';

type ToastOptions = {
    force?: boolean;
};

class ToastService {
    private suppressErrorUntil = 0;
    private _isVisible = false;

    get isVisible() {
        return this._isVisible;
    }

    suppressErrorsFor(ms: number) {
        this.suppressErrorUntil = Math.max(this.suppressErrorUntil, Date.now() + ms);
    }

    showSuccess(text1?: string, text2?: string) {
        this._isVisible = true;
        Toast.show({
            type: 'success',
            text1: text1 || '',
            text2,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => {
                this._isVisible = false;
            },
        });
    }
    showError(text1?: string, text2?: string, options?: ToastOptions) {
        if (!options?.force && Date.now() < this.suppressErrorUntil) {
            return;
        }
        this._isVisible = true;
        Toast.show({
            type: 'error',
            text1: text1 || '',
            text2,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => {
                this._isVisible = false;
            },
        });
    }
    showInfo(text1?: string, text2?: string) {
        this._isVisible = true;
        Toast.show({
            type: 'info',
            text1: text1 || '',
            text2,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => {
                this._isVisible = false;
            },
        });
    }
    showWarning(text1?: string, text2?: string) {
        this._isVisible = true;
        Toast.show({
            type: 'warning',
            text1: text1 || '',
            text2,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => {
                this._isVisible = false;
            },
        });
    }
}

export const toastService = new ToastService();
