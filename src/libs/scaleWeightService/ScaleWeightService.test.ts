import { ScaleWeightService } from './ScaleWeightService';
import { IScaleWeightTransport } from './_ports/IScaleWeightTransport';
import { InMemoryScaleWeightTransport } from './transports/InMemoryScaleWeightTransport';

describe('ScaleWeightService', () => {
    it('parses the scale frame as tenths of a kilogram', () => {
        const service = new ScaleWeightService();

        const reading = service.processRawData('\u0002+00006001D\u0003');

        expect(reading).toEqual(expect.objectContaining({
            weightKg: 60,
            unit: 'kg',
        }));
    });

    it('preserves a negative sign in the scale frame', () => {
        const service = new ScaleWeightService();

        const reading = service.processRawData('\u0002-00006001D\u0003');

        expect(reading?.weightKg).toBe(-60);
    });

    it('rounds scale readings to whole kilograms', () => {
        const service = new ScaleWeightService();

        const reading = service.processRawData('\u0002+00006061D\u0003');

        expect(reading?.weightKg).toBe(61);
    });

    it('makes weight ready after it is stable above 50 kg for more than 7 seconds', () => {
        const service = new ScaleWeightService();
        const now = jest.spyOn(Date, 'now');
        service.configure({
            stableSamplesCount: 1,
            minimumCaptureWeightKg: 50,
            requiredStableDurationMs: 7000,
        });

        now.mockReturnValueOnce(1000);
        const initialReading = service.processRawData('\u0002+00006001D\u0003');
        now.mockReturnValueOnce(8001);
        const readyReading = service.processRawData('\u0002+00006001D\u0003');

        expect(initialReading?.isReadyForCapture).toBe(false);
        expect(readyReading).toEqual(expect.objectContaining({
            weightKg: 60,
            stableDurationMs: 7001,
            isReadyForCapture: true,
        }));
        now.mockRestore();
    });

    it('does not start capture stability at 50 kg', () => {
        const service = new ScaleWeightService();
        service.configure({ stableSamplesCount: 1 });

        const reading = service.processRawData('\u0002+00005001D\u0003');

        expect(reading?.isReadyForCapture).toBe(false);
        expect(reading?.stableDurationMs).toBe(0);
    });

    it('parses raw payload and marks repeated readings as stable', async () => {
        const transport = new InMemoryScaleWeightTransport();
        const service = new ScaleWeightService();

        service.setTransport(transport);
        service.configure({
            stableSamplesCount: 3,
            stableThresholdKg: 10,
        });

        await service.connect();

        transport.emitData('ST,GS,+012340 kg');
        transport.emitData('ST,GS,+012345 kg');
        transport.emitData('ST,GS,+012348 kg');

        const snapshot = service.createSnapshot();

        expect(snapshot?.weightKg).toBe(12348);
        expect(snapshot?.isStable).toBe(true);
    });

    it('does not create snapshot when reading is stale', () => {
        const service = new ScaleWeightService();

        service.configure({
            staleAfterMs: -1,
        });
        service.processRawData('1000 kg');

        expect(service.createSnapshot()).toBeNull();
    });

    it('returns connection error without throwing', async () => {
        const transport: IScaleWeightTransport = {
            connect: async () => {
                throw new Error('Interface wifi unreachable');
            },
            disconnect: async () => undefined,
            write: async () => undefined,
            onData: () => () => undefined,
            onStatus: () => () => undefined,
        };
        const service = new ScaleWeightService(transport);

        await expect(service.connect()).resolves.toBe(false);
        expect(service.getState()).toEqual(expect.objectContaining({
            status: 'error',
            error: 'Interface wifi unreachable',
        }));
    });
});
