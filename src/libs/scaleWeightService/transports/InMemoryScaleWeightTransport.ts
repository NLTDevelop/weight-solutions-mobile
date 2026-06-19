import {
    IScaleWeightTransport,
    ScaleWeightTransportDataListener,
    ScaleWeightTransportStatusListener,
} from '../_ports/IScaleWeightTransport';

class InMemoryScaleWeightTransport implements IScaleWeightTransport {
    private dataListeners = new Set<ScaleWeightTransportDataListener>();
    private statusListeners = new Set<ScaleWeightTransportStatusListener>();

    public connect = async () => {
        this.emitStatus('connected');
    };

    public disconnect = async () => {
        this.emitStatus('disconnected');
    };

    public write = async (payload: string | Uint8Array) => {
        this.emitData(payload);
    };

    public onData = (listener: ScaleWeightTransportDataListener) => {
        this.dataListeners.add(listener);

        return () => {
            this.dataListeners.delete(listener);
        };
    };

    public onStatus = (listener: ScaleWeightTransportStatusListener) => {
        this.statusListeners.add(listener);

        return () => {
            this.statusListeners.delete(listener);
        };
    };

    public emitData = (payload: string | Uint8Array) => {
        this.dataListeners.forEach(listener => listener(payload));
    };

    public emitStatus: ScaleWeightTransportStatusListener = (status, error) => {
        this.statusListeners.forEach(listener => listener(status, error));
    };
}

export { InMemoryScaleWeightTransport };
