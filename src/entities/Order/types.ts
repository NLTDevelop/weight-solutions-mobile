export const MOVEMENT_TYPE = {
    loading: 'loading',
    unloading: 'unloading',
} as const;

export type MovementType = typeof MOVEMENT_TYPE[keyof typeof MOVEMENT_TYPE];

export const WEIGHT_TYPE = {
    tare: 'tare',
    gross: 'gross',
} as const;

export type WeightType = typeof WEIGHT_TYPE[keyof typeof WEIGHT_TYPE];

export const getPrimaryWeightType = (movementType?: string | null): WeightType => {
    return movementType === MOVEMENT_TYPE.unloading ? WEIGHT_TYPE.gross : WEIGHT_TYPE.tare;
};

export const getSecondaryWeightType = (movementType?: string | null): WeightType => {
    return getPrimaryWeightType(movementType) === WEIGHT_TYPE.tare ? WEIGHT_TYPE.gross : WEIGHT_TYPE.tare;
};
