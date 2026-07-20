import { ScaleWeightParseResult } from './types';

class ScaleWeightParser {
    public parse = (payload: string): ScaleWeightParseResult | null => {
        const normalized = payload.trim().replace(',', '.');
        if (!normalized) {
            return null;
        }

        const frameWithoutStart = normalized.charCodeAt(0) === 2
            ? normalized.slice(1)
            : normalized;
        const hasEndOfText = frameWithoutStart.charCodeAt(frameWithoutStart.length - 1) === 3;
        const scaleFrame = hasEndOfText
            ? frameWithoutStart.slice(0, -1).match(/^([+-]?)(\d{7})[0-9A-F]{2}$/i)
            : null;
        if (scaleFrame) {
            const sign = scaleFrame[1] === '-' ? -1 : 1;
            return {
                weightKg: Math.round(sign * Number(scaleFrame[2]) / 10),
                unit: 'kg',
            };
        }

        const match = normalized.match(/[-+]?\d+(?:\.\d+)?/);
        if (!match) {
            return null;
        }

        const weight = Number(match[0]);
        if (!Number.isFinite(weight)) {
            return null;
        }

        const unitMatch = normalized.match(/\b(kg|kgs|kilogram|kilograms|t|ton|tons|lb|lbs)\b/i);
        const unit = unitMatch ? unitMatch[1].toLowerCase() : 'kg';

        if (unit === 't' || unit === 'ton' || unit === 'tons') {
            return {
                weightKg: weight * 1000,
                unit,
            };
        } else if (unit === 'lb' || unit === 'lbs') {
            return {
                weightKg: weight * 0.45359237,
                unit,
            };
        }

        return {
            weightKg: weight,
            unit,
        };
    };
}

export const scaleWeightParser = new ScaleWeightParser();
export { ScaleWeightParser };
