import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { addEventListener, NetInfoState } from '@react-native-community/netinfo';
import { localization } from '../../../UIProvider/localization/Localization';
import { colorTheme } from '../../../UIProvider/theme/ColorTheme';
import { NetworkErrorIcon } from '@/assets/icons/NetworkErrorIcon';
import { NetworkIcon } from '@/assets/icons/NetworkIcon';
import { loggerModel } from '@/UIKit/Logger/entity/loggerModel';

interface BannerState {
    visible: boolean;
    text: string;
    backgroundColor: string;
    icon: ReactNode;
}

const STATES = {
    INITIAL: {
        visible: false,
        text: localization.t('networkError'),
        backgroundColor: colorTheme.colors.border_light,
        icon: <NetworkErrorIcon />,
    },
    DISCONNECTED: {
        visible: true,
        text: localization.t('networkError'),
        backgroundColor: colorTheme.colors.error_strong,
        icon: <NetworkErrorIcon />,
    },
    RECONNECTED: {
        visible: true,
        text: localization.t('reconnectNetwork'),
        backgroundColor: colorTheme.colors.success,
        icon: <NetworkIcon />,
    }
}

export const useConnectionBanner = () => {
    const [banner, setBanner] = useState<BannerState>(STATES.INITIAL);
    const lastStatus = useRef<'DISCONNECTED' | 'RECONNECTED' | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hideBanner = useCallback(() => {
        setBanner(prev => ({ ...prev, visible: false }));
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const onNetInfoChange = useCallback((state: NetInfoState) => {
        loggerModel.add('library', 'NetInfo', JSON.stringify(state, null, 2));

        if (typeof state.isConnected !== 'boolean' || typeof state.isInternetReachable !== 'boolean') {
            setBanner(STATES.INITIAL);
            return;
        }

        if (state.isConnected === false) {
            setBanner(STATES.DISCONNECTED);
            lastStatus.current = 'DISCONNECTED';
            return;
        }

        if (state.isConnected === true && lastStatus.current === 'DISCONNECTED') {
            setBanner(STATES.RECONNECTED);
            lastStatus.current = 'RECONNECTED';
            timeoutRef.current = setTimeout(() => {
                hideBanner();
            }, 3000);
        }
    }, [hideBanner]);

    useEffect(() => {
        const unsubscribe = addEventListener(onNetInfoChange);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            unsubscribe();
        };
    }, [onNetInfoChange]);

    return { banner, hideBanner };
};
