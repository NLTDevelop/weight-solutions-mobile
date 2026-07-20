import { scaleWeightService } from './ScaleWeightService';
import {
    TcpScaleWeightTransport,
    TcpScaleWeightTransportConfig,
} from './transports/TcpScaleWeightTransport';

export const configureTcpScaleWeightChannel = (config: TcpScaleWeightTransportConfig) => {
    const transport = new TcpScaleWeightTransport(config);

    scaleWeightService.setTransport(transport);
    scaleWeightService.configure({
        host: config.host,
        port: config.port,
        protocol: 'tcp',
    });

    return scaleWeightService;
};

