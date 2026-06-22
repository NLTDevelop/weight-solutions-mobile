import { IScaleWeightTransport } from './_ports/IScaleWeightTransport';
import { scaleWeightParser, ScaleWeightParser } from './ScaleWeightParser';
import {
    ScaleWeightReading,
    ScaleWeightServiceConfig,
    ScaleWeightServiceState,
    ScaleWeightSnapshot,
    ScaleWeightStateListener,
    ScaleWeightUnsubscribe,
} from './types';

const DEFAULT_CONFIG: ScaleWeightServiceConfig = {
    protocol: 'unknown',
    stableSamplesCount: 3,
    stableThresholdKg: 20,
    minimumCaptureWeightKg: 50,
    requiredStableDurationMs: 5000,
    staleAfterMs: 5000,
};

class ScaleWeightService {
    private config: ScaleWeightServiceConfig = DEFAULT_CONFIG;
    private state: ScaleWeightServiceState = {
        status: 'idle',
        lastReading: null,
        error: null,
    };
    private listeners = new Set<ScaleWeightStateListener>();
    private samples: ScaleWeightReading[] = [];
    private stableSince: number | null = null;
    private transportUnsubscribers: ScaleWeightUnsubscribe[] = [];

    constructor(
        private transport: IScaleWeightTransport | null = null,
        private parser: ScaleWeightParser = scaleWeightParser,
    ) { }

    public configure = (config: Partial<ScaleWeightServiceConfig>) => {
        this.config = {
            ...this.config,
            ...config,
        };
        this.emit();
    };

    public setTransport = (transport: IScaleWeightTransport | null) => {
        this.removeTransportListeners();
        this.transport = transport;
        if (transport) {
            this.bindTransport(transport);
        }
    };

    public connect = async () => {
        if (!this.transport) {
            this.setState({
                status: 'error',
                error: 'Scale transport is not configured',
            });
            return;
        }

        this.bindTransport(this.transport);
        this.setState({
            status: 'connecting',
            error: null,
        });
        try {
            await this.transport.connect();
            return true;
        } catch (error) {
            this.setState({
                status: 'error',
                error: error instanceof Error ? error.message : 'Cannot connect to scale',
            });
            return false;
        }
    };

    public sendCommand = async (payload: string | Uint8Array) => {
        if (!this.transport) {
            throw new Error('Scale transport is not configured');
        }

        await this.transport.write(payload);
    };

    public disconnect = async () => {
        if (this.transport) {
            await this.transport.disconnect();
        }
        this.setState({
            status: 'disconnected',
            error: null,
        });
    };

    public subscribe = (listener: ScaleWeightStateListener): ScaleWeightUnsubscribe => {
        this.listeners.add(listener);
        listener(this.getState());

        return () => {
            this.listeners.delete(listener);
        };
    };

    public getState = (): ScaleWeightServiceState => ({
        status: this.state.status,
        lastReading: this.state.lastReading ? { ...this.state.lastReading } : null,
        error: this.state.error,
    });

    public processRawData = (payload: string | Uint8Array) => {
        const raw = this.payloadToString(payload);
        const parsed = this.parser.parse(raw);

        if (!parsed) {
            return null;
        }

        const reading: ScaleWeightReading = {
            raw,
            weightKg: parsed.weightKg,
            unit: parsed.unit,
            receivedAt: Date.now(),
            isStable: false,
            stableDurationMs: 0,
            isReadyForCapture: false,
        };

        this.samples = [...this.samples, reading].slice(-this.config.stableSamplesCount);
        reading.isStable = this.isStableReading();
        this.updateCaptureReadiness(reading);

        this.setState({
            status: this.isReceivingStatus() ? 'connected' : this.state.status,
            lastReading: reading,
            error: null,
        });

        return reading;
    };

    public createSnapshot = (): ScaleWeightSnapshot | null => {
        const reading = this.state.lastReading;
        if (!reading) {
            return null;
        }

        const isStale = Date.now() - reading.receivedAt > this.config.staleAfterMs;
        if (isStale) {
            return null;
        }

        return {
            weightKg: reading.weightKg,
            raw: reading.raw,
            receivedAt: reading.receivedAt,
            isStable: reading.isStable,
        };
    };

    public clear = () => {
        this.samples = [];
        this.stableSince = null;
        this.setState({
            lastReading: null,
            error: null,
        });
    };

    private bindTransport = (transport: IScaleWeightTransport) => {
        if (this.transportUnsubscribers.length > 0) {
            return;
        }

        this.transportUnsubscribers = [
            transport.onData(this.processRawData),
            transport.onStatus((status, error) => {
                this.setState({
                    status,
                    error: error || null,
                });
            }),
        ];
    };

    private removeTransportListeners = () => {
        this.transportUnsubscribers.forEach(unsubscribe => unsubscribe());
        this.transportUnsubscribers = [];
    };

    private payloadToString = (payload: string | Uint8Array) => {
        if (typeof payload === 'string') {
            return payload;
        }

        return Array.from(payload)
            .map(byte => String.fromCharCode(byte))
            .join('');
    };

    private isStableReading = () => {
        if (this.samples.length < this.config.stableSamplesCount) {
            return false;
        }

        const weights = this.samples.map(sample => sample.weightKg);
        return Math.max(...weights) - Math.min(...weights) <= this.config.stableThresholdKg;
    };

    private updateCaptureReadiness = (reading: ScaleWeightReading) => {
        const isEligible = reading.isStable && reading.weightKg > this.config.minimumCaptureWeightKg;
        if (!isEligible) {
            this.stableSince = null;
            return;
        }

        if (this.stableSince === null) {
            this.stableSince = reading.receivedAt;
        }

        reading.stableDurationMs = reading.receivedAt - this.stableSince;
        reading.isReadyForCapture = reading.stableDurationMs > this.config.requiredStableDurationMs;
    };

    private isReceivingStatus = () => (
        this.state.status === 'idle' ||
        this.state.status === 'connecting' ||
        this.state.status === 'disconnected'
    );

    private setState = (state: Partial<ScaleWeightServiceState>) => {
        this.state = {
            ...this.state,
            ...state,
        };
        this.emit();
    };

    private emit = () => {
        const state = this.getState();
        this.listeners.forEach(listener => listener(state));
    };
}

export const scaleWeightService = new ScaleWeightService();
export { ScaleWeightService };
