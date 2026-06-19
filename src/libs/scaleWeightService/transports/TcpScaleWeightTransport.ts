import TcpSocket from 'react-native-tcp-socket';
import {
    IScaleWeightTransport,
    ScaleWeightTransportDataListener,
    ScaleWeightTransportStatusListener,
} from '../_ports/IScaleWeightTransport';

type TcpClient = ReturnType<typeof TcpSocket.createConnection>;

export interface TcpScaleWeightTransportConfig {
    host: string;
    port: number;
    delimiter?: string;
    connectTimeoutMs?: number;
    idleTimeoutMs?: number;
    reconnectDelayMs?: number;
    maxReconnectAttempts?: number;
    requestCommand?: string;
    requestIntervalMs?: number;
}

const DEFAULT_CONNECT_TIMEOUT_MS = 5000;
const DEFAULT_RECONNECT_DELAY_MS = 2000;
const DEFAULT_DELIMITER = '\r\n';
const MAX_BUFFER_LENGTH = 64 * 1024;

class TcpScaleWeightTransport implements IScaleWeightTransport {
    private socket: TcpClient | null = null;
    private buffer = '';
    private dataListeners = new Set<ScaleWeightTransportDataListener>();
    private statusListeners = new Set<ScaleWeightTransportStatusListener>();
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private requestTimer: ReturnType<typeof setInterval> | null = null;
    private reconnectAttempts = 0;
    private manuallyDisconnected = true;
    private isOpening = false;

    constructor(private config: TcpScaleWeightTransportConfig) {
        if (!config.host.trim()) {
            throw new Error('Scale host is required');
        }
        if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
            throw new Error('Scale port must be between 1 and 65535');
        }
    }

    public connect = async () => {
        this.manuallyDisconnected = false;
        this.reconnectAttempts = 0;
        await this.openSocket();
    };

    public disconnect = async () => {
        this.manuallyDisconnected = true;
        this.clearReconnectTimer();
        this.clearRequestTimer();
        this.buffer = '';
        this.isOpening = false;

        if (this.socket && !this.socket.pending) {
            this.socket.destroy();
            this.socket = null;
        } else {
            this.socket = null;
        }

        this.emitStatus('disconnected');
    };

    public write = async (payload: string | Uint8Array) => {
        const socket = this.socket;
        if (!socket || socket.destroyed || socket.readyState !== 'open') {
            throw new Error('Scale TCP socket is not connected');
        }

        await new Promise<void>((resolve, reject) => {
            socket.write(payload, undefined, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    };

    public onData = (listener: ScaleWeightTransportDataListener) => {
        this.dataListeners.add(listener);
        return () => this.dataListeners.delete(listener);
    };

    public onStatus = (listener: ScaleWeightTransportStatusListener) => {
        this.statusListeners.add(listener);
        return () => this.statusListeners.delete(listener);
    };

    private openSocket = async () => {
        if (this.isOpening || (this.socket && !this.socket.destroyed)) {
            return;
        }

        this.isOpening = true;
        this.emitStatus('connecting');

        await new Promise<void>((resolve, reject) => {
            let settled = false;
            const socket = TcpSocket.createConnection({
                host: this.config.host,
                port: this.config.port,
                interface: 'wifi',
                reuseAddress: true,
                connectTimeout: this.config.connectTimeoutMs || DEFAULT_CONNECT_TIMEOUT_MS,
            }, () => {
                settled = true;
                this.isOpening = false;
                if (this.manuallyDisconnected || this.socket !== socket) {
                    socket.destroy();
                    resolve();
                    return;
                }
                this.reconnectAttempts = 0;
                socket.setEncoding('utf8');
                socket.setNoDelay(true);
                socket.setKeepAlive(true);
                if (this.config.idleTimeoutMs) {
                    socket.setTimeout(this.config.idleTimeoutMs);
                }
                this.emitStatus('connected');
                this.startRequestTimer();
                resolve();
            });

            this.socket = socket;

            socket.on('data', data => this.processChunk(String(data)));
            socket.on('timeout', () => {
                socket.destroy();
                this.emitStatus('error', 'Scale connection timed out');
            });
            socket.on('error', error => {
                this.isOpening = false;
                this.emitStatus('error', error.message);
                if (!settled) {
                    settled = true;
                    if (this.socket === socket) {
                        this.socket = null;
                    }
                    if (!this.manuallyDisconnected) {
                        this.scheduleReconnect();
                    }
                    reject(error);
                }
            });
            socket.on('close', () => {
                this.isOpening = false;
                this.clearRequestTimer();
                if (!settled) {
                    settled = true;
                    reject(new Error('Scale connection closed before it was established'));
                }
                if (this.socket === socket) {
                    this.socket = null;
                }
                if (!this.manuallyDisconnected) {
                    this.emitStatus('disconnected');
                    this.scheduleReconnect();
                }
            });
        });
    };

    private processChunk = (chunk: string) => {
        const delimiter = this.config.delimiter ?? DEFAULT_DELIMITER;
        if (!delimiter) {
            this.emitData(chunk);
            return;
        }

        this.buffer += chunk;
        if (this.buffer.length > MAX_BUFFER_LENGTH) {
            this.buffer = '';
            this.emitStatus('error', 'Scale data buffer overflow');
            return;
        }

        let delimiterIndex = this.buffer.indexOf(delimiter);
        while (delimiterIndex >= 0) {
            const frame = this.buffer.slice(0, delimiterIndex).trim();
            this.buffer = this.buffer.slice(delimiterIndex + delimiter.length);
            if (frame) {
                this.emitData(frame);
            }
            delimiterIndex = this.buffer.indexOf(delimiter);
        }
    };

    private scheduleReconnect = () => {
        const maxAttempts = this.config.maxReconnectAttempts;
        if (this.reconnectTimer || (maxAttempts !== undefined && this.reconnectAttempts >= maxAttempts)) {
            return;
        }

        this.reconnectAttempts += 1;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.openSocket().catch(() => undefined);
        }, this.config.reconnectDelayMs || DEFAULT_RECONNECT_DELAY_MS);
    };

    private startRequestTimer = () => {
        this.clearRequestTimer();
        if (!this.config.requestCommand || !this.config.requestIntervalMs) {
            return;
        }

        this.write(this.config.requestCommand).catch(error => {
            this.emitStatus('error', error.message);
        });
        this.requestTimer = setInterval(() => {
            this.write(this.config.requestCommand || '').catch(error => {
                this.emitStatus('error', error.message);
            });
        }, this.config.requestIntervalMs);
    };

    private clearReconnectTimer = () => {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    };

    private clearRequestTimer = () => {
        if (this.requestTimer) {
            clearInterval(this.requestTimer);
            this.requestTimer = null;
        }
    };

    private emitData = (payload: string | Uint8Array) => {
        this.dataListeners.forEach(listener => listener(payload));
    };

    private emitStatus: ScaleWeightTransportStatusListener = (status, error) => {
        this.statusListeners.forEach(listener => listener(status, error));
    };
}

export { TcpScaleWeightTransport };
