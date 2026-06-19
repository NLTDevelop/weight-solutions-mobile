import { configureTcpScaleWeightChannel } from '@/libs/scaleWeightService';
import { loggerModel } from '@/UIKit/Logger/entity/loggerModel';
import { useEffect } from 'react';

export const useWeightingConnection = () => {
    useEffect(() => {
        let isActive = true;
        const config = {
            host: '192.168.2.190',
            port: 9761,
            delimiter: '',
            reconnectDelayMs: 2000,
        };

        loggerModel.add('library', 'Scale connection -> effect-started', JSON.stringify(config, null, 2));
        console.log('[Scale connection] effect-started', config);

        const scaleService = configureTcpScaleWeightChannel({
            ...config,
        });

        const unsubscribe = scaleService.subscribe(state => {
            const message = JSON.stringify(state, null, 2);
            console.log('[Scale connection] service-state', state);
            loggerModel.add(
                state.status === 'error' ? 'error' : 'library',
                `Scale connection -> state-${state.status}`,
                message,
            );
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
            unsubscribe();
            scaleService.disconnect();
        };
    }, []);
};
