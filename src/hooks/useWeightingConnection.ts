import { configureTcpScaleWeightChannel, ScaleWeightConnectionStatus } from '@/libs/scaleWeightService';
import { scaleSettingsModel } from '@/entities/ScaleSettings/ScaleSettingsModel';
import { loggerModel } from '@/UIKit/Logger/entity/loggerModel';
import { useEffect, useState } from 'react';

interface IProps {
    onStableWeight: (weight: string) => void;
}

export const useWeightingConnection = ({ onStableWeight }: IProps) => {
    const [connectionStatus, setConnectionStatus] = useState<ScaleWeightConnectionStatus>('idle');

    useEffect(() => {
        let isActive = true;
        let isWeightCaptured = false;
        const settings = scaleSettingsModel.settings;
        const hasValidSettings = Boolean(
            settings.host.trim() &&
            Number.isInteger(settings.port) &&
            settings.port >= 1 &&
            settings.port <= 65535,
        );

        if (!hasValidSettings) {
            setConnectionStatus('error');
            return;
        }

        const config = {
            host: settings.host,
            port: settings.port,
            delimiter: '',
            reconnectDelayMs: 2000,
        };

        loggerModel.add('library', 'Scale connection -> effect-started', JSON.stringify(config, null, 2));
        console.log('[Scale connection] effect-started', config);

        const scaleService = configureTcpScaleWeightChannel({
            ...config,
        });
        scaleService.clear();
        loggerModel.add('library', 'Scale connection -> previous-reading-cleared', '');

        const unsubscribe = scaleService.subscribe(state => {
            setConnectionStatus(state.status);
            const message = JSON.stringify(state, null, 2);
            console.log('[Scale connection] service-state', state);
            loggerModel.add(
                state.status === 'error' ? 'error' : 'library',
                `Scale connection -> state-${state.status}`,
                message,
            );

            const reading = state.lastReading;
            if (!isWeightCaptured && reading?.isReadyForCapture) {
                isWeightCaptured = true;
                const weight = String(reading.weightKg);
                loggerModel.add('library', 'Scale connection -> weight-captured', JSON.stringify({
                    weight,
                    stableDurationMs: reading.stableDurationMs,
                }, null, 2));
                console.log('[Scale connection] weight-captured', {
                    weight,
                    stableDurationMs: reading.stableDurationMs,
                });
                onStableWeight(weight);
            }
        });

        const connect = async () => {
            try {

                if (!isActive) {
                    loggerModel.add('library', 'Scale connection -> connect-cancelled', 'Screen is inactive');
                    return;
                }
                await scaleService.connect();
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                console.warn('[Scale connection] unexpected-error', error);
                loggerModel.add('error', 'Scale connection -> unexpected-error', message);
            }
        };

        connect();

        return () => {
            isActive = false;
            unsubscribe();
            scaleService.disconnect();
        };
    }, [onStableWeight]);

    return {
        connectionStatus,
        isScaleConnected: connectionStatus === 'connected',
    };
};
