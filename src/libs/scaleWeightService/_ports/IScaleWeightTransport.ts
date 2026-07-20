import { ScaleWeightConnectionStatus } from '../types';

export type ScaleWeightTransportDataListener = (payload: string | Uint8Array) => void;

export type ScaleWeightTransportStatusListener = (
    status: ScaleWeightConnectionStatus,
    error?: string,
) => void;

export interface IScaleWeightTransport {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    write: (payload: string | Uint8Array) => Promise<void>;
    onData: (listener: ScaleWeightTransportDataListener) => () => void;
    onStatus: (listener: ScaleWeightTransportStatusListener) => () => void;
}
