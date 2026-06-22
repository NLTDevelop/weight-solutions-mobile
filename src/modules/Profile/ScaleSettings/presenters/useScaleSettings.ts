import { scaleSettingsModel } from '@/entities/ScaleSettings/ScaleSettingsModel';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

const isValidHost = (host: string) => {
    const parts = host.split('.');
    if (parts.length === 4 && parts.every(part => /^\d+$/.test(part))) {
        return parts.every(part => Number(part) >= 0 && Number(part) <= 255);
    }

    return /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(host);
};

export const useScaleSettings = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const initialSettings = useMemo(() => scaleSettingsModel.settings, []);
    const [host, setHost] = useState(initialSettings.host);
    const [port, setPort] = useState(initialSettings.port > 0 ? String(initialSettings.port) : '');
    const [isHostTouched, setIsHostTouched] = useState(false);
    const [isPortTouched, setIsPortTouched] = useState(false);
    const trimmedHost = host.trim();
    const parsedPort = Number(port);
    const hostValidationError = !trimmedHost
        ? 'profile.scaleSettings.hostRequired'
        : !isValidHost(trimmedHost)
            ? 'profile.scaleSettings.hostInvalid'
            : '';
    const portValidationError = !port.trim()
        ? 'profile.scaleSettings.portRequired'
        : !Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535
            ? 'profile.scaleSettings.portInvalid'
            : '';
    const hostErrorText = isHostTouched ? hostValidationError : '';
    const portErrorText = isPortTouched ? portValidationError : '';
    const isChanged = trimmedHost !== initialSettings.host || parsedPort !== initialSettings.port;
    const isSubmitDisabled = Boolean(hostValidationError || portValidationError || !isChanged);

    const onSubmit = () => {
        if (isSubmitDisabled) {
            return;
        }

        scaleSettingsModel.settings = {
            host: trimmedHost,
            port: parsedPort,
        };
        toastService.showSuccess(t('profile.scaleSettings.saved'), '');
        navigation.goBack();
    };

    return {
        host,
        port,
        hostErrorText,
        portErrorText,
        isSubmitDisabled,
        setHost,
        setPort,
        onBlurHost: () => setIsHostTouched(true),
        onBlurPort: () => setIsPortTouched(true),
        onSubmit,
    };
};
