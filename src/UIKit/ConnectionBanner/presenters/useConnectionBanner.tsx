import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { addEventListener, fetch as fetchNetInfo } from '@react-native-community/netinfo';
import { localization } from '@/UIProvider/localization/Localization';
import { colorTheme } from '@/UIProvider/theme/ColorTheme';
import { NetworkErrorIcon } from '@/assets/icons/NetworkErrorIcon';
import { NetworkIcon } from '@/assets/icons/NetworkIcon';

interface BannerState {
    visible: boolean;
    text: string;
    backgroundColor: string;
    textColor: string;
    icon: ReactNode;
}

export const useConnectionBanner = () => {
    const [banner, setBanner] = useState<BannerState>({
        visible: false,
        text: localization.t('networkError'),
        backgroundColor: colorTheme.colors.error,
        textColor: colorTheme.colors.text_inverted,
        icon: <NetworkErrorIcon />,
    });

    const isFirstCheck = useRef(true);
    const lastStatus = useRef<boolean | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const offlineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const offlineShownRef = useRef(false);
    const OFFLINE_DEBOUNCE_MS = 1500;

    const hideBanner = useCallback(() => {
        setBanner(prev => ({ ...prev, visible: false }));
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        const clearOfflineTimeout = () => {
            if (offlineTimeoutRef.current) {
                clearTimeout(offlineTimeoutRef.current);
                offlineTimeoutRef.current = null;
            }
        };

        const showOfflineBanner = () => {
            hideBanner();
            offlineShownRef.current = true;
            setBanner({
                visible: true,
                text: localization.t('networkError'),
                backgroundColor: colorTheme.colors.error,
                textColor: colorTheme.colors.text,
                icon: <NetworkErrorIcon />,
            });
        };

        const handleState = (state: { isConnected?: boolean | null; isInternetReachable?: boolean | null }) => {
            const isOnline = Boolean(state.isConnected && state.isInternetReachable !== false);

            if (isFirstCheck.current) {
                isFirstCheck.current = false;
                lastStatus.current = isOnline;
                if (!isOnline) {
                    clearOfflineTimeout();
                    offlineTimeoutRef.current = setTimeout(showOfflineBanner, OFFLINE_DEBOUNCE_MS);
                }
                return;
            }

            if (!isOnline) {
                clearOfflineTimeout();
                offlineTimeoutRef.current = setTimeout(showOfflineBanner, OFFLINE_DEBOUNCE_MS);
            } else if (lastStatus.current === false && isOnline) {
                clearOfflineTimeout();
                if (!offlineShownRef.current) {
                    lastStatus.current = isOnline;
                    return;
                }
                hideBanner();
                offlineShownRef.current = false;
                setBanner({
                    visible: true,
                    text: localization.t('reconnectNetwork'),
                    backgroundColor: colorTheme.colors.success,
                    textColor: colorTheme.colors.text_inverted,
                    icon: <NetworkIcon />,
                });

                timeoutRef.current = setTimeout(() => {
                    setBanner(prevState => ({ ...prevState, visible: false }));
                    timeoutRef.current = null;
                }, 3000);
            }

            lastStatus.current = isOnline;
        };

        const unsubscribe = addEventListener(handleState);
        fetchNetInfo()
            .then(handleState)
            .catch(error => {
                console.error('netinfo fetch failed', error);
            });

        return () => {
            unsubscribe();
            clearOfflineTimeout();
            hideBanner();
        };
    }, [hideBanner]);

    return { banner, hideBanner };
};
