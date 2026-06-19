export type ScaleWeightConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

export type ScaleWeightProtocol = 'tcp' | 'udp' | 'http' | 'websocket' | 'unknown';

export interface ScaleWeightServiceConfig {
    host?: string;
    port?: number;
    protocol?: ScaleWeightProtocol;
    stableSamplesCount: number;
    stableThresholdKg: number;
    staleAfterMs: number;
}

export interface ScaleWeightReading {
    raw: string;
    weightKg: number;
    unit: string;
    receivedAt: number;
    isStable: boolean;
}

export interface ScaleWeightServiceState {
    status: ScaleWeightConnectionStatus;
    lastReading: ScaleWeightReading | null;
    error: string | null;
}

export interface ScaleWeightSnapshot {
    weightKg: number;
    raw: string;
    receivedAt: number;
    isStable: boolean;
}

export interface ScaleWeightParseResult {
    weightKg: number;
    unit: string;
}

export type ScaleWeightUnsubscribe = () => void;

export type ScaleWeightStateListener = (state: ScaleWeightServiceState) => void;

